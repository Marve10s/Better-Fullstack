/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionsviewmarkdown3Inputs */



/**
* | output |
* | --- |
* | "View Markdown" |
*
* @param {Docsactionsviewmarkdown3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsactionsviewmarkdown3 = /** @type {((inputs?: Docsactionsviewmarkdown3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsactionsviewmarkdown3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ver Markdown")
	if (locale === "zh") return /** @type {LocalizedString} */ ("查看 Markdown")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Markdown を表示")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Markdown 보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("檢視 Markdown")
	if (locale === "de") return /** @type {LocalizedString} */ ("Markdown anzeigen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Voir le Markdown")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Переглянути Markdown")
	return /** @type {LocalizedString} */ ("View Markdown")
});
export { docsactionsviewmarkdown3 as "docsActionsViewMarkdown" }