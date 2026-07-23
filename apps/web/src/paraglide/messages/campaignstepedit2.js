/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepedit2Inputs */

const en_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Change the source`)
};

/** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */
const es_campaignstepedit2 = en_campaignstepedit2;

/** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */
const zh_campaignstepedit2 = en_campaignstepedit2;

/** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */
const ja_campaignstepedit2 = en_campaignstepedit2;

/** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */
const ko_campaignstepedit2 = en_campaignstepedit2;

/** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */
const zh_hant1_campaignstepedit2 = zh_campaignstepedit2;

/** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */
const de_campaignstepedit2 = en_campaignstepedit2;

/** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */
const fr_campaignstepedit2 = en_campaignstepedit2;

/** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */
const uk_campaignstepedit2 = en_campaignstepedit2;

/**
* | output |
* | --- |
* | "Change the source" |
*
* @param {Campaignstepedit2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepedit2 = /** @type {((inputs?: Campaignstepedit2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepedit2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignstepedit2(inputs)
	if (locale === "es") return es_campaignstepedit2(inputs)
	if (locale === "zh") return zh_campaignstepedit2(inputs)
	if (locale === "ja") return ja_campaignstepedit2(inputs)
	if (locale === "ko") return ko_campaignstepedit2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignstepedit2(inputs)
	if (locale === "de") return de_campaignstepedit2(inputs)
	if (locale === "fr") return fr_campaignstepedit2(inputs)
	return uk_campaignstepedit2(inputs)
});
export { campaignstepedit2 as "campaignStepEdit" }