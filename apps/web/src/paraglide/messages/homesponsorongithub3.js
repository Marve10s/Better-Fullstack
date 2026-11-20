/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homesponsorongithub3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Patrocina en GitHub")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在 GitHub 上赞助")
	if (locale === "ja") return /** @type {LocalizedString} */ ("GitHubでスポンサーになる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("GitHub에서 후원하기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在 GitHub 上贊助")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auf GitHub sponsern")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sponsoriser sur GitHub")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спонсорувати на GitHub")
	return /** @type {LocalizedString} */ ("Sponsor on GitHub")
});
export { homesponsorongithub3 as "homeSponsorOnGithub" }