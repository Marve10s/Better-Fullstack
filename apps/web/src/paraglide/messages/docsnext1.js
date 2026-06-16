/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsnext1Inputs */

const en_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

const es_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Siguiente`)
};

const zh_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一页`)
};

/**
* | output |
* | --- |
* | "Next" |
*
* @param {Docsnext1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docsnext1 = /** @type {((inputs?: Docsnext1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsnext1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsnext1(inputs)
	if (locale === "es") return es_docsnext1(inputs)
	return zh_docsnext1(inputs)
});
export { docsnext1 as "docsNext" }