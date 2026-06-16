/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsopennavigation2Inputs */

const en_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open docs navigation`)
};

const es_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir navegación de docs`)
};

const zh_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开文档导航`)
};

/**
* | output |
* | --- |
* | "Open docs navigation" |
*
* @param {Docsopennavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docsopennavigation2 = /** @type {((inputs?: Docsopennavigation2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsopennavigation2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsopennavigation2(inputs)
	if (locale === "es") return es_docsopennavigation2(inputs)
	return zh_docsopennavigation2(inputs)
});
export { docsopennavigation2 as "docsOpenNavigation" }