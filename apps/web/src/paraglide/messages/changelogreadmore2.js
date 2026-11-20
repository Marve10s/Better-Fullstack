/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogreadmore2Inputs */



/**
* | output |
* | --- |
* | "Read more" |
*
* @param {Changelogreadmore2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogreadmore2 = /** @type {((inputs?: Changelogreadmore2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogreadmore2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Leer más")
	if (locale === "zh") return /** @type {LocalizedString} */ ("阅读更多")
	if (locale === "ja") return /** @type {LocalizedString} */ ("続きを読む")
	if (locale === "ko") return /** @type {LocalizedString} */ ("더 보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("閱讀更多")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mehr lesen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("En savoir plus")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Докладніше")
	return /** @type {LocalizedString} */ ("Read more")
});
export { changelogreadmore2 as "changelogReadMore" }