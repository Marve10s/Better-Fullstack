/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepdownload2Inputs */

const en_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Take the code`)
};

/** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */
const es_campaignstepdownload2 = en_campaignstepdownload2;

/** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */
const zh_campaignstepdownload2 = en_campaignstepdownload2;

/** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */
const ja_campaignstepdownload2 = en_campaignstepdownload2;

/** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */
const ko_campaignstepdownload2 = en_campaignstepdownload2;

/** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */
const zh_hant1_campaignstepdownload2 = zh_campaignstepdownload2;

/** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */
const de_campaignstepdownload2 = en_campaignstepdownload2;

/** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */
const fr_campaignstepdownload2 = en_campaignstepdownload2;

/** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */
const uk_campaignstepdownload2 = en_campaignstepdownload2;

/**
* | output |
* | --- |
* | "Take the code" |
*
* @param {Campaignstepdownload2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepdownload2 = /** @type {((inputs?: Campaignstepdownload2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepdownload2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignstepdownload2(inputs)
	if (locale === "es") return es_campaignstepdownload2(inputs)
	if (locale === "zh") return zh_campaignstepdownload2(inputs)
	if (locale === "ja") return ja_campaignstepdownload2(inputs)
	if (locale === "ko") return ko_campaignstepdownload2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignstepdownload2(inputs)
	if (locale === "de") return de_campaignstepdownload2(inputs)
	if (locale === "fr") return fr_campaignstepdownload2(inputs)
	return uk_campaignstepdownload2(inputs)
});
export { campaignstepdownload2 as "campaignStepDownload" }