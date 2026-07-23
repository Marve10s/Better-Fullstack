/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignseodescription2Inputs */

const en_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inspect, edit and run a real generated TypeScript project in your browser, then download the ZIP. No signup and no code upload.`)
};

/** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */
const es_campaignseodescription2 = en_campaignseodescription2;

/** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */
const zh_campaignseodescription2 = en_campaignseodescription2;

/** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */
const ja_campaignseodescription2 = en_campaignseodescription2;

/** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */
const ko_campaignseodescription2 = en_campaignseodescription2;

/** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */
const zh_hant1_campaignseodescription2 = zh_campaignseodescription2;

/** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */
const de_campaignseodescription2 = en_campaignseodescription2;

/** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */
const fr_campaignseodescription2 = en_campaignseodescription2;

/** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */
const uk_campaignseodescription2 = en_campaignseodescription2;

/**
* | output |
* | --- |
* | "Inspect, edit and run a real generated TypeScript project in your browser, then download the ZIP. No signup and no code upload." |
*
* @param {Campaignseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignseodescription2 = /** @type {((inputs?: Campaignseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignseodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignseodescription2(inputs)
	if (locale === "es") return es_campaignseodescription2(inputs)
	if (locale === "zh") return zh_campaignseodescription2(inputs)
	if (locale === "ja") return ja_campaignseodescription2(inputs)
	if (locale === "ko") return ko_campaignseodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignseodescription2(inputs)
	if (locale === "de") return de_campaignseodescription2(inputs)
	if (locale === "fr") return fr_campaignseodescription2(inputs)
	return uk_campaignseodescription2(inputs)
});
export { campaignseodescription2 as "campaignSeoDescription" }