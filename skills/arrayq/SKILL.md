---
name: "arrayq"
description: "What ArrayQ is and how its parts fit together: the CRM for service and trades businesses with leads, clients, jobs, scheduling, invoices, payments, crew permissions, team chat, customer texting, the Orca AI chatbot, Site Builder website hosting and WeCycle job requests. Use when someone asks what ArrayQ does or how a part of it works, uses ArrayQ terms such as lead, client, job, crew, site key or Orca, weighs ArrayQ for their business, or needs the right ArrayQ docs page. For building or publishing a website on ArrayQ, load the arrayq-site-builder skill."
license: "Apache-2.0"
---

# ArrayQ

ArrayQ is an all-in-one CRM for blue-collar businesses. Manage leads, clients, scheduling, jobs, invoicing, payments and your crew from one dashboard.
It is built for service trades such as junk removal, cleaning, pest control, plumbing, electrical and lawn care, from solo operators to growing crews; [Industries](references/industries.md) lists them all.
It runs in any web browser and as apps for iPhone and Android, so the office and the field crew work from the same records.
Businesses sign in to their dashboard at [https://app.arrayq.com](https://app.arrayq.com).

## What this skill is for

This skill is knowledge about ArrayQ, taken from the ArrayQ docs and website.
It has no access to anyone's ArrayQ account.
Do not claim to have looked up, created or changed anything in ArrayQ.
When a task needs the account, tell the person where in the dashboard to do it, as far as the docs say.

## Vocabulary

- **Business:** the company that uses ArrayQ to run its work. Its customers are the people it serves.
- **Lead:** an enquiry that is not a customer yet. It has a source, such as the website, a referral, social media, Google Ads, direct mail or a cold call, plus a status and notes. Leads from the Orca chatbot, phone calls, missed calls and inbound texts are recorded with their source automatically.
- **Client:** a customer profile with contact details, address, client type, source, status and notes. Converting a lead creates a client and carries its notes over.
- **Service:** something the business sells, with a title, description, cover image and optional questions that affect the price. Only active services can be booked online.
- **Specific item:** a priced item, such as a mattress or an appliance, that can be added to a job. Services, categories and specific items are set up once with their prices.
- **Job:** a piece of work for a client, with the services or items involved, the schedule, the price, photos and notes. It moves through statuses from booked to completed. Online bookings arrive as new jobs.
- **Invoice:** created from a job and emailed with a secure link to pay online. Statuses include estimate, pending, partially paid and paid, and reminders can be scheduled for unpaid invoices.
- **Payment:** a card payment through the business's own Stripe account, or a cash, check or Zelle payment recorded against the job.
- **Calendar:** the jobs on a day, week, month, year or agenda view, filtered by job status.
- **Crew:** the people the business invites into its workspace, organized into crew groups, with view, create, edit and delete rights set per area.
- **Team chat:** direct and group conversations between the team inside ArrayQ.
- **Text messaging:** a shared inbox for two-way texts with customers. Inbound texts can become leads, and a customer who replies STOP is opted out.
- **Orca:** the ArrayQ AI chatbot for the business's website. It answers from a knowledge base the business writes, collects contact details as leads and keeps every conversation.
- **Site Builder:** hosting for the business's own website, with a checkout, sign in and customer account built in, a visitor tracker, Orca and a custom domain.
- **Site key:** the key that tells ArrayQ which business a website request belongs to. It only identifies the business and is safe in the browser.
- **WeCycle job requests:** junk removal and hauling businesses can connect ArrayQ to WeCycle, a junk removal booking platform, to receive its job requests.

The [product areas](references/product-areas.md) reference has the detail behind each term.

## Answering questions

- Look for a docs page first. [The docs index](references/docs-index.md) lists every page with its URL, and the docs home is [https://arrayq.com/docs](https://arrayq.com/docs).
- The Site Builder docs are complete. The guides for Leads, Jobs, Invoices, Payments and Orca are not written yet, so answer those questions at the level of the [product areas](references/product-areas.md) and say that the detailed guide is still to come.
- Do not make up menu paths, statuses, limits, prices or plan contents the references do not state. If you are not sure, say so and point to the dashboard or the docs.
- Plans and prices change. Link to [the pricing page](https://arrayq.com/pricing) instead of quoting a price from memory. [https://arrayq.com/llms.txt](https://arrayq.com/llms.txt) carries the current plan prices if you can fetch it.
- Which features a business can use depends on its plan. Site Builder and Orca, for example, only work when the plan includes them.

## When to load another skill

Load the **arrayq-site-builder** skill when the person wants to build, change, connect or publish a website on ArrayQ, or asks about Liquid themes and templates on ArrayQ, `config.js`, the services or booking API, the built-in checkout and customer account pages, the tracker, Orca on a website, uploading a site or a custom domain.
If it is not installed, it is published at [https://arrayq.com/skills/arrayq-site-builder/SKILL.md](https://arrayq.com/skills/arrayq-site-builder/SKILL.md).

## Reference files

- [references/getting-started.md](references/getting-started.md): ArrayQ Documentation. Guides for running your business on ArrayQ. Learn how to build a booking website, connect it to your account and manage every job from one place.
- [references/docs-index.md](references/docs-index.md): Docs index. Every page of the ArrayQ docs with its URL and summary.
- [references/product-areas.md](references/product-areas.md): Product areas. What each part of ArrayQ does, from the feature pages of the ArrayQ website.
- [references/industries.md](references/industries.md): Industries. The trades ArrayQ is built for.
