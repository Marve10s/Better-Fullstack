/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandom1Inputs */



/**
* | output |
* | --- |
* | "Random" |
*
* @param {Builderrandom1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrandom1 = /** @type {((inputs?: Builderrandom1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandom1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aleatorio")
	if (locale === "zh") return /** @type {LocalizedString} */ ("随机")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランダム")
	if (locale === "ko") return /** @type {LocalizedString} */ ("무작위")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("隨機")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zufällig")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aléatoire")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Випадковий")
	return /** @type {LocalizedString} */ ("Random")
});
export { builderrandom1 as "builderRandom" }