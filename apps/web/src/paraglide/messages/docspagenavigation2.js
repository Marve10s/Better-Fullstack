/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docspagenavigation2Inputs */

const en_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Page navigation`)
};

const es_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navegación de página`)
};

const zh_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`页面导航`)
};

/**
* | output |
* | --- |
* | "Page navigation" |
*
* @param {Docspagenavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docspagenavigation2 = /** @type {((inputs?: Docspagenavigation2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docspagenavigation2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docspagenavigation2(inputs)
	if (locale === "es") return es_docspagenavigation2(inputs)
	return zh_docspagenavigation2(inputs)
});
export { docspagenavigation2 as "docsPageNavigation" }