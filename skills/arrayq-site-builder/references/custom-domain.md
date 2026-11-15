# Connect a Custom Domain

Serve your ArrayQ Site Builder website on your own domain. Add a CNAME record, verify it and get HTTPS set up automatically.

Source: [https://arrayq.com/docs/site-builder/custom-domain](https://arrayq.com/docs/site-builder/custom-domain), last updated 2026-09-17.

Once your site is published, you can serve it on your own domain, such as `www.yourcompany.com`. ArrayQ sets up HTTPS for you.

## Connect your domain

1. **Publish first**

   A custom domain needs a published site. See [Publish your site](publish.md).

2. **Enter the domain**

   In **Site Builder**, open **Domain**, type your domain and submit. ArrayQ shows the DNS record to add.

3. **Add the CNAME record**

   Sign in to the company where you manage your domain (your registrar or DNS host) and add the record exactly as shown.

4. **Verify and connect**

   Back in the **Domain** tab, click **Verify and connect**. ArrayQ checks the record and sets up the secure certificate.

The record looks like this. Use the exact **Name** and **Target** from your dashboard:

| Type | Name | Target |
| --- | --- | --- |
| `CNAME` | `www` | The target shown in your dashboard |

> **Tip: Use a subdomain**
>
> Most DNS providers do not allow a CNAME record on the bare domain (`yourcompany.com`). Connect `www.yourcompany.com` and set up a redirect from the bare domain at your DNS provider.

## Domain status

| Status | Meaning |
| --- | --- |
| Waiting for DNS | The record is missing or has not spread yet. DNS changes can take from a few minutes to a few hours |
| Securing | The record is correct and the HTTPS certificate is being created. The page updates on its own |
| Connected | Your site is live on your domain |
| Needs attention | Setup failed. Check the record and click **Verify and connect** again |

## Rules

- You can connect one custom domain per business.
- A domain can only be connected to one site.
- ArrayQ and WeCycle domains cannot be used as custom domains.
- To switch domains, remove the current one first. You cannot remove a domain while it is still being secured.

## Remove a domain

Click the remove button in the **Domain** tab and confirm. Your site stays available on its ArrayQ link. Deleting your site also removes its custom domain.
