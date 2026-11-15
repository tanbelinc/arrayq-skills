(() => {
"use strict";

const CONFIG = window.SITE_CONFIG;
if (!CONFIG || typeof CONFIG !== "object") {
  throw new Error("The site configuration is missing. Load config.js before app.js.");
}

const PAGE_SIZE = 100;
const FALLBACK_DESCRIPTION = "Tell us what you need and where. We confirm the time and price before the visit.";
const SAMPLE_SERVICES = [
  { title: "Sample service one", description: "Replace with a real service description." },
  { title: "Sample service two", description: "Replace with a real service description." },
  { title: "Sample service three", description: "Replace with a real service description." },
];

const $ = (selector) => {
  return document.querySelector(selector);
};

const request = async (path) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 25000);
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/api${path}`, {
      headers: { Accept: "application/json", "x-provider-id": CONFIG.SITE_KEY },
      signal: controller.signal,
    });
    const text = await response.text();
    let payload = null;
    if (text) {
      payload = JSON.parse(text);
    }
    if (!response.ok) {
      let message = `Your request could not be completed (${response.status}). Please try again.`;
      if (typeof payload?.message === "string" && payload.message.trim()) {
        message = payload.message;
      }
      throw new Error(message);
    }
    return payload;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The request took too long. Please try again.");
    }
    if (error instanceof TypeError) {
      throw new Error("We could not reach the booking service. Check your connection and try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};

const safeImageUrl = (value) => {
  if (typeof value !== "string") {
    return null;
  }
  try {
    const url = new URL(value);
    if (url.protocol === "https:") {
      return url.href;
    }
    return null;
  } catch {
    return null;
  }
};

const createPlaceholder = (index) => {
  const art = document.createElement("div");
  art.className = "card-art";
  art.setAttribute("aria-hidden", "true");
  art.textContent = String(index + 1).padStart(2, "0");
  return art;
};

const checkoutHref = (service) => {
  if (service._id) {
    return `/checkout/${encodeURIComponent(service._id)}`;
  }
  return "#services";
};

const createServiceCard = (service, index) => {
  const card = document.createElement("article");
  card.className = "service-card";
  const placeholder = createPlaceholder(index);
  const cover = safeImageUrl(service.cover);
  if (cover) {
    const image = document.createElement("img");
    image.className = "card-cover";
    image.src = cover;
    image.alt = "";
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.replaceWith(placeholder);
    }, { once: true });
    card.append(image);
  } else {
    card.append(placeholder);
  }
  const body = document.createElement("div");
  body.className = "card-body";
  const title = document.createElement("h3");
  title.textContent = service.title;
  const description = document.createElement("p");
  if (typeof service.description === "string" && service.description.trim()) {
    description.textContent = service.description;
  } else {
    description.textContent = FALLBACK_DESCRIPTION;
  }
  const link = document.createElement("a");
  link.className = "card-link";
  link.href = checkoutHref(service);
  link.textContent = "Book this";
  link.setAttribute("aria-label", `Book ${service.title}`);
  body.append(title, description, link);
  card.append(body);
  return card;
};

const loadAllServices = async () => {
  const services = [];
  let skip = 0;
  while (true) {
    const page = await request(`/service?limit=${PAGE_SIZE}&skip=${skip}`);
    if (!Array.isArray(page)) {
      throw new Error("We could not read the service list. Please try again shortly.");
    }
    services.push(...page);
    if (page.length < PAGE_SIZE) {
      break;
    }
    skip += page.length;
  }
  return services.filter((service) => {
    return typeof service._id === "string" && typeof service.title === "string";
  });
};

const renderServices = (services) => {
  const grid = $("#service-grid");
  services.forEach((service, index) => {
    grid.append(createServiceCard(service, index));
  });
  $("#service-status").hidden = true;
  grid.hidden = false;
};

const initializeServiceCatalog = async () => {
  const grid = $("#service-grid");
  const status = $("#service-status");
  const retry = $("#service-retry");
  if (!grid || !status || !retry) {
    return;
  }
  grid.replaceChildren();
  grid.hidden = true;
  retry.hidden = true;
  status.hidden = false;
  status.textContent = "Loading services...";
  if (!CONFIG.SITE_KEY) {
    renderServices(SAMPLE_SERVICES);
    return;
  }
  try {
    const services = await loadAllServices();
    if (services.length) {
      renderServices(services);
    } else {
      status.textContent = "Online booking is not available just yet. Please check back soon.";
    }
  } catch (error) {
    status.textContent = error.message;
    retry.hidden = false;
  }
};

const initializeMenu = () => {
  const toggle = $(".menu-toggle");
  const nav = $("#mobile-nav");
  if (!toggle || !nav) {
    return;
  }
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.hidden = !open;
  };
  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
};

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

initializeMenu();
const retryButton = $("#service-retry");
if (retryButton) {
  retryButton.addEventListener("click", initializeServiceCatalog);
}
initializeServiceCatalog();

})();
