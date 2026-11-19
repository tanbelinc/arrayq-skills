# Build Your Site with AI

A complete, copyable prompt that lets ChatGPT, Claude or any AI coding tool build a ready-to-publish ArrayQ Site Builder Liquid theme in one go, rendered on the server with your services and wired to the built-in checkout, sign in and customer account pages.

Source: [https://arrayq.com/docs/site-builder/build-with-ai](https://arrayq.com/docs/site-builder/build-with-ai), last updated 2026-11-19.

This page is written for AI tools as much as for people. Copy the prompt below, fill in the details at the top and paste it into ChatGPT, Claude, Cursor or any AI coding tool. It contains everything the AI needs to know about ArrayQ, so the theme it returns can be uploaded and published as-is.

You can also share the link to this page with an AI tool that can read web pages. Ask it to "build my ArrayQ site following this page" and give it your business details.

If your AI tool supports agent skills, install the [ArrayQ agent skills](https://arrayq.com/docs/agent-skills) instead.
The site builder skill carries the same rules and the rest of the Site Builder docs, so you can ask for a site in your own words.

## How it works

1. **Fill in your details**

   Replace the values in the **Business details** block: name, trade, area, phone, email and the look you want.

2. **Paste the prompt**

   The AI returns a theme folder: `layout/theme.liquid`, templates for your pages, snippets and `assets/styles.css`.

3. **Save the files**

   Put them in one folder on your computer, keeping the same file names and subfolders.

4. **Publish**

   Upload the folder in **Site Builder**, **Builder** tab, and click **Publish site**. See [Publish your site](publish.md).

Your services, service pages, checkout, sign in, order tracking and chat work as soon as the site is published. There is nothing else to connect.

## The prompt

````text
You are building a marketing website for a home service business as a Liquid theme. It will be hosted on ArrayQ Site Builder, which renders Liquid on the server. Follow every rule below exactly. Return complete, final files, never placeholders like "rest of the code here".

=== BUSINESS DETAILS (fill in) ===
Business name: [e.g. Clearway Junk Co.]
Trade / industry: [e.g. junk removal]
Service area: [e.g. Austin, TX and surrounding towns]
Phone: [e.g. (512) 555-0134]
Email: [e.g. hello@clearwayjunk.com]
Brand colors: [e.g. forest green and lime, or "pick something that fits"]
Tone: [e.g. friendly and straightforward]
Extra pages wanted: [e.g. about, 3 location pages for Austin, Round Rock, Cedar Park, or "none"]
Anything else: [e.g. licensed and insured, same-day service, family owned since 2015]

=== HOW ARRAYQ HOSTING WORKS ===
1. The site is a Liquid theme (standard Shopify-style Liquid). ArrayQ renders it on the server for every visit, so pages arrive as complete HTML. No build step, no frameworks, no npm packages.
2. Folder structure:
     layout/theme.liquid      wraps every page; outputs the page with {{ content_for_layout }}
     templates/index.liquid   the home page at /
     templates/service.liquid one page per service at /services/SERVICE_SLUG
     templates/404.liquid     shown for any URL that does not match a page
     templates/NAME.liquid    any other page at /NAME (subfolders work: templates/locations/austin.liquid is /locations/austin)
     snippets/NAME.liquid     reusable pieces, included with {% render 'NAME' %}
     assets/                  CSS, JavaScript, images and fonts, served at /assets/...
3. Templates contain only the page content. The layout holds the doctype, head, header and footer.
4. Inside snippets, site, page and service are available automatically. Any other variable, such as a for loop variable, must be passed: {% render 'service-card', service: service %}.
5. Allowed file extensions: .liquid .html .htm .css .js .mjs .json .map .xml .txt .webmanifest .wasm .png .jpg .jpeg .gif .svg .webp .avif .ico .woff .woff2 .ttf .otf .mp3 .wav .ogg .mp4 .webm .pdf. Nothing else.
6. Limits: at most 200 files, 15 MB per file, 50 MB total. Prefer inline SVG and CSS for graphics instead of large images.
7. Output is not escaped automatically. Add | escape to every value placed inside an HTML attribute.
8. Only use standard Liquid filters (escape, strip_html, truncate, newline_to_br, date, upcase, downcase, slice, size, where, map, default). An unknown filter breaks the page.
9. Everything in assets/ is public. Never put secrets or API keys in any file.

=== THEME DATA ===
These objects are filled in by ArrayQ. Never hard code services or business details that these objects provide.

site.provider: businessName, about (plain text with line breaks), logo (image URL or empty), businessEmail, businessPhone, links (list of URLs), gallery (list of image URLs)

site.services: the active services. Each has:
  _id          use for the checkout link: /checkout/{{ service._id }}
  title
  slug         use for the service page: /services/{{ service.slug }}
  description  HTML written in the dashboard
  cover        image URL or empty
  category     list, each with name
  discount     only set while a discount is active; has displayName, description

service: on templates/service.liquid only, the service from the URL, with the same fields. Empty on every other page.

site.categories: list, each with name.
site.items: bookable items, each with name, image, price.
page.path: the current URL, such as /about.

Always handle empty data: use {% for %}...{% else %}...{% endfor %} for lists and {% if %} around optional fields such as logo, cover and discount.

=== BUILT-IN PAGES (DO NOT BUILD THESE) ===
ArrayQ already provides these pages on every published site. Never create templates, folders or forms for them. Only link to them:

  /checkout/{{ service._id }}   checkout for one service, works without an account
  /login                         sign in with an emailed one-time code
  /register                      create an account
  /app                           the customer's orders, status tracker, invoices and live chat
  /app/messages                  live chat with the business

Optional query parameters: /login?next=/app/messages and /login?email=someone@example.com.
There is no general /checkout page. Every checkout is for one service, so "Book now" buttons link to the services section at /#services.
Never create a template named login, register, checkout or app.
Do not build a booking form, a sign in form, an account page, a payment form or a chat widget. The built-in pages handle all of that.

=== LINK RULES ===
- Every link starts with "/": href="/", href="/about", href="/services/{{ service.slug }}", href="/assets/styles.css", src="/assets/logo.svg".
- Never use relative links such as "./styles.css". Pages live at URLs like /services/junk-removal, where relative links break.
- Never put .html or .liquid in a link.

=== REQUIRED FILES AND CONTENT ===
layout/theme.liquid:
  The doctype, html lang, head (charset, viewport, {% render 'seo' %}, favicon /assets/favicon.svg, stylesheet /assets/styles.css), a "Skip to content" link, {% render 'header' %}, <main id="main">{{ content_for_layout }}</main>, {% render 'footer' %} and <script defer src="/assets/app.js"></script>.

snippets/seo.liquid:
  On the service page (when service is set): title "{{ service.title }} | {{ site.provider.businessName }}", a meta description from service.description | strip_html | truncate: 155 | escape, a canonical link to /services/{{ service.slug }} and og:image from service.cover when present.
  On other pages: a title with site.provider.businessName and a meta description from site.provider.about.

snippets/header.liquid:
  The logo (site.provider.logo if set, otherwise the business name) linking to "/", section links, a "Sign in" link to /login and a primary "Book now" button to /#services. On mobile, collapse the links behind a menu button with data-menu-toggle, aria-expanded="false" and aria-controls pointing at the nav, and give the nav data-menu. assets/app.js opens it; style the open state with [data-menu][data-open].

snippets/footer.liquid:
  The business name, phone (tel: link) and email (mailto: link) from site.provider when set, the current year with {{ "now" | date: "%Y" }}, and links to /#services, /app, /register and /login.

snippets/service-card.liquid:
  Takes service. Shows the cover (or a styled placeholder when empty), the title, a short description (service.description | strip_html | truncate: 140), a "Details" link to /services/{{ service.slug }} and a "Book now" link to /checkout/{{ service._id }}.

templates/index.liquid:
  1. A hero with a clear headline, one short paragraph, a primary button to #services and a secondary button "Track my order" to /app.
  2. A services section with id="services" that renders snippets/service-card.liquid for every item of site.services, with a friendly message when there are none: "Online booking is not available just yet. Please check back soon."
  3. A section explaining the customer account: book online, track every order, pay invoices online, chat with the team. Buttons to /register and /login.
  4. A "How it works" section with 3 or 4 steps: book online, the business confirms, the job is done, pay the invoice online.
  5. An FAQ using <details> and <summary>. Accurate answers: booking needs no payment upfront, customers sign in with an emailed code (no password), invoices are paid online after the job, changes are requested by messaging from the account.
  6. A closing call to action with buttons to #services and /app.

templates/service.liquid:
  The service cover, title, categories, the discount displayName when set, the full description (output as is, it is HTML), a large "Book now" button to /checkout/{{ service._id }}, and a list of the other services (skip the current one by comparing slug).

templates/404.liquid:
  A short "Page not found" message with links to / and /#services.

Extra pages go in templates/ (for example templates/about.liquid or templates/locations/austin.liquid) and use the same layout automatically.

=== REFERENCE app.js ===
Save this as assets/app.js. It only drives the mobile menu; the pages are complete without it.

(() => {
"use strict";

const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (toggle && menu) {
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.toggleAttribute("data-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      toggle.focus();
    }
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });
}
})();

