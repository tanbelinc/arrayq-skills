---
name: "arrayq-site-builder"
description: "Build, connect and publish a service business website on ArrayQ Site Builder hosting as a Liquid theme. Covers the theme structure (layout, templates, snippets, assets), clean URLs and service pages, the theme data objects (site.provider, site.services, service), linking to the built-in checkout, sign in and customer account pages, upload limits, publishing, the visitor tracker, the Orca chatbot, custom domains and troubleshooting. Use when someone wants a website that runs on ArrayQ, asks to build, fix or restyle an ArrayQ site or theme, mentions Site Builder, Liquid templates on ArrayQ, site.services, config.js, SITE_CONFIG, the ArrayQ services or booking API or the built-in checkout, or needs a folder they can upload to ArrayQ."
license: "Apache-2.0"
---

# ArrayQ Site Builder

ArrayQ Site Builder hosts a business's own website and connects it to their ArrayQ account.
The website is a Liquid theme that ArrayQ renders on the server for every visit, filled with the business's profile, services and items, so every page arrives as complete, indexable HTML.
The business brings the marketing pages: a home page, a page per service, and extra pages such as an about page or location pages.
ArrayQ adds the rest: a checkout for each service, sign in, and a customer account with order tracking, invoices and live chat.
Every booking lands in the business's ArrayQ dashboard as a new job.

The workflow and rules are below.
The exact theme data, limits and API live in the reference files listed at the end; read the one you need when you get to that step.

## What you deliver

You cannot sign in to ArrayQ, upload files or publish a site for the business.
Do not say or suggest that you published, previewed or checked anything in their ArrayQ account.
Your end product is a theme folder that the business owner uploads and publishes in Site Builder themselves.

