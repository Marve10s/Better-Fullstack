# Documentation follow-ups

Only unfinished outcomes remain here. Canonical public content lives in `apps/web/content/docs`.
Audited 2026-09-25 against the current content structure and content-contract tests.

## Compatibility references

The old per-ecosystem option pages have been replaced by the ecosystem overview, choosing-a-stack
guide, and schema-derived CLI tables. Do not recreate retired pages to satisfy the old checklist.

- [ ] Audit compatibility links and examples across the current ecosystem overview, native/composed
      pages, choosing-a-stack guide, and CLI create reference. Close missing navigation or example
      coverage using the existing pages and executable compatibility rules.

## Localization

- [ ] Review localized bodies against current canonical English content before removing
      `translationStatus: pending` for the 20 docs pages.
- [ ] Keep the content contract's pending list aligned with reviewed pages. The broader list also
      includes guides and blog posts; those remain pending until their own review is complete.

`apps/web/test/docs-content-contract.test.ts` currently tracks 36 pending pages across all three
collections and tests fallback behavior. Passing fallback tests does not complete translation review.
Follow the [public-content guideline](../../guidelines/public-docs-i18n-and-seo.md).

## Completion

Close this project when current-page compatibility coverage is verified and docs translations are
reviewed with passing content contracts. Ongoing copy maintenance does not keep this project open.
