/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogcopylink2Inputs */



/**
* | output |
* | --- |
* | "Copy link" |
*
* @param {Blogcopylink2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogcopylink2 = /** @type {((inputs?: Blogcopylink2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogcopylink2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar enlace")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制链接")
	if (locale === "ja") return /** @type {LocalizedString} */ ("リンクをコピー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("링크 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製連結")
	if (locale === "de") return /** @type {LocalizedString} */ ("Link kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier le lien")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Копіювати посилання")
	return /** @type {LocalizedString} */ ("Copy link")
});
export { blogcopylink2 as "blogCopyLink" }