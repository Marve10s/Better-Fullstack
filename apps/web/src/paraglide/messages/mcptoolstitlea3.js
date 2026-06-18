/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolstitlea3Inputs */

const en_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Seven tools.`)
};

const es_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Siete herramientas.`)
};

const zh_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七个工具。`)
};

const ja_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七つの道具。`)
};

const ko_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`일곱 가지 도구.`)
};

const zh_hant1_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七個工具。`)
};

const de_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sieben Werkzeuge.`)
};

const fr_mcptoolstitlea3 = /** @type {(inputs: Mcptoolstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sept outils.`)
};

/**
* | output |
* | --- |
* | "Seven tools." |
*
* @param {Mcptoolstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolstitlea3 = /** @type {((inputs?: Mcptoolstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolstitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolstitlea3(inputs)
	if (locale === "es") return es_mcptoolstitlea3(inputs)
	if (locale === "zh") return zh_mcptoolstitlea3(inputs)
	if (locale === "ja") return ja_mcptoolstitlea3(inputs)
	if (locale === "ko") return ko_mcptoolstitlea3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolstitlea3(inputs)
	if (locale === "de") return de_mcptoolstitlea3(inputs)
	return fr_mcptoolstitlea3(inputs)
});
export { mcptoolstitlea3 as "mcpToolsTitleA" }