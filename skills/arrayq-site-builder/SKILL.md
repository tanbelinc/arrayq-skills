---
name: "arrayq-site-builder"
description: "Build, connect and publish a service business website on ArrayQ Site Builder hosting. Covers the static site rules, the config.js file ArrayQ serves, listing services and linking to the built-in checkout, sign in and customer account pages, upload limits, publishing, the visitor tracker, the Orca chatbot, custom domains and troubleshooting. Use when someone wants a website that runs on ArrayQ, asks to build, fix or restyle an ArrayQ site, mentions Site Builder, config.js, SITE_CONFIG, the ArrayQ services or booking API or the built-in checkout, or needs a folder they can upload to ArrayQ."
license: "Apache-2.0"
---

# ArrayQ Site Builder

ArrayQ Site Builder hosts a business's own static website and connects it to their ArrayQ account.
The business brings the marketing pages: a home page, and extra pages such as an about page, location pages or a blog.
ArrayQ serves them and adds the rest: a checkout for each service, sign in, and a customer account with order tracking, invoices and live chat.
Every booking lands in the business's ArrayQ dashboard as a new job.

The workflow and rules are below.
Page-level detail, the exact limits and the API live in the reference files listed at the end; read the one you need when you get to that step.

## What you deliver

You cannot sign in to ArrayQ, upload files or publish a site for the business.
Do not say or suggest that you published, previewed or checked anything in their ArrayQ account.
Your end product is a folder of static files that the business owner uploads and publishes in Site Builder themselves.

