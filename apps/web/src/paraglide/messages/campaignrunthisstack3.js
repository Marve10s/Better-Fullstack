/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignrunthisstack3Inputs */

const en_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run this stack`)
};

/** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */
const es_campaignrunthisstack3 = en_campaignrunthisstack3;

/** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */
const zh_campaignrunthisstack3 = en_campaignrunthisstack3;

/** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */
const ja_campaignrunthisstack3 = en_campaignrunthisstack3;

/** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */
const ko_campaignrunthisstack3 = en_campaignrunthisstack3;

/** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */
const zh_hant1_campaignrunthisstack3 = zh_campaignrunthisstack3;

/** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */
const de_campaignrunthisstack3 = en_campaignrunthisstack3;

/** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */
const fr_campaignrunthisstack3 = en_campaignrunthisstack3;

/** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */
const uk_campaignrunthisstack3 = en_campaignrunthisstack3;

/**
* | output |
* | --- |
* | "Run this stack" |
*
* @param {Campaignrunthisstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignrunthisstack3 = /** @type {((inputs?: Campaignrunthisstack3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignrunthisstack3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignrunthisstack3(inputs)
	if (locale === "es") return es_campaignrunthisstack3(inputs)
	if (locale === "zh") return zh_campaignrunthisstack3(inputs)
	if (locale === "ja") return ja_campaignrunthisstack3(inputs)
	if (locale === "ko") return ko_campaignrunthisstack3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignrunthisstack3(inputs)
	if (locale === "de") return de_campaignrunthisstack3(inputs)
	if (locale === "fr") return fr_campaignrunthisstack3(inputs)
	return uk_campaignrunthisstack3(inputs)
});
export { campaignrunthisstack3 as "campaignRunThisStack" }