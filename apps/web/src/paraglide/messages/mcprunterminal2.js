/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcprunterminal2Inputs */

const en_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`run in your terminal`)
};

const es_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ejecutar en la terminal`)
};

const zh_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在终端运行`)
};

/**
* | output |
* | --- |
* | "run in your terminal" |
*
* @param {Mcprunterminal2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcprunterminal2 = /** @type {((inputs?: Mcprunterminal2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcprunterminal2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcprunterminal2(inputs)
	if (locale === "es") return es_mcprunterminal2(inputs)
	return zh_mcprunterminal2(inputs)
});
export { mcprunterminal2 as "mcpRunTerminal" }