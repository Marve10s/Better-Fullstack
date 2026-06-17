/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedproject1Inputs */

const en_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const es_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proyecto`)
};

const zh_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目`)
};

const ja_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクト`)
};

const ko_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트`)
};

const zh_hant1_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`專案`)
};

const de_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projekt`)
};

const fr_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projet`)
};

/**
* | output |
* | --- |
* | "Project" |
*
* @param {Savedproject1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedproject1 = /** @type {((inputs?: Savedproject1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedproject1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedproject1(inputs)
	if (locale === "es") return es_savedproject1(inputs)
	if (locale === "zh") return zh_savedproject1(inputs)
	if (locale === "ja") return ja_savedproject1(inputs)
	if (locale === "ko") return ko_savedproject1(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedproject1(inputs)
	if (locale === "de") return de_savedproject1(inputs)
	return fr_savedproject1(inputs)
});
export { savedproject1 as "savedProject" }