/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigntitle1Inputs */

const en_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Don't trust a starter you can't run.`)
};

/** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */
const es_campaigntitle1 = en_campaigntitle1;

/** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */
const zh_campaigntitle1 = en_campaigntitle1;

/** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */
const ja_campaigntitle1 = en_campaigntitle1;

/** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */
const ko_campaigntitle1 = en_campaigntitle1;

/** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */
const zh_hant1_campaigntitle1 = zh_campaigntitle1;

/** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */
const de_campaigntitle1 = en_campaigntitle1;

/** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */
const fr_campaigntitle1 = en_campaigntitle1;

/** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */
const uk_campaigntitle1 = en_campaigntitle1;

/**
* | output |
* | --- |
* | "Don't trust a starter you can't run." |
*
* @param {Campaigntitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigntitle1 = /** @type {((inputs?: Campaigntitle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigntitle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigntitle1(inputs)
	if (locale === "es") return es_campaigntitle1(inputs)
	if (locale === "zh") return zh_campaigntitle1(inputs)
	if (locale === "ja") return ja_campaigntitle1(inputs)
	if (locale === "ko") return ko_campaigntitle1(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigntitle1(inputs)
	if (locale === "de") return de_campaigntitle1(inputs)
	if (locale === "fr") return fr_campaigntitle1(inputs)
	return uk_campaigntitle1(inputs)
});
export { campaigntitle1 as "campaignTitle" }