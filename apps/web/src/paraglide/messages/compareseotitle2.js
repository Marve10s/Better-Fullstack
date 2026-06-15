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

/**
* | output |
* | --- |
* | "Compare Fullstack Scaffolding Tools \| Better Fullstack" |
*
* @param {Compareseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareseotitle2 = /** @type {((inputs?: Compareseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareseotitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareseotitle2(inputs)
	if (locale === "es") return es_compareseotitle2(inputs)
	return zh_compareseotitle2(inputs)
});
export { compareseotitle2 as "compareSeoTitle" }