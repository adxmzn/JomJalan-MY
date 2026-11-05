/* JOMJALAN MALAYSIA - PRELOAD.JS */
const { ipcRenderer, contextBridge } = require("electron");

const allowedHosts = new Set([
  "en.wikipedia.org",
  "github.com",
  "www.github.com",
  "instagram.com",
  "www.instagram.com",
  "jtrholidays.com",
  "www.jtrholidays.com"
]);

function isSupportedWebsite(link) {
  try {
    const url = new URL(link);
    return url.protocol === "https:" && allowedHosts.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

document.addEventListener("click", event => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest("a[href]");
  if (!link || !isSupportedWebsite(link.href)) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  ipcRenderer.send("jomjalan:open-site", link.href);
}, true);

contextBridge.exposeInMainWorld("jomjalanTours", {
  search: destinationId => {
    if (typeof destinationId !== "string") {
      return Promise.resolve({ ok: false, items: [], error: "Invalid destination." });
    }
    return ipcRenderer.invoke("jomjalan:search-tours", destinationId);
  }
});

ipcRenderer.send("jomjalan:preload-ready");