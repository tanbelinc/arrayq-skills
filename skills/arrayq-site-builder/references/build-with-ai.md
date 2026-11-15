# Build Your Site with AI

A complete, copyable prompt that lets ChatGPT, Claude or any AI coding tool build a ready-to-publish ArrayQ Site Builder website in one go, wired to your services and the built-in checkout, sign in and customer account pages.

Source: [https://arrayq.com/docs/site-builder/build-with-ai](https://arrayq.com/docs/site-builder/build-with-ai), last updated 2026-11-14.

This page is written for AI tools as much as for people. Copy the prompt below, fill in the details at the top and paste it into ChatGPT, Claude, Cursor or any AI coding tool. It contains everything the AI needs to know about ArrayQ, so the site it returns can be uploaded and published as-is.

You can also share the link to this page with an AI tool that can read web pages. Ask it to "build my ArrayQ site following this page" and give it your business details.

If your AI tool supports agent skills, install the [ArrayQ agent skills](https://arrayq.com/docs/agent-skills) instead.
The site builder skill carries the same rules and the rest of the Site Builder docs, so you can ask for a site in your own words.

## How it works

1. **Fill in your details**

   Replace the values in the **Business details** block: name, trade, area, phone, email and the look you want.

2. **Paste the prompt**

   The AI returns a folder of files: `index.html`, `styles.css`, `app.js` and any extra pages you asked for.

3. **Save the files**

   Put them in one folder on your computer, keeping the same file names and subfolders.

4. **Publish**

   Upload the folder in **Site Builder**, **Builder** tab, and click **Publish site**. See [Publish your site](publish.md).

Your services, checkout, sign in, order tracking and chat work as soon as the site is published. There is nothing else to connect.

## The prompt

````text
You are building a marketing website for a home service business. It will be hosted on ArrayQ Site Builder. Follow every rule below exactly. Return complete, final files, never placeholders like "rest of the code here".

=== BUSINESS DETAILS (fill in) ===
Business name: [e.g. Clearway Junk Co.]
Trade / industry: [e.g. junk removal]
Service area: [e.g. Austin, TX and surrounding towns]
Phone: [e.g. (512) 555-0134]
Email: [e.g. hello@clearwayjunk.com]
Brand colors: [e.g. forest green and lime, or "pick something that fits"]
Tone: [e.g. friendly and straightforward]
Extra pages wanted: [e.g. about, 3 location pages for Austin, Round Rock, Cedar Park, a blog index with 3 posts, or "none"]
Anything else: [e.g. licensed and insured, same-day service, family owned since 2015]

=== HOW ARRAYQ HOSTING WORKS ===
1. The site is a static folder: HTML, CSS, JavaScript, images and fonts. No server code, no build step, no frameworks that need compiling, no npm packages. Plain HTML, CSS and vanilla JavaScript only.
2. The folder must have index.html at the top level. That is the home page.
3. Allowed file extensions: .html .htm .css .js .mjs .json .map .xml .txt .webmanifest .wasm .png .jpg .jpeg .gif .svg .webp .avif .ico .woff .woff2 .ttf .otf .mp3 .wav .ogg .mp4 .webm .pdf. Nothing else.
4. Limits: at most 200 files, 15 MB per file, 50 MB total. Prefer inline SVG and CSS for graphics instead of large images.
5. A URL with no matching file falls back to index.html.
6. Everything in the folder is public. Never put secrets or API keys in any file.

=== CONFIG.JS ===
ArrayQ serves a file named config.js at the root of the published site. It sets:

  window.SITE_CONFIG = Object.freeze({
    API_BASE_URL: "https://...",
    SITE_KEY: "pk_...",
  });

- Every page must load it before app.js:
    <script defer src="./config.js"></script>
    <script defer src="./app.js"></script>
- Do not create config.js. ArrayQ serves it on the published site.
- When SITE_KEY is empty, the site must still look complete: show sample service cards instead of calling the API.

=== BUILT-IN PAGES (DO NOT BUILD THESE) ===
ArrayQ already provides these pages on every published site. Never create files, folders or forms for them. Only link to them, using paths that start with "/":

  /checkout/SERVICE_ID           checkout for one service, works without an account
  /login                         sign in with an emailed one-time code
  /register                      create an account
  /app                           the customer's orders, status tracker, invoices and live chat
  /app/messages                  live chat with the business

Optional query parameters: /login?next=/app/messages and /login?email=someone@example.com.
There is no general /checkout page. Every checkout is for one service, so "Book now" buttons must scroll to or link to the services section ("#services" on the home page, "/#services" from other pages).
The paths /login, /register and everything under /checkout/ and /app/ are reserved. Never create a folder named login, register, checkout or app, or a file with one of those names and no extension. Files with an extension, such as app.js or checkout.html, are fine.
Do not build a booking form, a contact form that books jobs, a sign in form, an account page, a payment form or a chat widget. The built-in pages handle all of that.

=== LINK RULES ===
- Links to the built-in pages start with "/": href="/checkout/SERVICE_ID", href="/login", href="/register", href="/app".
- Links to your own files are relative: href="./about.html", href="./styles.css", src="./assets/logo.svg". From a page inside a subfolder use "../styles.css".
- The home page link in the header is href="/".

=== REQUIRED CONTENT ===
index.html must include:
1. A header with the business name as the logo (linking to "/"), section links, a "Sign in" link to /login and a primary "Book now" button to #services. On mobile, collapse the links into an accessible menu button (aria-expanded, aria-controls, Escape closes it).
2. A hero with a clear headline, one short paragraph, a primary button to #services and a secondary button "Track my order" to /app.
3. A services section with id="services" containing exactly these elements, filled by app.js:
     <p id="service-status" role="status">Loading services...</p>
     <button id="service-retry" type="button" hidden>Try again</button>
     <div id="service-grid" hidden></div>
4. A section explaining the customer account: book online, track every order, pay invoices online, chat with the team. Include buttons to /register and /login.
5. A "How it works" section with 3 or 4 steps: book online, the business confirms, the job is done, pay the invoice online.
6. An FAQ using <details> and <summary>. Accurate answers: booking needs no payment upfront, customers can sign in with an emailed code (no password), invoices are paid online after the job, changes are requested by messaging from the account.
7. A closing call to action with buttons to #services and /app.
8. A footer with the business name, phone (tel: link), email (mailto: link), the current year filled in by app.js via [data-year], and links to #services, /app, /register and /login.
Every extra page uses the same header and footer, loads ./config.js (or ../config.js) and the same app.js, and only runs the service loader if #service-grid exists.

=== THE SERVICES API ===
Load the business's services from the API and render one card per service:

  GET {SITE_CONFIG.API_BASE_URL}/api/service?limit=100&skip=0
  Headers: Accept: application/json, x-provider-id: {SITE_CONFIG.SITE_KEY}

The response is a JSON array. Use only these fields:
  _id          string, required
  title        string, required
  description  string or empty
  cover        image URL or empty

If the array has 100 items, request the next page with skip=100, and so on.
Errors return a status code and JSON { "message": "..." }. Show that message in #service-status and reveal #service-retry.
If the list is empty, show "Online booking is not available just yet. Please check back soon."

Each card shows the cover image (only if it is an https URL, with a styled placeholder otherwise or if the image fails to load), the title, the description (or a short fallback sentence) and a link:
  href = "/checkout/" + encodeURIComponent(service._id)
Sample services (shown when SITE_KEY is empty) have no _id, so their link is "#services".
Build cards with document.createElement and textContent, never innerHTML, because service text is typed by people.

=== REFERENCE app.js ===
Use this script as the base and extend it only if a page needs more behavior. Replace the sample services with ones that fit the business.

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

=== DESIGN AND QUALITY ===
- Mobile first and fully responsive from 320px to wide desktop. No horizontal scrolling. Tap targets at least 44px.
- One stylesheet, styles.css, with CSS custom properties for colors, radius and fonts. Use Google Fonts if you want a custom font.
- Semantic HTML: header, nav, main with id="main", section with aria-labelledby, footer. A "Skip to content" link. One h1 per page.
- Visible focus styles, color contrast of at least 4.5:1 for text, alt text on meaningful images, aria-hidden on decorative ones.
- Respect prefers-reduced-motion.
- Include assets/favicon.svg and link it in every page head. Add a meta description and a descriptive title on every page.
- Write real, specific copy for this business. No lorem ipsum. Do not invent prices, reviews, ratings, awards or license numbers.
- Do not use emojis.

=== OUTPUT FORMAT ===
1. First, print the folder tree.
2. Then print every file in full, each one preceded by its path, for example "index.html", "styles.css", "app.js", "assets/favicon.svg". Do not output config.js.
3. No explanations between files beyond the path.

=== FINAL CHECK BEFORE YOU ANSWER ===
- index.html exists at the top level.
- Every page loads ./config.js (or ../config.js) before app.js, and the folder does not contain a config.js.
- No folder is named login, register, checkout or app (app.js is fine).
- No booking, sign in, payment or chat forms anywhere.
- Every "Book now" button points to the services section, and every service card points to /checkout/SERVICE_ID.
- "Sign in" points to /login, "Track my order" and "My orders" point to /app.
- Links between your own files are relative.
- Service cards are built with textContent and link to /checkout/SERVICE_ID.
- The site looks complete with SITE_KEY set to "".
````

## Tips

- Ask for changes in the same chat, for example "make the hero darker" or "add a page for Round Rock". Ask the AI to return the full updated files.
- Keep your services up to date in **Services** in your dashboard. The site reads them live, so you never need to edit the website when a service changes.
- After publishing, turn on the [Tracker](tracker.md) and the [Orca chatbot](orca-chatbot.md) from their tabs. ArrayQ adds them to your hosted pages, so the AI does not need to include them.

> **Note**
>
> The prompt tells the AI not to build checkout, sign in or account pages, because ArrayQ provides them. See [Built-in pages](built-in-pages.md) for what each one does.
