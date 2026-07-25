/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharedescription2Inputs */

const en_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send the exact configuration—not a generic homepage—so someone else can inspect, run and download it.`)
};

/** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */
const es_campaignsharedescription2 = en_campaignsharedescription2;

/** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */
const zh_campaignsharedescription2 = en_campaignsharedescription2;

/** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */
const ja_campaignsharedescription2 = en_campaignsharedescription2;

/** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */
const ko_campaignsharedescription2 = en_campaignsharedescription2;

/** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */
const zh_hant1_campaignsharedescription2 = zh_campaignsharedescription2;

/** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */
const de_campaignsharedescription2 = en_campaignsharedescription2;

/** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */
const fr_campaignsharedescription2 = en_campaignsharedescription2;

/** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */
const uk_campaignsharedescription2 = en_campaignsharedescription2;

/**
* | output |
* | --- |
* | "Send the exact configuration—not a generic homepage—so someone else can inspect, run and download it." |
*
* @param {Campaignsharedescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharedescription2 = /** @type {((inputs?: Campaignsharedescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharedescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsharedescription2(inputs)
	if (locale === "es") return es_campaignsharedescription2(inputs)
	if (locale === "zh") return zh_campaignsharedescription2(inputs)
	if (locale === "ja") return ja_campaignsharedescription2(inputs)
	if (locale === "ko") return ko_campaignsharedescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharedescription2(inputs)
	if (locale === "de") return de_campaignsharedescription2(inputs)
	if (locale === "fr") return fr_campaignsharedescription2(inputs)
	return uk_campaignsharedescription2(inputs)
});
export { campaignsharedescription2 as "campaignShareDescription" }