/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homesponsorongithub3Inputs */

const en_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sponsor on GitHub`)
};

const es_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Patrocina en GitHub`)
};

const zh_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 上赞助`)
};

const ja_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHubでスポンサーになる`)
};

const ko_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub에서 후원하기`)
};

const zh_hant1_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 上贊助`)
};

const de_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auf GitHub sponsern`)
};

const fr_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sponsoriser sur GitHub`)
};

const uk_homesponsorongithub3 = /** @type {(inputs: Homesponsorongithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спонсорувати на GitHub`)
};

/**
* | output |
* | --- |
* | "Sponsor on GitHub" |
*
* @param {Homesponsorongithub3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homesponsorongithub3 = /** @type {((inputs?: Homesponsorongithub3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homesponsorongithub3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homesponsorongithub3(inputs)
	if (locale === "zh") return zh_homesponsorongithub3(inputs)
	if (locale === "ja") return ja_homesponsorongithub3(inputs)
	if (locale === "ko") return ko_homesponsorongithub3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homesponsorongithub3(inputs)
	if (locale === "de") return de_homesponsorongithub3(inputs)
	if (locale === "fr") return fr_homesponsorongithub3(inputs)
	if (locale === "uk") return uk_homesponsorongithub3(inputs)
	return en_homesponsorongithub3(inputs)
});
export { homesponsorongithub3 as "homeSponsorOnGithub" }