/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharetitle2Inputs */

const en_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This stack is ready to share`)
};

/** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */
const es_campaignsharetitle2 = en_campaignsharetitle2;

/** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */
const zh_campaignsharetitle2 = en_campaignsharetitle2;

/** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */
const ja_campaignsharetitle2 = en_campaignsharetitle2;

/** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */
const ko_campaignsharetitle2 = en_campaignsharetitle2;

/** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */
const zh_hant1_campaignsharetitle2 = zh_campaignsharetitle2;

/** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */
const de_campaignsharetitle2 = en_campaignsharetitle2;

/** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */
const fr_campaignsharetitle2 = en_campaignsharetitle2;

/** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */
const uk_campaignsharetitle2 = en_campaignsharetitle2;

/**
* | output |
* | --- |
* | "This stack is ready to share" |
*
* @param {Campaignsharetitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharetitle2 = /** @type {((inputs?: Campaignsharetitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharetitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsharetitle2(inputs)
	if (locale === "es") return es_campaignsharetitle2(inputs)
	if (locale === "zh") return zh_campaignsharetitle2(inputs)
	if (locale === "ja") return ja_campaignsharetitle2(inputs)
	if (locale === "ko") return ko_campaignsharetitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharetitle2(inputs)
	if (locale === "de") return de_campaignsharetitle2(inputs)
	if (locale === "fr") return fr_campaignsharetitle2(inputs)
	return uk_campaignsharetitle2(inputs)
});
export { campaignsharetitle2 as "campaignShareTitle" }