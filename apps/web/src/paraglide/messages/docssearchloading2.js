/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchloading2Inputs */

const en_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading search...`)
};

const es_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargando búsqueda...`)
};

const zh_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加载搜索...`)
};

/**
* | output |
* | --- |
* | "Loading search..." |
*
* @param {Docssearchloading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssearchloading2 = /** @type {((inputs?: Docssearchloading2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchloading2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchloading2(inputs)
	if (locale === "es") return es_docssearchloading2(inputs)
	return zh_docssearchloading2(inputs)
});
export { docssearchloading2 as "docsSearchLoading" }