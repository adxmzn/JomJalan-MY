/* JOMJALAN MALAYSIA - TOURS.JS
   Adds a standalone live-tour panel without changing renderer.js.
*/
(() => {
  const attractions = document.querySelector(".attractions-section");
  const modal = document.getElementById("detailsModal");
  if (!attractions || !modal) return;

  const section = document.createElement("section");
  section.className = "live-tours-section";

  const heading = document.createElement("h3");
  heading.textContent = "Live Travel Packages & Activities";

  const intro = document.createElement("p");
  intro.className = "live-tours-intro";
  intro.textContent = "Explore JTR Holidays offers. Live prices are separate from your estimated trip budget.";

  const status = document.createElement("p");
  status.className = "live-tours-status";
  status.setAttribute("role", "status");
  status.textContent = "Choose a destination to search for live tours.";

  const list = document.createElement("div");
  list.className = "live-tours-list";

  const credit = document.createElement("small");
  credit.className = "live-tours-credit";
  credit.textContent = "Source: JTR Holidays API. Listings and prices depend on the provider's catalog.";

  section.append(heading, intro, status, list, credit);
  attractions.insertAdjacentElement("afterend", section);

  let requestNumber = 0;

  async function loadTours(destinationId) {
    const myRequest = ++requestNumber;
    list.replaceChildren();
    status.hidden = false;
    status.textContent = "Searching live travel offers...";

    if (!window.jomjalanTours?.search) {
      status.textContent = "Tours connection unavailable. Restart the Electron app.";
      return;
    }

    try {
      const result = await window.jomjalanTours.search(destinationId);
      if (myRequest !== requestNumber || modal.hidden) return;
      if (!result?.ok) {
        status.textContent = result?.error || "Live travel offers are unavailable.";
        return;
      }
      if (!Array.isArray(result.items) || result.items.length === 0) {
        status.textContent =
          "No live offers were returned for this destination. You can still use the estimated packages below.";
        return;
      }

      status.hidden = true;
      for (const item of result.items) {
        const card = document.createElement("article");
        card.className = "live-tour-card";

        const kind = document.createElement("span");
        kind.className = "live-tour-kind";
        kind.textContent = item.kind || "Travel experience";

        const title = document.createElement("h4");
        title.textContent = item.title || "Travel experience";
        card.append(kind, title);

        if (item.description) {
          const description = document.createElement("p");
          description.textContent = item.description;
          card.appendChild(description);
        }

        if (typeof item.price === "number" && item.currency) {
          const price = document.createElement("strong");
          price.className = "live-tour-price";
          price.textContent = `From ${item.currency} ${item.price.toFixed(2)}`;
          card.appendChild(price);
        }

        if (item.bookingUrl) {
          const link = document.createElement("a");
          link.className = "live-tour-link";
          link.href = item.bookingUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "View on JTR Holidays ↗";
          card.appendChild(link);
        }
        list.appendChild(card);
      }
    } catch (error) {
      if (myRequest !== requestNumber || modal.hidden) return;
      console.error("Tours UI error:", error);
      status.hidden = false;
      status.textContent = "Unable to display live tours. Your other features still work.";
    }
  }

  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest(".details-btn[data-destination]");
    if (button) loadTours(button.dataset.destination);
  });
})();