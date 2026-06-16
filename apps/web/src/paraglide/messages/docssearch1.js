/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearch1Inputs */

const en_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search docs`)
};

const es_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buscar docs`)
};

const zh_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索文档`)
};

/**
* | output |
* | --- |
* | "Search docs" |
*
* @param {Docssearch1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssearch1 = /** @type {((inputs?: Docssearch1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearch1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearch1(inputs)
	if (locale === "es") return es_docssearch1(inputs)
	return zh_docssearch1(inputs)
});
export { docssearch1 as "docsSearch" }