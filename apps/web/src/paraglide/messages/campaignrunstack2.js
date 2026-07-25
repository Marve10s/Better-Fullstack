/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignrunstack2Inputs */

const en_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run a stack`)
};

/** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */
const es_campaignrunstack2 = en_campaignrunstack2;

/** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */
const zh_campaignrunstack2 = en_campaignrunstack2;

/** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */
const ja_campaignrunstack2 = en_campaignrunstack2;

/** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */
const ko_campaignrunstack2 = en_campaignrunstack2;

/** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */
const zh_hant1_campaignrunstack2 = zh_campaignrunstack2;

/** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */
const de_campaignrunstack2 = en_campaignrunstack2;

/** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */
const fr_campaignrunstack2 = en_campaignrunstack2;

/** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */
const uk_campaignrunstack2 = en_campaignrunstack2;

/**
* | output |
* | --- |
* | "Run a stack" |
*
* @param {Campaignrunstack2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignrunstack2 = /** @type {((inputs?: Campaignrunstack2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignrunstack2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignrunstack2(inputs)
	if (locale === "es") return es_campaignrunstack2(inputs)
	if (locale === "zh") return zh_campaignrunstack2(inputs)
	if (locale === "ja") return ja_campaignrunstack2(inputs)
	if (locale === "ko") return ko_campaignrunstack2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignrunstack2(inputs)
	if (locale === "de") return de_campaignrunstack2(inputs)
	if (locale === "fr") return fr_campaignrunstack2(inputs)
	return uk_campaignrunstack2(inputs)
});
export { campaignrunstack2 as "campaignRunStack" }