/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharestack2Inputs */

const en_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Share this stack`)
};

/** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */
const es_campaignsharestack2 = en_campaignsharestack2;

/** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */
const zh_campaignsharestack2 = en_campaignsharestack2;

/** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */
const ja_campaignsharestack2 = en_campaignsharestack2;

/** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */
const ko_campaignsharestack2 = en_campaignsharestack2;

/** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */
const zh_hant1_campaignsharestack2 = zh_campaignsharestack2;

/** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */
const de_campaignsharestack2 = en_campaignsharestack2;

/** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */
const fr_campaignsharestack2 = en_campaignsharestack2;

/** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */
const uk_campaignsharestack2 = en_campaignsharestack2;

/**
* | output |
* | --- |
* | "Share this stack" |
*
* @param {Campaignsharestack2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharestack2 = /** @type {((inputs?: Campaignsharestack2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharestack2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsharestack2(inputs)
	if (locale === "es") return es_campaignsharestack2(inputs)
	if (locale === "zh") return zh_campaignsharestack2(inputs)
	if (locale === "ja") return ja_campaignsharestack2(inputs)
	if (locale === "ko") return ko_campaignsharestack2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharestack2(inputs)
	if (locale === "de") return de_campaignsharestack2(inputs)
	if (locale === "fr") return fr_campaignsharestack2(inputs)
	return uk_campaignsharestack2(inputs)
});
export { campaignsharestack2 as "campaignShareStack" }