/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorstitlea3Inputs */

const en_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Built in public.`)
};

const es_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construido en público.`)
};

const zh_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公开构建。`)
};

const ja_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公共の場で建てられました。`)
};

const ko_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공개적으로 구축되었습니다.`)
};

const zh_hant1_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公開建構。`)
};

const de_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffentlich gebaut.`)
};

const fr_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construit en public.`)
};

/**
* | output |
* | --- |
* | "Built in public." |
*
* @param {Homecontributorstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homecontributorstitlea3 = /** @type {((inputs?: Homecontributorstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorstitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributorstitlea3(inputs)
	if (locale === "es") return es_homecontributorstitlea3(inputs)
	if (locale === "zh") return zh_homecontributorstitlea3(inputs)
	if (locale === "ja") return ja_homecontributorstitlea3(inputs)
	if (locale === "ko") return ko_homecontributorstitlea3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecontributorstitlea3(inputs)
	if (locale === "de") return de_homecontributorstitlea3(inputs)
	return fr_homecontributorstitlea3(inputs)
});
export { homecontributorstitlea3 as "homeContributorsTitleA" }