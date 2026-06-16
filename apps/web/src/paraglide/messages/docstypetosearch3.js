/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstypetosearch3Inputs */

const en_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type to search`)
};

const es_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Escribe para buscar`)
};

const zh_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入内容开始搜索`)
};

/**
* | output |
* | --- |
* | "Type to search" |
*
* @param {Docstypetosearch3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docstypetosearch3 = /** @type {((inputs?: Docstypetosearch3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstypetosearch3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docstypetosearch3(inputs)
	if (locale === "es") return es_docstypetosearch3(inputs)
	return zh_docstypetosearch3(inputs)
});
export { docstypetosearch3 as "docsTypeToSearch" }