/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharecopylink3Inputs */

const en_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy share text`)
};

/** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */
const es_campaignsharecopylink3 = en_campaignsharecopylink3;

/** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */
const zh_campaignsharecopylink3 = en_campaignsharecopylink3;

/** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */
const ja_campaignsharecopylink3 = en_campaignsharecopylink3;

/** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */
const ko_campaignsharecopylink3 = en_campaignsharecopylink3;

/** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */
const zh_hant1_campaignsharecopylink3 = zh_campaignsharecopylink3;

/** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */
const de_campaignsharecopylink3 = en_campaignsharecopylink3;

/** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */
const fr_campaignsharecopylink3 = en_campaignsharecopylink3;

/** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */
const uk_campaignsharecopylink3 = en_campaignsharecopylink3;

/**
* | output |
* | --- |
* | "Copy share text" |
*
* @param {Campaignsharecopylink3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharecopylink3 = /** @type {((inputs?: Campaignsharecopylink3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharecopylink3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsharecopylink3(inputs)
	if (locale === "es") return es_campaignsharecopylink3(inputs)
	if (locale === "zh") return zh_campaignsharecopylink3(inputs)
	if (locale === "ja") return ja_campaignsharecopylink3(inputs)
	if (locale === "ko") return ko_campaignsharecopylink3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharecopylink3(inputs)
	if (locale === "de") return de_campaignsharecopylink3(inputs)
	if (locale === "fr") return fr_campaignsharecopylink3(inputs)
	return uk_campaignsharecopylink3(inputs)
});
export { campaignsharecopylink3 as "campaignShareCopyLink" }