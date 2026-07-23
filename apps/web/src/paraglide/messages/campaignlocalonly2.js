/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignlocalonly2Inputs */

const en_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs locally in your browser`)
};

/** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */
const es_campaignlocalonly2 = en_campaignlocalonly2;

/** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */
const zh_campaignlocalonly2 = en_campaignlocalonly2;

/** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */
const ja_campaignlocalonly2 = en_campaignlocalonly2;

/** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */
const ko_campaignlocalonly2 = en_campaignlocalonly2;

/** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */
const zh_hant1_campaignlocalonly2 = zh_campaignlocalonly2;

/** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */
const de_campaignlocalonly2 = en_campaignlocalonly2;

/** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */
const fr_campaignlocalonly2 = en_campaignlocalonly2;

/** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */
const uk_campaignlocalonly2 = en_campaignlocalonly2;

/**
* | output |
* | --- |
* | "Runs locally in your browser" |
*
* @param {Campaignlocalonly2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignlocalonly2 = /** @type {((inputs?: Campaignlocalonly2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignlocalonly2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignlocalonly2(inputs)
	if (locale === "es") return es_campaignlocalonly2(inputs)
	if (locale === "zh") return zh_campaignlocalonly2(inputs)
	if (locale === "ja") return ja_campaignlocalonly2(inputs)
	if (locale === "ko") return ko_campaignlocalonly2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignlocalonly2(inputs)
	if (locale === "de") return de_campaignlocalonly2(inputs)
	if (locale === "fr") return fr_campaignlocalonly2(inputs)
	return uk_campaignlocalonly2(inputs)
});
export { campaignlocalonly2 as "campaignLocalOnly" }