- If you can write files, write the site into one folder with `index.html` at its top level.
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
   A site hosted elsewhere gets no `config.js` and no built-in pages, so it needs its own config file with the site key and its own booking form.
   Read [Connect your site](references/connect-your-site.md#sites-hosted-elsewhere) and [Custom checkout page](references/custom-checkout-page.md) for that case.
3. **Build the pages.**
   Plain HTML, CSS and vanilla JavaScript.
   Follow the required sections of `index.html` in the [Build with AI prompt](references/build-with-ai.md#the-prompt): header, hero, services section, customer account section, how it works, FAQ, closing call to action and footer.
   Give every extra page the same header and footer.
4. **Wire up the services list.**
   Start from [assets/app.js](assets/app.js), the reference script from the docs, and replace its sample services with ones that fit the business.
   It reads `window.SITE_CONFIG`, loads the active services, renders one card per service and links each card to its checkout.
   The endpoint, headers, paging and response fields are in [Services and booking](references/services-and-booking.md).
5. **Link to the built-in pages** (table below).
6. **Check the folder** against the checklist below and fix anything that fails.
7. **Hand it over** with the steps at the end of this file.

## Hosting rules and why they matter

**Static files only.**
Site Builder serves the uploaded files as they are.
PHP, Node.js servers, `.env` files, build steps, frameworks that need compiling and npm packages do not run.

**`index.html` at the top level.**
It is the home page, and the upload fails without it.
A path with no matching file falls back to it.

**Allowed file types and limits.**
Site Builder rejects an upload with a file type outside its list, or with too many or too large files.
The list and the numbers are in [Publish your site](references/publish.md#limits).
Leave out notes, scripts and design files, prefer inline SVG and CSS to large images, and keep file and folder names to letters, numbers, dashes and dots.

**Everything in the folder is public.**
Never put secrets or API keys in any file.
The site key ArrayQ serves in `config.js` is safe in the browser, because it only identifies the business.

**`config.js` comes from ArrayQ.**
ArrayQ serves its own `config.js` at the root of the published site and ignores any uploaded copy.
Every page loads `./config.js` (or `../config.js` from a subfolder) before `app.js`, both with `defer`.
Do not include `config.js` in the folder you deliver.
For a local preview, a temporary `config.js` with an empty `SITE_KEY` shows the sample services; remind the owner to leave it out of the upload.

**Do not build what ArrayQ already provides.**
No booking form, sign in form, account page, payment form or chat widget.
The built-in pages handle all of it and are already connected to the business's account.
`/login`, `/register` and everything under `/checkout/` and `/app/` always show the built-in pages, so never create a folder named `login`, `register`, `checkout` or `app`, or a file with one of those names and no extension.
Files with an extension, such as `app.js` or `checkout.html`, are fine.

**One checkout per service.**
There is no general checkout page.
"Book now" buttons go to the service list, and each service card links to the checkout for that service.

**Two kinds of links.**
Links to the built-in pages start with `/`, because those pages live at the root of the domain, not in the uploaded folder.
Links between the site's own files are relative, such as `./about.html` or `../styles.css`, so the folder also works when it is opened from disk before upload, where links starting with `/` break.
The home link in the header is `/`.

**Built-in pages only exist on the published site.**
They work on the site's ArrayQ link and its custom domain, not in template previews, where links to them do nothing.
Tell the owner, so they do not think the site is broken.

**Service text is typed by people.**
Build service cards with `document.createElement` and `textContent`, never `innerHTML`, so stray HTML in a service description cannot run on the page.

**The site must look complete before it is published.**
When `SITE_KEY` is empty, show sample service cards instead of calling the API.

**Tracker and Orca are added by ArrayQ.**
On a hosted site the owner switches them on in Site Builder and ArrayQ adds them to every HTML page, so do not add their scripts.

**Say accurately how booking works.**
Booking needs no payment upfront, customers sign in with an emailed code and no password, invoices are paid online after the job, and changes are requested by messaging from the account.
Use these facts in the FAQ and anywhere the copy explains booking.

## Links to the built-in pages

| Button                    | Link                                                                          |
| ------------------------- | ----------------------------------------------------------------------------- |
| Book now                  | The service list: `#services` on the home page, `/#services` from other pages |
| A service card            | `/checkout/` followed by the service `_id`, URL-encoded                       |
| Sign in                   | `/login`                                                                      |
| Create account            | `/register`                                                                   |
| Track my order, My orders | `/app`                                                                        |
| Message us                | `/app/messages`                                                               |
| Home                      | `/`                                                                           |

`/login` and `/register` take a `next` path and an `email` value; see [Built-in pages](references/built-in-pages.md#query-parameters).

## Checklist before you hand it over

- `index.html` is at the top level.
- Every page loads `./config.js` (or `../config.js`) before `app.js`, and the folder has no `config.js`.
- No folder is named `login`, `register`, `checkout` or `app`.
- There is no booking, sign in, payment or chat form anywhere.
- Every "Book now" button points to the service list, and every service card points to its `/checkout/` link.
- "Sign in" points to `/login`; "Track my order" and "My orders" point to `/app`.
- Links between the site's own files are relative.
- Service cards are built with `textContent`.
- The site looks complete with `SITE_KEY` set to an empty string.
- Every file type is on the allowed list and the folder is within the limits.
- The copy contains no invented prices, reviews, ratings, awards or license numbers.

## Hand over to the owner

Give the owner these steps, adapted to what you built:

1. Save the files in one folder, keeping the same file names and subfolders.
2. In the ArrayQ dashboard at [https://app.arrayq.com](https://app.arrayq.com), open **Site Builder**; the **Builder** tab opens first.
3. Select the whole folder, check that `index.html` is at the top of the list, and click **Publish site**.
4. Open the live site and click a service to check the checkout.
   A test booking creates a real job, so use a test service or cancel the job afterwards.
5. Optionally, switch on the **Tracker** and the **Orca chatbot** in their tabs and connect a custom domain in the **Domain** tab.

To change the site later, the owner uploads the full folder again and clicks **Publish site**.
Services are read live from the dashboard, so editing a service never needs a new upload.
The business's plan must include Site Builder, or visitors see a "Site unavailable" page.
Details are in [Publish your site](references/publish.md), [Tracker](references/tracker.md), [Orca chatbot](references/orca-chatbot.md) and [Custom domain](references/custom-domain.md).

## When something goes wrong

Start with [Troubleshooting](references/troubleshooting.md).
It covers missing services, site key errors, booking errors, failed uploads, broken links after publishing, built-in pages that do nothing and custom domains stuck on DNS.

## Reference files

- [references/overview.md](references/overview.md): Site Builder Overview. How ArrayQ Site Builder works. Build a static marketing website, publish it on ArrayQ and start taking bookings through the built-in checkout, sign in and customer account pages.
- [references/build-with-ai.md](references/build-with-ai.md): Build Your Site with AI. A complete, copyable prompt that lets ChatGPT, Claude or any AI coding tool build a ready-to-publish ArrayQ Site Builder website in one go, wired to your services and the built-in checkout, sign in and customer account pages.
- [references/build-your-site.md](references/build-your-site.md): Build Your Site. Rules and structure for a static marketing website that runs on ArrayQ Site Builder, including page layout, links to the built-in pages and relative links between your own files.
- [references/built-in-pages.md](references/built-in-pages.md): Built-in Pages. Every site hosted on ArrayQ gets a ready-made checkout, sign in, registration and customer account with order tracking and live chat. Link to them from your pages instead of building your own.
- [references/connect-your-site.md](references/connect-your-site.md): Connect Your Site. Sites hosted on ArrayQ need no API key. Load the config.js file ArrayQ serves with your site and your services, bookings, tracker and Orca chatbot connect automatically. Use the site key only for websites hosted elsewhere.
- [references/services-and-booking.md](references/services-and-booking.md): Services and Booking API. Load your ArrayQ services and create bookings from your website. Endpoints, headers, request fields and response shapes for the public booking API. Hosted sites read the key from config.js.
- [references/custom-checkout-page.md](references/custom-checkout-page.md): Build a Custom Checkout Page. An optional, fully custom booking checkout page for ArrayQ Site Builder. Most sites should link to the built-in checkout instead. Use this when you need your own booking form or host your site elsewhere.
- [references/publish.md](references/publish.md): Publish Your Site. Upload your website folder to ArrayQ Site Builder, preview it on desktop, tablet and mobile, publish updates and remove a site you no longer need.
- [references/tracker.md](references/tracker.md): Visitor Tracker. Track page views, clicks and form submissions on your website with the ArrayQ tracker, on sites hosted by ArrayQ or anywhere else.
- [references/orca-chatbot.md](references/orca-chatbot.md): Orca Chatbot. Add the Orca AI chat assistant to your website so visitors can ask questions and book services any time, on ArrayQ hosted sites or elsewhere.
- [references/custom-domain.md](references/custom-domain.md): Connect a Custom Domain. Serve your ArrayQ Site Builder website on your own domain. Add a CNAME record, verify it and get HTTPS set up automatically.
- [references/troubleshooting.md](references/troubleshooting.md): Troubleshooting. Fix common ArrayQ Site Builder problems, from missing services and site key errors to upload failures, broken links and custom domain issues.
- [assets/app.js](assets/app.js): Reference app.js. Copied from the Build Your Site with AI page.
