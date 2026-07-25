/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharestargithub3Inputs */

const en_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Star on GitHub`)
};

/** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */
const es_campaignsharestargithub3 = en_campaignsharestargithub3;

/** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */
const zh_campaignsharestargithub3 = en_campaignsharestargithub3;

/** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */
const ja_campaignsharestargithub3 = en_campaignsharestargithub3;

/** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */
const ko_campaignsharestargithub3 = en_campaignsharestargithub3;

/** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */
const zh_hant1_campaignsharestargithub3 = zh_campaignsharestargithub3;

/** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */
const de_campaignsharestargithub3 = en_campaignsharestargithub3;

/** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */
const fr_campaignsharestargithub3 = en_campaignsharestargithub3;

/** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */
const uk_campaignsharestargithub3 = en_campaignsharestargithub3;

/**
* | output |
* | --- |
* | "Star on GitHub" |
*
* @param {Campaignsharestargithub3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharestargithub3 = /** @type {((inputs?: Campaignsharestargithub3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharestargithub3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsharestargithub3(inputs)
	if (locale === "es") return es_campaignsharestargithub3(inputs)
	if (locale === "zh") return zh_campaignsharestargithub3(inputs)
	if (locale === "ja") return ja_campaignsharestargithub3(inputs)
	if (locale === "ko") return ko_campaignsharestargithub3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharestargithub3(inputs)
	if (locale === "de") return de_campaignsharestargithub3(inputs)
	if (locale === "fr") return fr_campaignsharestargithub3(inputs)
	return uk_campaignsharestargithub3(inputs)
});
export { campaignsharestargithub3 as "campaignShareStarGithub" }