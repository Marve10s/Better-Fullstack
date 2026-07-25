/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignnosignup2Inputs */

const en_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No signup`)
};

/** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */
const es_campaignnosignup2 = en_campaignnosignup2;

/** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */
const zh_campaignnosignup2 = en_campaignnosignup2;

/** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */
const ja_campaignnosignup2 = en_campaignnosignup2;

/** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */
const ko_campaignnosignup2 = en_campaignnosignup2;

/** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */
const zh_hant1_campaignnosignup2 = zh_campaignnosignup2;

/** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */
const de_campaignnosignup2 = en_campaignnosignup2;

/** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */
const fr_campaignnosignup2 = en_campaignnosignup2;

/** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */
const uk_campaignnosignup2 = en_campaignnosignup2;

/**
* | output |
* | --- |
* | "No signup" |
*
* @param {Campaignnosignup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignnosignup2 = /** @type {((inputs?: Campaignnosignup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignnosignup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignnosignup2(inputs)
	if (locale === "es") return es_campaignnosignup2(inputs)
	if (locale === "zh") return zh_campaignnosignup2(inputs)
	if (locale === "ja") return ja_campaignnosignup2(inputs)
	if (locale === "ko") return ko_campaignnosignup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignnosignup2(inputs)
	if (locale === "de") return de_campaignnosignup2(inputs)
	if (locale === "fr") return fr_campaignnosignup2(inputs)
	return uk_campaignnosignup2(inputs)
});
export { campaignnosignup2 as "campaignNoSignup" }