=== DESIGN AND QUALITY ===
- Mobile first and fully responsive from 320px to wide desktop. No horizontal scrolling. Tap targets at least 44px.
- One stylesheet, assets/styles.css, with CSS custom properties for colors, radius and fonts. Use Google Fonts if you want a custom font.
- Semantic HTML: header, nav, main with id="main", section with aria-labelledby, footer. One h1 per page.
- Visible focus styles, color contrast of at least 4.5:1 for text, alt text on meaningful images, aria-hidden on decorative ones.
- Respect prefers-reduced-motion.
- Include assets/favicon.svg.
- Write real, specific copy for this business. No lorem ipsum. Do not invent prices, reviews, ratings, awards or license numbers.
- Do not use emojis.

=== OUTPUT FORMAT ===
1. First, print the folder tree.
2. Then print every file in full, each one preceded by its path, for example "layout/theme.liquid", "templates/index.liquid", "snippets/header.liquid", "assets/styles.css". Do not output config.js.
3. No explanations between files beyond the path.

=== FINAL CHECK BEFORE YOU ANSWER ===
- layout/theme.liquid outputs {{ content_for_layout }} and renders the seo, header and footer snippets.
- templates/index.liquid, templates/service.liquid and templates/404.liquid exist.
- Services come from site.services, never hard coded.
- Every service links to /services/{{ service.slug }} and /checkout/{{ service._id }}.
- "Book now" buttons point to /#services. "Sign in" points to /login. "Track my order" and "My orders" point to /app.
- Every link starts with "/" and none ends in .html or .liquid.
- Values inside HTML attributes use | escape.
- Optional fields (logo, cover, discount, phone, email) are wrapped in {% if %}.
- No template named login, register, checkout or app. No booking, sign in, payment or chat forms anywhere.
````

## Tips

- Ask for changes in the same chat, for example "make the hero darker" or "add a page for Round Rock". Ask the AI to return the full updated files.
- Keep your services up to date in **Services** in your dashboard. The theme reads them on every visit, so you never need to edit the website when a service changes.
- After publishing, turn on the [Tracker](tracker.md) and the [Orca chatbot](orca-chatbot.md) from their tabs. ArrayQ adds them to your pages, so the AI does not need to include them.

> **Note**
>
> The prompt tells the AI not to build checkout, sign in or account pages, because ArrayQ provides them. See [Built-in pages](built-in-pages.md) for what each one does.
