/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaimoreworking3Inputs */

const en_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`more projects that actually run`)
};

const es_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`más proyectos que de verdad funcionan`)
};

const zh_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更多真正能跑起来的项目`)
};

const ja_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実際に動くプロジェクトが増える`)
};

const ko_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실제로 돌아가는 프로젝트가 더 많이`)
};

const zh_hant1_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更多真正能跑起來的專案`)
};

const de_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mehr Projekte, die wirklich laufen`)
};

const fr_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`plus de projets qui fonctionnent vraiment`)
};

const uk_homeaimoreworking3 = /** @type {(inputs: Homeaimoreworking3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`більше проєктів, які справді працюють`)
};

/**
* | output |
* | --- |
* | "more projects that actually run" |
*
* @param {Homeaimoreworking3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaimoreworking3 = /** @type {((inputs?: Homeaimoreworking3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaimoreworking3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaimoreworking3(inputs)
	if (locale === "zh") return zh_homeaimoreworking3(inputs)
	if (locale === "ja") return ja_homeaimoreworking3(inputs)
	if (locale === "ko") return ko_homeaimoreworking3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaimoreworking3(inputs)
	if (locale === "de") return de_homeaimoreworking3(inputs)
	if (locale === "fr") return fr_homeaimoreworking3(inputs)
	if (locale === "uk") return uk_homeaimoreworking3(inputs)
	return en_homeaimoreworking3(inputs)
});
export { homeaimoreworking3 as "homeAiMoreWorking" }