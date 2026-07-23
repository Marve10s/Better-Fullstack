/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncuratedtitle2Inputs */

const en_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick one. Break it. Keep it.`)
};

/** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */
const es_campaigncuratedtitle2 = en_campaigncuratedtitle2;

/** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */
const zh_campaigncuratedtitle2 = en_campaigncuratedtitle2;

/** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */
const ja_campaigncuratedtitle2 = en_campaigncuratedtitle2;

/** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */
const ko_campaigncuratedtitle2 = en_campaigncuratedtitle2;

/** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */
const zh_hant1_campaigncuratedtitle2 = zh_campaigncuratedtitle2;

/** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */
const de_campaigncuratedtitle2 = en_campaigncuratedtitle2;

/** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */
const fr_campaigncuratedtitle2 = en_campaigncuratedtitle2;

/** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */
const uk_campaigncuratedtitle2 = en_campaigncuratedtitle2;

/**
* | output |
* | --- |
* | "Pick one. Break it. Keep it." |
*
* @param {Campaigncuratedtitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigncuratedtitle2 = /** @type {((inputs?: Campaigncuratedtitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigncuratedtitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigncuratedtitle2(inputs)
	if (locale === "es") return es_campaigncuratedtitle2(inputs)
	if (locale === "zh") return zh_campaigncuratedtitle2(inputs)
	if (locale === "ja") return ja_campaigncuratedtitle2(inputs)
	if (locale === "ko") return ko_campaigncuratedtitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigncuratedtitle2(inputs)
	if (locale === "de") return de_campaigncuratedtitle2(inputs)
	if (locale === "fr") return fr_campaigncuratedtitle2(inputs)
	return uk_campaigncuratedtitle2(inputs)
});
export { campaigncuratedtitle2 as "campaignCuratedTitle" }