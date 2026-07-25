/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepdownloadcopy3Inputs */

const en_campaignstepdownloadcopy3 = /** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Download a normal ZIP whenever you are ready. Better Fullstack is not your storage provider.`)
};

/** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */
const es_campaignstepdownloadcopy3 = en_campaignstepdownloadcopy3;

/** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */
const zh_campaignstepdownloadcopy3 = en_campaignstepdownloadcopy3;

/** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */
const ja_campaignstepdownloadcopy3 = en_campaignstepdownloadcopy3;

/** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */
const ko_campaignstepdownloadcopy3 = en_campaignstepdownloadcopy3;

/** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */
const zh_hant1_campaignstepdownloadcopy3 = zh_campaignstepdownloadcopy3;

/** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */
const de_campaignstepdownloadcopy3 = en_campaignstepdownloadcopy3;

/** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */
const fr_campaignstepdownloadcopy3 = en_campaignstepdownloadcopy3;

/** @type {(inputs: Campaignstepdownloadcopy3Inputs) => LocalizedString} */
const uk_campaignstepdownloadcopy3 = en_campaignstepdownloadcopy3;

/**
* | output |
* | --- |
* | "Download a normal ZIP whenever you are ready. Better Fullstack is not your storage provider." |
*
* @param {Campaignstepdownloadcopy3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepdownloadcopy3 = /** @type {((inputs?: Campaignstepdownloadcopy3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepdownloadcopy3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignstepdownloadcopy3(inputs)
	if (locale === "es") return es_campaignstepdownloadcopy3(inputs)
	if (locale === "zh") return zh_campaignstepdownloadcopy3(inputs)
	if (locale === "ja") return ja_campaignstepdownloadcopy3(inputs)
	if (locale === "ko") return ko_campaignstepdownloadcopy3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignstepdownloadcopy3(inputs)
	if (locale === "de") return de_campaignstepdownloadcopy3(inputs)
	if (locale === "fr") return fr_campaignstepdownloadcopy3(inputs)
	return uk_campaignstepdownloadcopy3(inputs)
});
export { campaignstepdownloadcopy3 as "campaignStepDownloadCopy" }