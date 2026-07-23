/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignshareruncomplete3Inputs */

const en_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack running`)
};

/** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */
const es_campaignshareruncomplete3 = en_campaignshareruncomplete3;

/** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */
const zh_campaignshareruncomplete3 = en_campaignshareruncomplete3;

/** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */
const ja_campaignshareruncomplete3 = en_campaignshareruncomplete3;

/** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */
const ko_campaignshareruncomplete3 = en_campaignshareruncomplete3;

/** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */
const zh_hant1_campaignshareruncomplete3 = zh_campaignshareruncomplete3;

/** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */
const de_campaignshareruncomplete3 = en_campaignshareruncomplete3;

/** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */
const fr_campaignshareruncomplete3 = en_campaignshareruncomplete3;

/** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */
const uk_campaignshareruncomplete3 = en_campaignshareruncomplete3;

/**
* | output |
* | --- |
* | "Stack running" |
*
* @param {Campaignshareruncomplete3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignshareruncomplete3 = /** @type {((inputs?: Campaignshareruncomplete3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignshareruncomplete3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignshareruncomplete3(inputs)
	if (locale === "es") return es_campaignshareruncomplete3(inputs)
	if (locale === "zh") return zh_campaignshareruncomplete3(inputs)
	if (locale === "ja") return ja_campaignshareruncomplete3(inputs)
	if (locale === "ko") return ko_campaignshareruncomplete3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignshareruncomplete3(inputs)
	if (locale === "de") return de_campaignshareruncomplete3(inputs)
	if (locale === "fr") return fr_campaignshareruncomplete3(inputs)
	return uk_campaignshareruncomplete3(inputs)
});
export { campaignshareruncomplete3 as "campaignShareRunComplete" }