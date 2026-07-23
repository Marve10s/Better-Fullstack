/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignctaeyebrow2Inputs */

const en_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your next project is one click away`)
};

/** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */
const es_campaignctaeyebrow2 = en_campaignctaeyebrow2;

/** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */
const zh_campaignctaeyebrow2 = en_campaignctaeyebrow2;

/** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */
const ja_campaignctaeyebrow2 = en_campaignctaeyebrow2;

/** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */
const ko_campaignctaeyebrow2 = en_campaignctaeyebrow2;

/** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */
const zh_hant1_campaignctaeyebrow2 = zh_campaignctaeyebrow2;

/** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */
const de_campaignctaeyebrow2 = en_campaignctaeyebrow2;

/** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */
const fr_campaignctaeyebrow2 = en_campaignctaeyebrow2;

/** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */
const uk_campaignctaeyebrow2 = en_campaignctaeyebrow2;

/**
* | output |
* | --- |
* | "Your next project is one click away" |
*
* @param {Campaignctaeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignctaeyebrow2 = /** @type {((inputs?: Campaignctaeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignctaeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignctaeyebrow2(inputs)
	if (locale === "es") return es_campaignctaeyebrow2(inputs)
	if (locale === "zh") return zh_campaignctaeyebrow2(inputs)
	if (locale === "ja") return ja_campaignctaeyebrow2(inputs)
	if (locale === "ko") return ko_campaignctaeyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignctaeyebrow2(inputs)
	if (locale === "de") return de_campaignctaeyebrow2(inputs)
	if (locale === "fr") return fr_campaignctaeyebrow2(inputs)
	return uk_campaignctaeyebrow2(inputs)
});
export { campaignctaeyebrow2 as "campaignCtaEyebrow" }