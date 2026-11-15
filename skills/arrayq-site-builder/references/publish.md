# Publish Your Site

Upload your website folder to ArrayQ Site Builder, preview it on desktop, tablet and mobile, publish updates and remove a site you no longer need.

Source: [https://arrayq.com/docs/site-builder/publish](https://arrayq.com/docs/site-builder/publish), last updated 2026-11-14.

When your files are ready, upload them in the **Builder** tab. ArrayQ checks every file, publishes the site and gives you a link to share.

## Publish for the first time

1. **Open the Builder tab**

   In your dashboard, open **Site Builder**. The **Builder** tab opens first.

2. **Choose your files**

   Select your whole site folder, or pick individual files. When you pick a folder, its own name is removed from the paths, so `my-site/index.html` is uploaded as `index.html`.

3. **Review the list**

   Check that `index.html` is at the top level and that the total size fits the limits below.

4. **Publish**

   Click **Publish site**. Files upload four at a time. When the upload finishes, the new version goes live.

> **Tip**
>
> If some files fail to upload, click **Publish site** again. Only the files that failed are sent again. Changing the file selection starts a fresh upload.

## Preview and open

- **Preview** shows your live site inside the dashboard, with desktop, tablet and mobile views.
- **Open** opens the live site in a new tab. Share this link until you connect a [custom domain](custom-domain.md).

## Publish an update

Upload the full folder again and click **Publish site**. The new version replaces the old one in a single step, so visitors never see a half-updated site. Your previous version is archived.

> **Note**
>
> ArrayQ tells browsers not to cache any file of your site, including CSS, JavaScript and images.
> Visitors get the new version on their next page load.

## Limits

| Limit | Value |
| --- | --- |
| Files per site | 200 |
| Size per file | 15 MB |
| Total size | 50 MB |
| Path length | 500 characters |
| Required file | `index.html` at the top level |

Allowed file types:

| Type | Extensions |
| --- | --- |
| Pages | `.html`, `.htm` |
| Code and data | `.css`, `.js`, `.mjs`, `.json`, `.map`, `.xml`, `.txt`, `.webmanifest`, `.wasm` |
| Images | `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.avif`, `.ico` |
| Fonts | `.woff`, `.woff2`, `.ttf`, `.otf` |
| Media and documents | `.mp3`, `.wav`, `.ogg`, `.mp4`, `.webm`, `.pdf` |

Files with any other extension are rejected. You do not need to upload `config.js`, ArrayQ serves its own. Remove files such as `.md` notes, `.sh` scripts or `.psd` design files before you upload, or keep them out of the folder you select.

## Delete your site

Click **Delete site** and confirm. This removes the published files and disconnects your custom domain. Your site key, services and bookings are not affected.

## Plan access

A published site stays online while your plan includes Site Builder. If the plan changes, visitors see a "Site unavailable" page until Site Builder is active again. Your files are kept.
