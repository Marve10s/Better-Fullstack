/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclosesearch2Inputs */

const en_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close search`)
};

const es_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar búsqueda`)
};

const zh_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭搜索`)
};

/**
* | output |
* | --- |
* | "Close search" |
*
* @param {Docsclosesearch2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docsclosesearch2 = /** @type {((inputs?: Docsclosesearch2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclosesearch2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsclosesearch2(inputs)
	if (locale === "es") return es_docsclosesearch2(inputs)
	return zh_docsclosesearch2(inputs)
});
export { docsclosesearch2 as "docsCloseSearch" }