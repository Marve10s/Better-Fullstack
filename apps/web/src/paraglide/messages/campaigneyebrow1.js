/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigneyebrow1Inputs */

const en_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run before you clone`)
};

/** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */
const es_campaigneyebrow1 = en_campaigneyebrow1;

/** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */
const zh_campaigneyebrow1 = en_campaigneyebrow1;

/** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */
const ja_campaigneyebrow1 = en_campaigneyebrow1;

/** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */
const ko_campaigneyebrow1 = en_campaigneyebrow1;

/** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */
const zh_hant1_campaigneyebrow1 = zh_campaigneyebrow1;

/** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */
const de_campaigneyebrow1 = en_campaigneyebrow1;

/** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */
const fr_campaigneyebrow1 = en_campaigneyebrow1;

/** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */
const uk_campaigneyebrow1 = en_campaigneyebrow1;

/**
* | output |
* | --- |
* | "Run before you clone" |
*
* @param {Campaigneyebrow1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigneyebrow1 = /** @type {((inputs?: Campaigneyebrow1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigneyebrow1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigneyebrow1(inputs)
	if (locale === "es") return es_campaigneyebrow1(inputs)
	if (locale === "zh") return zh_campaigneyebrow1(inputs)
	if (locale === "ja") return ja_campaigneyebrow1(inputs)
	if (locale === "ko") return ko_campaigneyebrow1(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigneyebrow1(inputs)
	if (locale === "de") return de_campaigneyebrow1(inputs)
	if (locale === "fr") return fr_campaigneyebrow1(inputs)
	return uk_campaigneyebrow1(inputs)
});
export { campaigneyebrow1 as "campaignEyebrow" }