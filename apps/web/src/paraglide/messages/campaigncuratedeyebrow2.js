/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncuratedeyebrow2Inputs */

const en_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Five places to start`)
};

/** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */
const es_campaigncuratedeyebrow2 = en_campaigncuratedeyebrow2;

/** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */
const zh_campaigncuratedeyebrow2 = en_campaigncuratedeyebrow2;

/** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */
const ja_campaigncuratedeyebrow2 = en_campaigncuratedeyebrow2;

/** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */
const ko_campaigncuratedeyebrow2 = en_campaigncuratedeyebrow2;

/** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */
const zh_hant1_campaigncuratedeyebrow2 = zh_campaigncuratedeyebrow2;

/** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */
const de_campaigncuratedeyebrow2 = en_campaigncuratedeyebrow2;

/** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */
const fr_campaigncuratedeyebrow2 = en_campaigncuratedeyebrow2;

/** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */
const uk_campaigncuratedeyebrow2 = en_campaigncuratedeyebrow2;

/**
* | output |
* | --- |
* | "Five places to start" |
*
* @param {Campaigncuratedeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigncuratedeyebrow2 = /** @type {((inputs?: Campaigncuratedeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigncuratedeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigncuratedeyebrow2(inputs)
	if (locale === "es") return es_campaigncuratedeyebrow2(inputs)
	if (locale === "zh") return zh_campaigncuratedeyebrow2(inputs)
	if (locale === "ja") return ja_campaigncuratedeyebrow2(inputs)
	if (locale === "ko") return ko_campaigncuratedeyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigncuratedeyebrow2(inputs)
	if (locale === "de") return de_campaigncuratedeyebrow2(inputs)
	if (locale === "fr") return fr_campaigncuratedeyebrow2(inputs)
	return uk_campaigncuratedeyebrow2(inputs)
});
export { campaigncuratedeyebrow2 as "campaignCuratedEyebrow" }