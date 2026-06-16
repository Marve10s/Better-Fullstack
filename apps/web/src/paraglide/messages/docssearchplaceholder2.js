/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchplaceholder2Inputs */

const en_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search docs...`)
};

const es_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buscar docs...`)
};

const zh_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索文档...`)
};

/**
* | output |
* | --- |
* | "Search docs..." |
*
* @param {Docssearchplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssearchplaceholder2 = /** @type {((inputs?: Docssearchplaceholder2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchplaceholder2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchplaceholder2(inputs)
	if (locale === "es") return es_docssearchplaceholder2(inputs)
	return zh_docssearchplaceholder2(inputs)
});
export { docssearchplaceholder2 as "docsSearchPlaceholder" }