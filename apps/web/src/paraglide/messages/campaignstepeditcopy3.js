/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepeditcopy3Inputs */

const en_campaignstepeditcopy3 = /** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open project files, edit the application and rerun it without leaving the builder.`)
};

/** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */
const es_campaignstepeditcopy3 = en_campaignstepeditcopy3;

/** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */
const zh_campaignstepeditcopy3 = en_campaignstepeditcopy3;

/** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */
const ja_campaignstepeditcopy3 = en_campaignstepeditcopy3;

/** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */
const ko_campaignstepeditcopy3 = en_campaignstepeditcopy3;

/** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */
const zh_hant1_campaignstepeditcopy3 = zh_campaignstepeditcopy3;

/** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */
const de_campaignstepeditcopy3 = en_campaignstepeditcopy3;

/** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */
const fr_campaignstepeditcopy3 = en_campaignstepeditcopy3;

/** @type {(inputs: Campaignstepeditcopy3Inputs) => LocalizedString} */
const uk_campaignstepeditcopy3 = en_campaignstepeditcopy3;

/**
* | output |
* | --- |
* | "Open project files, edit the application and rerun it without leaving the builder." |
*
* @param {Campaignstepeditcopy3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepeditcopy3 = /** @type {((inputs?: Campaignstepeditcopy3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepeditcopy3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignstepeditcopy3(inputs)
	if (locale === "es") return es_campaignstepeditcopy3(inputs)
	if (locale === "zh") return zh_campaignstepeditcopy3(inputs)
	if (locale === "ja") return ja_campaignstepeditcopy3(inputs)
	if (locale === "ko") return ko_campaignstepeditcopy3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignstepeditcopy3(inputs)
	if (locale === "de") return de_campaignstepeditcopy3(inputs)
	if (locale === "fr") return fr_campaignstepeditcopy3(inputs)
	return uk_campaignstepeditcopy3(inputs)
});
export { campaignstepeditcopy3 as "campaignStepEditCopy" }