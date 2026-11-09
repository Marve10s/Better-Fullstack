/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributegithub2Inputs */



/**
* | output |
* | --- |
* | "Contribute on GitHub" |
*
* @param {Homecontributegithub2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecontributegithub2 = /** @type {((inputs?: Homecontributegithub2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributegithub2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Contribuir en GitHub")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在 GitHub 贡献")
	if (locale === "ja") return /** @type {LocalizedString} */ ("GitHub に貢献する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("GitHub에 기여")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在 GitHub 貢獻")
	if (locale === "de") return /** @type {LocalizedString} */ ("Tragen Sie auf GitHub bei")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Contribuer sur GitHub")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Зробити внесок на GitHub")
	return /** @type {LocalizedString} */ ("Contribute on GitHub")
});
export { homecontributegithub2 as "homeContributeGithub" }