/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharestargithub3Inputs */

const en_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Star on GitHub`)
};

const es_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dar una estrella en GitHub`)
};

const zh_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 上加星`)
};

const ja_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub でスターを付ける`)
};

const ko_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub에서 스타 누르기`)
};

const zh_hant1_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 上按星星`)
};

const de_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auf GitHub einen Stern geben`)
};

const fr_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mettre une étoile sur GitHub`)
};

const uk_campaignsharestargithub3 = /** @type {(inputs: Campaignsharestargithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Поставити зірку на GitHub`)
};

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