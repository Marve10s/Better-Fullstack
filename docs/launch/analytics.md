# Zero-cost product analytics

Better Fullstack uses two complementary analytics layers:

- Vercel Web Analytics remains enabled for privacy-friendly page-view and referrer reporting. On a Hobby team, collection pauses after the included limit instead of creating overage charges.
- PostHog captures the product funnel. The free PostHog Cloud project includes one million product analytics events per month, requires no payment card, and stops at the free-plan limit.

## PostHog setup

1. Create one PostHog Cloud project in the EU region.
2. Do not add a payment card. If billing is enabled later, set the Product Analytics billing limit to `$0` before deploying.
3. Add the following production variables to the Vercel project:

   ```dotenv
   VITE_PUBLIC_POSTHOG_KEY=phc_your_project_key
   VITE_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
   ```

4. Redeploy the production site.
5. Visit the homepage, open the builder, and copy a generated command. Confirm the events arrive in PostHog Live Events.

The client is intentionally configured with cookieless capture, `person_profiles: "never"`, Do Not Track support, no autocapture, and no session replay. Event properties must not include project names, command strings, URLs containing shared stack state, email addresses, or other user-provided content.

## Initial funnel

Create this funnel in PostHog:

1. `$pageview`, filtered to the landing page or campaign.
2. `builder_opened`.
3. `builder_command_copied`.

Useful supporting trends:

- `install_command_copied` — direct CLI intent from the homepage.
- `stack_shared` — collaboration and word-of-mouth intent.
- `docs_opened` — evaluation behavior.
- `github_opened` — open-source evaluation intent.
- `press_asset_downloaded` — launch-kit usage.

Break the funnel down by `$referring_domain`, `$utm_source`, `$utm_medium`, and `$utm_campaign`. Do not optimize for page views alone; the primary web conversion is `builder_command_copied`.

## Campaign convention

Use lowercase, stable values:

```text
?utm_source=hacker_news&utm_medium=community&utm_campaign=oss_launch_2026
?utm_source=devhunt&utm_medium=community&utm_campaign=oss_launch_2026
?utm_source=vercel&utm_medium=program&utm_campaign=vercel_oss_2026
?utm_source=product_hunt&utm_medium=launch&utm_campaign=oss_launch_2026
```
