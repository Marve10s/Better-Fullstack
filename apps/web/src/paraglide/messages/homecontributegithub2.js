/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributegithub2Inputs */

const en_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Contribute on GitHub`)
};

const es_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Contribuir en GitHub`)
};

const zh_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 贡献`)
};

const ja_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub に貢献する`)
};

const ko_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub에 기여`)
};

const zh_hant1_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 貢獻`)
};

const de_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tragen Sie auf GitHub bei`)
};

const fr_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Contribuer sur GitHub`)
};

/**
* | output |
* | --- |
* | "Contribute on GitHub" |
*
* @param {Homecontributegithub2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homecontributegithub2 = /** @type {((inputs?: Homecontributegithub2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributegithub2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributegithub2(inputs)
	if (locale === "es") return es_homecontributegithub2(inputs)
	if (locale === "zh") return zh_homecontributegithub2(inputs)
	if (locale === "ja") return ja_homecontributegithub2(inputs)
	if (locale === "ko") return ko_homecontributegithub2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecontributegithub2(inputs)
	if (locale === "de") return de_homecontributegithub2(inputs)
	return fr_homecontributegithub2(inputs)
});
export { homecontributegithub2 as "homeContributeGithub" }