/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionscopymarkdown3Inputs */



/**
* | output |
* | --- |
* | "Copy MD" |
*
* @param {Docsactionscopymarkdown3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsactionscopymarkdown3 = /** @type {((inputs?: Docsactionscopymarkdown3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsactionscopymarkdown3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar MD")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制 MD")
	if (locale === "ja") return /** @type {LocalizedString} */ ("MD をコピー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("MD 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製 MD")
	if (locale === "de") return /** @type {LocalizedString} */ ("MD kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier le MD")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Копіювати MD")
	return /** @type {LocalizedString} */ ("Copy MD")
});
export { docsactionscopymarkdown3 as "docsActionsCopyMarkdown" }