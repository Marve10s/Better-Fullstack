/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourcegettingstarteddescription4Inputs */

const en_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quick-start recipes per ecosystem`)
};

const es_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recetas de inicio rápido por ecosistema`)
};

const zh_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`按生态划分的快速上手指南`)
};

const ja_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エコシステムごとのクイックスタート レシピ`)
};

const ko_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생태계별 빠른 시작 레시피`)
};

const zh_hant1_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`按生態劃分的快速上手指南`)
};

const de_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schnellstartrezepte pro Ökosystem`)
};

const fr_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recettes rapides par écosystème`)
};

/**
* | output |
* | --- |
* | "Quick-start recipes per ecosystem" |
*
* @param {Mcpresourcegettingstarteddescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpresourcegettingstarteddescription4 = /** @type {((inputs?: Mcpresourcegettingstarteddescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresourcegettingstarteddescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpresourcegettingstarteddescription4(inputs)
	if (locale === "es") return es_mcpresourcegettingstarteddescription4(inputs)
	if (locale === "zh") return zh_mcpresourcegettingstarteddescription4(inputs)
	if (locale === "ja") return ja_mcpresourcegettingstarteddescription4(inputs)
	if (locale === "ko") return ko_mcpresourcegettingstarteddescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpresourcegettingstarteddescription4(inputs)
	if (locale === "de") return de_mcpresourcegettingstarteddescription4(inputs)
	return fr_mcpresourcegettingstarteddescription4(inputs)
});
export { mcpresourcegettingstarteddescription4 as "mcpResourceGettingStartedDescription" }