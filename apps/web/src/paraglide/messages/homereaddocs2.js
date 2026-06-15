/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homereaddocs2Inputs */

const en_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read the docs`)
};

const es_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer la documentación`)
};

const zh_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读文档`)
};

/**
* | output |
* | --- |
* | "Read the docs" |
*
* @param {Homereaddocs2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homereaddocs2 = /** @type {((inputs?: Homereaddocs2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homereaddocs2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homereaddocs2(inputs)
	if (locale === "es") return es_homereaddocs2(inputs)
	return zh_homereaddocs2(inputs)
});
export { homereaddocs2 as "homeReadDocs" }