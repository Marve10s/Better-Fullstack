/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharepostonx4Inputs */

const en_campaignsharepostonx4 = /** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Post on X`)
};

/** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */
const es_campaignsharepostonx4 = en_campaignsharepostonx4;

/** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */
const zh_campaignsharepostonx4 = en_campaignsharepostonx4;

/** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */
const ja_campaignsharepostonx4 = en_campaignsharepostonx4;

/** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */
const ko_campaignsharepostonx4 = en_campaignsharepostonx4;

/** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */
const zh_hant1_campaignsharepostonx4 = zh_campaignsharepostonx4;

/** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */
const de_campaignsharepostonx4 = en_campaignsharepostonx4;

/** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */
const fr_campaignsharepostonx4 = en_campaignsharepostonx4;

/** @type {(inputs: Campaignsharepostonx4Inputs) => LocalizedString} */
const uk_campaignsharepostonx4 = en_campaignsharepostonx4;

/**
* | output |
* | --- |
* | "Post on X" |
*
* @param {Campaignsharepostonx4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharepostonx4 = /** @type {((inputs?: Campaignsharepostonx4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharepostonx4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsharepostonx4(inputs)
	if (locale === "es") return es_campaignsharepostonx4(inputs)
	if (locale === "zh") return zh_campaignsharepostonx4(inputs)
	if (locale === "ja") return ja_campaignsharepostonx4(inputs)
	if (locale === "ko") return ko_campaignsharepostonx4(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharepostonx4(inputs)
	if (locale === "de") return de_campaignsharepostonx4(inputs)
	if (locale === "fr") return fr_campaignsharepostonx4(inputs)
	return uk_campaignsharepostonx4(inputs)
});
export { campaignsharepostonx4 as "campaignSharePostOnX" }