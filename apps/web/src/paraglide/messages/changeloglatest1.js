/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatest1Inputs */



/**
* | output |
* | --- |
* | "Latest" |
*
* @param {Changeloglatest1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changeloglatest1 = /** @type {((inputs?: Changeloglatest1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatest1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Última")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neueste")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dernier")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останній")
	return /** @type {LocalizedString} */ ("Latest")
});
export { changeloglatest1 as "changelogLatest" }