/* JOMJALAN MALAYSIA - MAIN.JS
   Electron windows and optional JTR Holidays API
*/

const { app, BrowserWindow, ipcMain, net } = require("electron");
const path = require("path");

let mainWindow = null;
const websiteWindows = new Set();

const ALLOWED_SITES = {
  "en.wikipedia.org": "Wikipedia",
  "github.com": "GitHub",
  "www.github.com": "GitHub",
  "instagram.com": "Instagram",
  "www.instagram.com": "Instagram",
  "jtrholidays.com": "JTR Holidays",
  "www.jtrholidays.com": "JTR Holidays"
};

function getWebsiteInfo(link) {
  try {
    const url = new URL(link);
    if (url.protocol !== "https:") return null;
    const name = ALLOWED_SITES[url.hostname.toLowerCase()];
    return name ? { name, url: url.href } : null;
  } catch {
    return null;
  }
}

function openWebsiteInElectron(link) {
  const website = getWebsiteInfo(link);
  if (!website) {
    console.warn("[JomJalan] External link blocked:", link);
    return;
  }

  const viewer = new BrowserWindow({
    width: 1000,
    height: 750,
    minWidth: 650,
    minHeight: 480,
    title: `JomJalan - ${website.name}`,
    backgroundColor: "#101914",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    }
  });

  websiteWindows.add(viewer);
  viewer.on("closed", () => websiteWindows.delete(viewer));
  viewer.webContents.setWindowOpenHandler(() => ({ action: "deny" }));

  function restrictNavigation(event, destination) {
    const target = getWebsiteInfo(destination);
    if (!target || target.name !== website.name) event.preventDefault();
  }

  viewer.webContents.on("will-navigate", restrictNavigation);
  viewer.webContents.on("will-redirect", restrictNavigation);
  viewer.webContents.on("did-fail-load", (_event, code, message, url, mainFrame) => {
    if (mainFrame && code !== -3) console.error("[JomJalan] Website error:", message, url);
  });

  viewer.loadURL(website.url).catch(error => {
    console.error("[JomJalan] Could not load website:", error.message);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: "JomJalan Malaysia",
    backgroundColor: "#101914",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    openWebsiteInElectron(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      event.preventDefault();
      if (getWebsiteInfo(url)) openWebsiteInElectron(url);
    }
  });

  mainWindow.on("closed", () => { mainWindow = null; });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  console.log("[JomJalan] Main window created");
}

const DESTINATION_SEARCH = {
  langkawi: "Langkawi",
  cameron: "Cameron Highlands",
  penang: "Penang",
  kualalumpur: "Kuala Lumpur",
  melaka: "Melaka",
  sabah: "Kota Kinabalu",
  sarawak: "Kuching",
  johor: "Johor Bahru",
  perak: "Ipoh"
};

function decodeRpcResponse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    // Some MCP servers return text/event-stream rather than raw JSON.
    const events = raw.split(/\r?\n\r?\n/);
    for (const event of events) {
      const data = event.split(/\r?\n/)
        .filter(line => line.startsWith("data:"))
        .map(line => line.slice(5).trim())
        .join("\n");
      if (!data || data === "[DONE]") continue;
      try {
        const parsed = JSON.parse(data);
        if (parsed.result || parsed.error) return parsed;
      } catch { /* Ignore non-JSON event payloads. */ }
    }
    throw new Error("Unexpected response from tours provider.");
  }
}

async function queryJtr(tool, destination, signal) {
  const response = await net.fetch("https://api.jtrholidays.com/mcp/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: tool, arguments: { destination, limit: 30 } }
    }),
    signal
  });

  const raw = await response.text();
  if (!response.ok) throw new Error(`Tours HTTP ${response.status}`);
  const rpc = decodeRpcResponse(raw);
  if (rpc.error || rpc.result?.isError) {
    throw new Error(rpc.error?.message || "Tours provider returned an error.");
  }

  if (rpc.result?.structuredContent) return rpc.result.structuredContent;
  const textPart = rpc.result?.content?.find(part => part.type === "text");
  if (!textPart || typeof textPart.text !== "string") {
    throw new Error("The tours provider did not return JSON content.");
  }
  try {
    return JSON.parse(textPart.text);
  } catch {
    throw new Error("The tours provider sent unreadable data.");
  }
}

