/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareseotitle2Inputs */

const en_compareseotitle2 = /** @type {(inputs: Compareseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compare Fullstack Scaffolding Tools | Better Fullstack`)
};

const es_compareseotitle2 = /** @type {(inputs: Compareseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comparar herramientas de scaffolding fullstack | Better Fullstack`)
};

const zh_compareseotitle2 = /** @type {(inputs: Compareseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比较全栈脚手架工具 | Better Fullstack`)
};

const ja_compareseotitle2 = /** @type {(inputs: Compareseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フルスタック足場ツールの比較 | Better Fullstack`)
};

const ko_compareseotitle2 = /** @type {(inputs: Compareseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`풀스택 비계 도구 비교 | Better Fullstack`)
};

const zh_hant1_compareseotitle2 = /** @type {(inputs: Compareseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比較全端腳手架工具 | Better Fullstack`)
};

const de_compareseotitle2 = /** @type {(inputs: Compareseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vergleichen Sie Fullstack-Gerüstwerkzeuge | Better Fullstack`)
};

const fr_compareseotitle2 = /** @type {(inputs: Compareseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comparez les outils d'échafaudage Fullstack | Better Fullstack`)
};

/**
* | output |
* | --- |
* | "Compare Fullstack Scaffolding Tools \| Better Fullstack" |
*
* @param {Compareseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareseotitle2 = /** @type {((inputs?: Compareseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareseotitle2(inputs)
	if (locale === "es") return es_compareseotitle2(inputs)
	if (locale === "zh") return zh_compareseotitle2(inputs)
	if (locale === "ja") return ja_compareseotitle2(inputs)
	if (locale === "ko") return ko_compareseotitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareseotitle2(inputs)
	if (locale === "de") return de_compareseotitle2(inputs)
	return fr_compareseotitle2(inputs)
});
export { compareseotitle2 as "compareSeoTitle" }