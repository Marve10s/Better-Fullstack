/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpherotitlea3Inputs */

const en_mcpherotitlea3 = /** @type {(inputs: Mcpherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your agent.`)
};

const es_mcpherotitlea3 = /** @type {(inputs: Mcpherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tu agente.`)
};

const zh_mcpherotitlea3 = /** @type {(inputs: Mcpherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的代理。`)
};

const ja_mcpherotitlea3 = /** @type {(inputs: Mcpherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`あなたのエージェント。`)
};

const ko_mcpherotitlea3 = /** @type {(inputs: Mcpherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`귀하의 대리인.`)
};

const zh_hant1_mcpherotitlea3 = /** @type {(inputs: Mcpherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的代理商。`)
};

const de_mcpherotitlea3 = /** @type {(inputs: Mcpherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ihr Agent.`)
};

const fr_mcpherotitlea3 = /** @type {(inputs: Mcpherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Votre mandataire.`)
};

/**
* | output |
* | --- |
* | "Your agent." |
*
* @param {Mcpherotitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpherotitlea3 = /** @type {((inputs?: Mcpherotitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpherotitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpherotitlea3(inputs)
	if (locale === "es") return es_mcpherotitlea3(inputs)
	if (locale === "zh") return zh_mcpherotitlea3(inputs)
	if (locale === "ja") return ja_mcpherotitlea3(inputs)
	if (locale === "ko") return ko_mcpherotitlea3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpherotitlea3(inputs)
	if (locale === "de") return de_mcpherotitlea3(inputs)
	return fr_mcpherotitlea3(inputs)
});
export { mcpherotitlea3 as "mcpHeroTitleA" }