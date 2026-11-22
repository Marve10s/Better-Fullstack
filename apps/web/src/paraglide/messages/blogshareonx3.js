/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogshareonx3Inputs */



/**
* | output |
* | --- |
* | "Share on X" |
*
* @param {Blogshareonx3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogshareonx3 = /** @type {((inputs?: Blogshareonx3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogshareonx3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Compartir en X")
	if (locale === "zh") return /** @type {LocalizedString} */ ("分享到 X")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Xでシェア")
	if (locale === "ko") return /** @type {LocalizedString} */ ("X에 공유")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("分享到 X")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auf X teilen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Partager sur X")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Поділитися в X")
	return /** @type {LocalizedString} */ ("Share on X")
});
export { blogshareonx3 as "blogShareOnX" }