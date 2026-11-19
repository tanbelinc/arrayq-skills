# ArrayQ agent skills

Agent skills for [ArrayQ](https://arrayq.com).
An agent skill is a folder with instructions and reference files that an AI agent loads when a task needs it.

## Skills

- [`arrayq`](skills/arrayq/SKILL.md): What ArrayQ is and how its parts fit together: the CRM for service and trades businesses with leads, clients, jobs, scheduling, invoices, payments, crew permissions, team chat, customer texting, the Orca AI chatbot, Site Builder website hosting and WeCycle job requests. Use when someone asks what ArrayQ does or how a part of it works, uses ArrayQ terms such as lead, client, job, crew, site key or Orca, weighs ArrayQ for their business, or needs the right ArrayQ docs page. For building or publishing a website on ArrayQ, load the arrayq-site-builder skill.
- [`arrayq-site-builder`](skills/arrayq-site-builder/SKILL.md): Build, connect and publish a service business website on ArrayQ Site Builder hosting as a Liquid theme. Covers the theme structure (layout, templates, snippets, assets), clean URLs and service pages, the theme data objects (site.provider, site.services, service), linking to the built-in checkout, sign in and customer account pages, upload limits, publishing, the visitor tracker, the Orca chatbot, custom domains and troubleshooting. Use when someone wants a website that runs on ArrayQ, asks to build, fix or restyle an ArrayQ site or theme, mentions Site Builder, Liquid templates on ArrayQ, site.services, config.js, SITE_CONFIG, the ArrayQ services or booking API or the built-in checkout, or needs a folder they can upload to ArrayQ.

## Install in a coding agent

The `skills` command line tool installs both skills into coding agents such as Claude Code, Cursor and Codex.
It needs Node.js.
Run this in your project folder:

```sh
npx skills add tanbelinc/arrayq-skills
```

The tool lists the skills it finds and asks which ones to install and for which agents.
Run `npx skills update` later to get the latest version.

## Use in a chat app

Chat apps that accept a skill as a zip file, such as Claude, take the zips from the ArrayQ website:

- [arrayq.zip](https://arrayq.com/skills/arrayq.zip)
- [arrayq-site-builder.zip](https://arrayq.com/skills/arrayq-site-builder.zip)

Each zip holds one folder named after the skill.
Upload it as it is, without unzipping it.

The [agent skills page](https://arrayq.com/docs/agent-skills) in the ArrayQ docs has the steps for each way to install and what to ask once a skill is installed.

## Where these files come from

The files in this repository are built from the [ArrayQ docs](https://arrayq.com/docs).
Every docs update replaces them, so changes are made in the docs, not here.

If a skill gets something wrong or is missing something, open an issue on [this repository](https://github.com/tanbelinc/arrayq-skills/issues).

## License

The skills are licensed under the [Apache License 2.0](LICENSE).
The ArrayQ name and logo are not covered by the license.
