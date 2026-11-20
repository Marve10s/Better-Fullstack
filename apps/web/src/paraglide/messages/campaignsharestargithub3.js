/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharestargithub3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Dar una estrella en GitHub")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在 GitHub 上加星")
	if (locale === "ja") return /** @type {LocalizedString} */ ("GitHub でスターを付ける")
	if (locale === "ko") return /** @type {LocalizedString} */ ("GitHub에서 스타 누르기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在 GitHub 上按星星")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auf GitHub einen Stern geben")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mettre une étoile sur GitHub")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Поставити зірку на GitHub")
	return /** @type {LocalizedString} */ ("Star on GitHub")
});
export { campaignsharestargithub3 as "campaignShareStarGithub" }