- If you can write files, write the theme into one folder with `layout`, `templates`, `snippets` and `assets` at its top level.
- If you can only reply with text, print the folder tree first, then every file in full with its path above it, and nothing between files beyond the path.
  This is the output format of the [Build with AI prompt](references/build-with-ai.md#the-prompt).
- Always return complete, final files, never placeholders such as "rest of the code here".
- Finish with the hand-over steps at the end of this file.

## Workflow

1. **Collect the business details.**
   Business name, trade, service area, phone, email, brand colors, tone, the extra pages they want, and anything else true about the business, such as being licensed and insured.
   Ask for what is missing.
   Never invent prices, reviews, ratings, awards or license numbers: the site is public and the business has to stand behind every claim on it.
2. **Confirm where the site will be hosted.**
   Assume ArrayQ hosting unless the owner says otherwise.
   Liquid only renders on ArrayQ. A site hosted elsewhere must be plain HTML that loads services in the browser with the site key, and needs its own booking form.
   Read [Connect your site](references/connect-your-site.md#sites-hosted-elsewhere), [Services and booking](references/services-and-booking.md) and [Custom checkout page](references/custom-checkout-page.md) for that case.
3. **Build the theme.**
   Follow the required files in the [Build with AI prompt](references/build-with-ai.md#the-prompt): `layout/theme.liquid`, the `seo`, `header`, `footer` and `service-card` snippets, and the `index`, `service` and `404` templates.
   Folder roles and URL rules are in [Build your site](references/build-your-site.md).
4. **Fill it with theme data.**
   Read services from `site.services` and business details from `site.provider`; never hard code them.
   Every field is in [Theme data](references/theme-data.md).
5. **Link to the built-in pages** (table below).
6. **Check the folder** against the checklist below and fix anything that fails.
7. **Hand it over** with the steps at the end of this file.

## Theme rules and why they matter

**The folder is a Liquid theme.**
`layout/theme.liquid` wraps every page and outputs it with `{{ content_for_layout }}`.
Each file in `templates/` is a page: `templates/index.liquid` is the home page, `templates/about.liquid` is `/about`, and `templates/service.liquid` renders `/services/SERVICE_SLUG` for every active service.
`templates/404.liquid` is shown, with a 404 status, for any URL that matches no page or no active service.
Reusable pieces go in `snippets/` and are included with `{% render 'NAME' %}`.
CSS, scripts, images and fonts go in `assets/` and are served at `/assets/...`.
`.liquid` files are never served directly.

**Standard Liquid only.**
ArrayQ runs standard Shopify style Liquid. Only Liquid runs on the server: PHP, Node.js servers, `.env` files, build steps and npm packages do not.
A filter that does not exist stops the page from rendering, so stick to common filters such as `escape`, `strip_html`, `truncate`, `newline_to_br`, `date`, `slice`, `size` and `default`.

**Snippets have their own scope.**
`site`, `page` and `service` are available in every snippet.
Any other variable, such as a loop variable, must be passed: `{% render 'service-card', service: service %}`.

**Escape attributes.**
Output is not escaped automatically.
Add `| escape` to every value placed inside an HTML attribute, such as `alt` or a meta `content`.
`service.description` is HTML written in the dashboard; output it as is, or with `| strip_html` for plain text.

**Handle empty data.**
A new business may have no services, no logo and no phone yet.
Use `{% for %}` with `{% else %}` for lists and wrap optional fields in `{% if %}`, so the site still looks complete.

**Every link starts with `/`.**
Pages live at clean URLs such as `/services/junk-removal`, where a relative link like `./styles.css` would point inside `/services/`.
Never put `.html` or `.liquid` in a link; URLs ending in `.html` redirect to the address without it.

**Allowed file types and limits.**
Site Builder rejects an upload with a file type outside its list, or with too many or too large files.
The list and the numbers are in [Publish your site](references/publish.md#limits).
Leave out notes, scripts and design files, prefer inline SVG and CSS to large images, and keep file and folder names to letters, numbers, dashes and dots.

**Everything in `assets/` is public.**
Never put secrets or API keys in any file.

**Do not build what ArrayQ already provides.**
No booking form, sign in form, account page, payment form or chat widget.
The built-in pages handle all of it and are already connected to the business's account.
`/login`, `/register` and everything under `/checkout/` and `/app/` always show the built-in pages, so never create a template named `login`, `register`, `checkout` or `app`.

**One checkout per service.**
There is no general checkout page.
"Book now" buttons go to the service list at `/#services`, and each service links to `/checkout/{{ service._id }}`.

**Built-in pages and Liquid only exist on the published site.**
They work on the site's ArrayQ link and its custom domain.
Template previews show the raw files, and opening the folder on a computer shows unrendered Liquid.
Tell the owner, so they do not think the site is broken.

**JavaScript is optional.**
Pages are complete without it. A small `assets/app.js` for the mobile menu is enough; start from [assets/app.js](assets/app.js).
Only scripts that call the ArrayQ API need `/config.js`; see [Connect your site](references/connect-your-site.md).

**Tracker and Orca are added by ArrayQ.**
The owner switches them on in Site Builder and ArrayQ adds them to every page, so do not add their scripts.

**Say accurately how booking works.**
Booking needs no payment upfront, customers sign in with an emailed code and no password, invoices are paid online after the job, and changes are requested by messaging from the account.
Use these facts in the FAQ and anywhere the copy explains booking.

## Links

| Button                    | Link                              |
| ------------------------- | --------------------------------- |
| Book now                  | `/#services`                      |
| A service page            | `/services/{{ service.slug }}`    |
| Book a service            | `/checkout/{{ service._id }}`     |
| Sign in                   | `/login`                          |
| Create account            | `/register`                       |
| Track my order, My orders | `/app`                            |
| Message us                | `/app/messages`                   |
| Home                      | `/`                               |
| Stylesheet                | `/assets/styles.css`              |

`/login` and `/register` take a `next` path and an `email` value; see [Built-in pages](references/built-in-pages.md#query-parameters).

## Checklist before you hand it over

- `layout/theme.liquid` outputs `{{ content_for_layout }}` and renders the `seo`, `header` and `footer` snippets.
- `templates/index.liquid`, `templates/service.liquid` and `templates/404.liquid` exist.
- Services come from `site.services` and business details from `site.provider`, never hard coded.
- Every service links to its page and to its `/checkout/` link.
- "Book now" points to `/#services`, "Sign in" to `/login`, "Track my order" and "My orders" to `/app`.
- Every link starts with `/` and none ends in `.html` or `.liquid`.
- Values inside HTML attributes use `| escape`.
- Optional fields are wrapped in `{% if %}` and lists have an `{% else %}` message.
- No template is named `login`, `register`, `checkout` or `app`, and there is no booking, sign in, payment or chat form anywhere.
- Every file type is on the allowed list and the folder is within the limits.
- The copy contains no invented prices, reviews, ratings, awards or license numbers.

## Hand over to the owner

Give the owner these steps, adapted to what you built:

1. Save the files in one folder, keeping the same file names and subfolders.
2. In the ArrayQ dashboard at [https://app.arrayq.com](https://app.arrayq.com), open **Site Builder**; the **Builder** tab opens first.
3. Select the whole folder, check that `layout`, `templates`, `snippets` and `assets` are at the top of the list, and click **Publish site**.
4. Open the live site, open a service page and click **Book now** to check the checkout.
   A test booking creates a real job, so use a test service or cancel the job afterwards.
5. Optionally, switch on the **Tracker** and the **Orca chatbot** in their tabs and connect a custom domain in the **Domain** tab.

To change the design later, the owner uploads the full folder again and clicks **Publish site**.
Services and the business profile are read from the dashboard on every visit, so editing them never needs a new upload; changes show within a minute.
The business's plan must include Site Builder, or visitors see a "Site unavailable" page.
Details are in [Publish your site](references/publish.md), [Tracker](references/tracker.md), [Orca chatbot](references/orca-chatbot.md) and [Custom domain](references/custom-domain.md).

## When something goes wrong

Start with [Troubleshooting](references/troubleshooting.md).
It covers Liquid render errors, pages showing the 404 page, missing services, failed uploads, broken links after publishing, built-in pages that do nothing and custom domains stuck on DNS.

## Reference files

- [references/overview.md](references/overview.md): Site Builder Overview. How ArrayQ Site Builder works. Build a Liquid theme, publish it on ArrayQ and get server-rendered pages filled with your services, plus a built-in checkout, sign in and customer account.
- [references/build-with-ai.md](references/build-with-ai.md): Build Your Site with AI. A complete, copyable prompt that lets ChatGPT, Claude or any AI coding tool build a ready-to-publish ArrayQ Site Builder Liquid theme in one go, rendered on the server with your services and wired to the built-in checkout, sign in and customer account pages.
- [references/build-your-site.md](references/build-your-site.md): Build Your Site. The folder structure, routing, layout, snippets and link rules for a Liquid theme on ArrayQ Site Builder. Pages are rendered on the server with your services, so they are fully indexable by search engines.
- [references/theme-data.md](references/theme-data.md): Theme Data. Every object and field you can use in an ArrayQ Site Builder Liquid theme, including your business profile, services, categories and items, plus filters, escaping and caching.
- [references/built-in-pages.md](references/built-in-pages.md): Built-in Pages. Every site hosted on ArrayQ gets a ready-made checkout, sign in, registration and customer account with order tracking and live chat. Link to them from your pages instead of building your own.
- [references/connect-your-site.md](references/connect-your-site.md): Connect Your Site. Liquid themes on ArrayQ need no API key. When your own browser scripts call the ArrayQ API, load the config.js file ArrayQ serves. Use the site key only for websites hosted elsewhere.
- [references/services-and-booking.md](references/services-and-booking.md): Services and Booking API. The public ArrayQ API for loading services and creating bookings from JavaScript. Use it for custom checkout pages, plain HTML sites and websites hosted outside ArrayQ. Liquid themes get services without it.
- [references/custom-checkout-page.md](references/custom-checkout-page.md): Build a Custom Checkout Page. An optional, fully custom booking checkout page for ArrayQ Site Builder. Most sites should link to the built-in checkout instead. Use this when you need your own booking form or host your site elsewhere.
- [references/publish.md](references/publish.md): Publish Your Site. Upload your theme folder to ArrayQ Site Builder, preview it on desktop, tablet and mobile, publish updates and remove a site you no longer need.
- [references/tracker.md](references/tracker.md): Visitor Tracker. Track page views, clicks and form submissions on your website with the ArrayQ tracker, on sites hosted by ArrayQ or anywhere else.
- [references/orca-chatbot.md](references/orca-chatbot.md): Orca Chatbot. Add the Orca AI chat assistant to your website so visitors can ask questions and book services any time, on ArrayQ hosted sites or elsewhere.
- [references/custom-domain.md](references/custom-domain.md): Connect a Custom Domain. Serve your ArrayQ Site Builder website on your own domain. Add a CNAME record, verify it and get HTTPS set up automatically.
- [references/troubleshooting.md](references/troubleshooting.md): Troubleshooting. Fix common ArrayQ Site Builder problems, from Liquid errors and missing services to upload failures, broken links and custom domain issues.
- [assets/app.js](assets/app.js): Reference app.js. Copied from the Build Your Site with AI page.
