/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpherotitleb3Inputs */

const en_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every stack.`)
};

const es_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada stack.`)
};

const zh_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任何 stack。`)
};

const ja_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべてのスタック。`)
};

const ko_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 스택.`)
};

const zh_hant1_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任何 stack。`)
};

const de_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jeder Stapel.`)
};

const fr_mcpherotitleb3 = /** @type {(inputs: Mcpherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chaque pile.`)
};

/**
* | output |
* | --- |
* | "Every stack." |
*
* @param {Mcpherotitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpherotitleb3 = /** @type {((inputs?: Mcpherotitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpherotitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpherotitleb3(inputs)
	if (locale === "es") return es_mcpherotitleb3(inputs)
	if (locale === "zh") return zh_mcpherotitleb3(inputs)
	if (locale === "ja") return ja_mcpherotitleb3(inputs)
	if (locale === "ko") return ko_mcpherotitleb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpherotitleb3(inputs)
	if (locale === "de") return de_mcpherotitleb3(inputs)
	return fr_mcpherotitleb3(inputs)
});
export { mcpherotitleb3 as "mcpHeroTitleB" }