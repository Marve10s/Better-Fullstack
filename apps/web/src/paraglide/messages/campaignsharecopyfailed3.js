/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharecopyfailed3Inputs */

const en_campaignsharecopyfailed3 = /** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not copy the share message`)
};

/** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */
const es_campaignsharecopyfailed3 = en_campaignsharecopyfailed3;

/** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */
const zh_campaignsharecopyfailed3 = en_campaignsharecopyfailed3;

/** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */
const ja_campaignsharecopyfailed3 = en_campaignsharecopyfailed3;

/** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */
const ko_campaignsharecopyfailed3 = en_campaignsharecopyfailed3;

/** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */
const zh_hant1_campaignsharecopyfailed3 = zh_campaignsharecopyfailed3;

/** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */
const de_campaignsharecopyfailed3 = en_campaignsharecopyfailed3;

/** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */
const fr_campaignsharecopyfailed3 = en_campaignsharecopyfailed3;

/** @type {(inputs: Campaignsharecopyfailed3Inputs) => LocalizedString} */
const uk_campaignsharecopyfailed3 = en_campaignsharecopyfailed3;

/**
* | output |
* | --- |
* | "Could not copy the share message" |
*
* @param {Campaignsharecopyfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharecopyfailed3 = /** @type {((inputs?: Campaignsharecopyfailed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharecopyfailed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsharecopyfailed3(inputs)
	if (locale === "es") return es_campaignsharecopyfailed3(inputs)
	if (locale === "zh") return zh_campaignsharecopyfailed3(inputs)
	if (locale === "ja") return ja_campaignsharecopyfailed3(inputs)
	if (locale === "ko") return ko_campaignsharecopyfailed3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharecopyfailed3(inputs)
	if (locale === "de") return de_campaignsharecopyfailed3(inputs)
	if (locale === "fr") return fr_campaignsharecopyfailed3(inputs)
	return uk_campaignsharecopyfailed3(inputs)
});
export { campaignsharecopyfailed3 as "campaignShareCopyFailed" }