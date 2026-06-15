/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparepythonbackends2Inputs */

const en_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python backends (FastAPI, Django)`)
};

const es_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backends Python (FastAPI, Django)`)
};

const zh_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 后端（FastAPI、Django）`)
};

/**
* | output |
* | --- |
* | "Python backends (FastAPI, Django)" |
*
* @param {Comparepythonbackends2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparepythonbackends2 = /** @type {((inputs?: Comparepythonbackends2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepythonbackends2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparepythonbackends2(inputs)
	if (locale === "es") return es_comparepythonbackends2(inputs)
	return zh_comparepythonbackends2(inputs)
});
export { comparepythonbackends2 as "comparePythonBackends" }