/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlightdocs3Inputs */



/**
* | output |
* | --- |
* | "Docs and guides match the new site" |
*
* @param {Changelogrelease20261001highlightdocs3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlightdocs3 = /** @type {((inputs?: Changelogrelease20261001highlightdocs3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlightdocs3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La documentación y las guías combinan con el nuevo sitio")
	if (locale === "zh") return /** @type {LocalizedString} */ ("文档和指南采用新网站设计")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドキュメントとガイドが新しいサイトデザインに")
	if (locale === "ko") return /** @type {LocalizedString} */ ("문서와 가이드가 새 사이트 디자인에 맞춰졌습니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("文件與指南採用新網站設計")
	if (locale === "de") return /** @type {LocalizedString} */ ("Docs und Guides passen zur neuen Website")
	if (locale === "fr") return /** @type {LocalizedString} */ ("La documentation et les guides suivent le nouveau site")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Документація й посібники в стилі нового сайту")
	return /** @type {LocalizedString} */ ("Docs and guides match the new site")
});
export { changelogrelease20261001highlightdocs3 as "changelogRelease20261001HighlightDocs" }