function extractList(data, type) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];
  const keys = type === "package"
    ? ["packages", "holiday_packages", "results", "items"]
    : ["activities", "results", "items"];
  for (const key of keys) {
    if (Array.isArray(data[key])) return data[key];
    if (Array.isArray(data.data?.[key])) return data.data[key];
  }
  return [];
}

function normalizeTour(item, kind, destination) {
  if (!item || typeof item !== "object") return null;

  const country = String(item.country?.name || item.country || "").toLowerCase();
  if (country && country !== "malaysia" && country !== "my") return null;

  const place = [item.city, item.destination, item.region, item.location,
    item.title, item.name, item.itinerary?.title]
    .filter(value => typeof value === "string")
    .join(" ").toLowerCase();

  const synonyms = {
    "Penang": ["penang", "george town"],
    "Melaka": ["melaka", "malacca"],
    "Cameron Highlands": ["cameron highlands", "cameron"],
    "Kota Kinabalu": ["kota kinabalu", "sabah"],
    "Kuching": ["kuching", "sarawak"],
    "Ipoh": ["ipoh", "perak"],
    "Johor Bahru": ["johor bahru", "johor"]
  };
  const names = synonyms[destination] || [destination.toLowerCase()];
  if (!names.some(name => place.includes(name))) return null;

  const rawPrice = item.price_from ?? item.price?.amount ?? item.price;
  const amount = Number(rawPrice);
  const price = rawPrice !== null && rawPrice !== undefined && rawPrice !== ""
    && Number.isFinite(amount) && amount >= 0 ? amount : null;

  const currency = String(item.currency || item.price?.currency || "").slice(0, 8);
  let bookingUrl = "";
  try {
    const parsed = new URL(item.booking_url || item.url || "");
    if (getWebsiteInfo(parsed.href)?.name === "JTR Holidays") bookingUrl = parsed.href;
  } catch { /* The API did not provide a valid booking URL. */ }

  return {
    kind,
    title: String(item.title || item.name || "Travel experience").slice(0, 150),
    description: String(item.description || item.summary || "").slice(0, 300),
    price,
    currency,
    bookingUrl
  };
}

async function searchTours(destinationId) {
  const destination = DESTINATION_SEARCH[destinationId];
  if (!destination) return { ok: false, items: [], error: "Invalid destination." };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 14000);

  try {
    // The activity tool searches by city. Packages are browsed by country/region.
    const results = await Promise.allSettled([
      queryJtr("search_activities", destination, controller.signal),
      queryJtr("get_holiday_packages", "Malaysia", controller.signal)
    ]);

    if (results.every(result => result.status === "rejected")) {
      throw new Error("Both JTR searches failed.");
    }

    const activityData = results[0].status === "fulfilled" ? results[0].value : {};
    const packageData = results[1].status === "fulfilled" ? results[1].value : {};
    const activities = extractList(activityData, "activity")
      .map(item => normalizeTour(item, "Tour / Activity", destination));
    const packages = extractList(packageData, "package")
      .map(item => normalizeTour(item, "Holiday Package", destination));
    const unique = new Map();
    for (const item of [...packages, ...activities]) {
      if (item) unique.set(`${item.kind}:${item.title.toLowerCase()}`, item);
    }
    return { ok: true, items: [...unique.values()].slice(0, 6) };
  } catch (error) {
    console.error("[JomJalan] JTR API error:", error.message);
    return {
      ok: false,
      items: [],
      error: controller.signal.aborted
        ? "Live tours took too long. Please try again."
        : "Live tours are temporarily unavailable. Your sample packages still work."
    };
  } finally {
    clearTimeout(timer);
  }
}

app.whenReady().then(() => {
  ipcMain.on("jomjalan:preload-ready", event => {
    if (mainWindow && event.sender === mainWindow.webContents) {
      console.log("[JomJalan] Preload connected");
    }
  });

  ipcMain.on("jomjalan:open-site", (event, url) => {
    if (mainWindow && event.sender === mainWindow.webContents) {
      openWebsiteInElectron(url);
    }
  });

  ipcMain.handle("jomjalan:search-tours", (event, destinationId) => {
    if (!mainWindow || event.sender !== mainWindow.webContents) {
      return { ok: false, items: [], error: "Unauthorized request." };
    }
    return searchTours(destinationId);
  });

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});