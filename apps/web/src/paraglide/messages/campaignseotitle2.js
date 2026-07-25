/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignseotitle2Inputs */

const en_campaignseotitle2 = /** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run Before You Clone | Better Fullstack`)
};

/** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */
const es_campaignseotitle2 = en_campaignseotitle2;

/** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */
const zh_campaignseotitle2 = en_campaignseotitle2;

/** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */
const ja_campaignseotitle2 = en_campaignseotitle2;

/** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */
const ko_campaignseotitle2 = en_campaignseotitle2;

/** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */
const zh_hant1_campaignseotitle2 = zh_campaignseotitle2;

/** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */
const de_campaignseotitle2 = en_campaignseotitle2;

/** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */
const fr_campaignseotitle2 = en_campaignseotitle2;

/** @type {(inputs: Campaignseotitle2Inputs) => LocalizedString} */
const uk_campaignseotitle2 = en_campaignseotitle2;

/**
* | output |
* | --- |
* | "Run Before You Clone \| Better Fullstack" |
*
* @param {Campaignseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignseotitle2 = /** @type {((inputs?: Campaignseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignseotitle2(inputs)
	if (locale === "es") return es_campaignseotitle2(inputs)
	if (locale === "zh") return zh_campaignseotitle2(inputs)
	if (locale === "ja") return ja_campaignseotitle2(inputs)
	if (locale === "ko") return ko_campaignseotitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignseotitle2(inputs)
	if (locale === "de") return de_campaignseotitle2(inputs)
	if (locale === "fr") return fr_campaignseotitle2(inputs)
	return uk_campaignseotitle2(inputs)
});
export { campaignseotitle2 as "campaignSeoTitle" }