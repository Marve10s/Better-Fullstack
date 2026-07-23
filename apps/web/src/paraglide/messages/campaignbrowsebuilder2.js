/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignbrowsebuilder2Inputs */

const en_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browse every stack`)
};

/** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */
const es_campaignbrowsebuilder2 = en_campaignbrowsebuilder2;

/** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */
const zh_campaignbrowsebuilder2 = en_campaignbrowsebuilder2;

/** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */
const ja_campaignbrowsebuilder2 = en_campaignbrowsebuilder2;

/** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */
const ko_campaignbrowsebuilder2 = en_campaignbrowsebuilder2;

/** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */
const zh_hant1_campaignbrowsebuilder2 = zh_campaignbrowsebuilder2;

/** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */
const de_campaignbrowsebuilder2 = en_campaignbrowsebuilder2;

/** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */
const fr_campaignbrowsebuilder2 = en_campaignbrowsebuilder2;

/** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */
const uk_campaignbrowsebuilder2 = en_campaignbrowsebuilder2;

/**
* | output |
* | --- |
* | "Browse every stack" |
*
* @param {Campaignbrowsebuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignbrowsebuilder2 = /** @type {((inputs?: Campaignbrowsebuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignbrowsebuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignbrowsebuilder2(inputs)
	if (locale === "es") return es_campaignbrowsebuilder2(inputs)
	if (locale === "zh") return zh_campaignbrowsebuilder2(inputs)
	if (locale === "ja") return ja_campaignbrowsebuilder2(inputs)
	if (locale === "ko") return ko_campaignbrowsebuilder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignbrowsebuilder2(inputs)
	if (locale === "de") return de_campaignbrowsebuilder2(inputs)
	if (locale === "fr") return fr_campaignbrowsebuilder2(inputs)
	return uk_campaignbrowsebuilder2(inputs)
});
export { campaignbrowsebuilder2 as "campaignBrowseBuilder" }