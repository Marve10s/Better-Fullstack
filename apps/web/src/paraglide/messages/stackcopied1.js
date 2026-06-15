/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcopied1Inputs */

const en_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copied!`)
};

const es_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¡Copiado!`)
};

const zh_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制！`)
};

/**
* | output |
* | --- |
* | "Copied!" |
*
* @param {Stackcopied1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackcopied1 = /** @type {((inputs?: Stackcopied1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcopied1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackcopied1(inputs)
	if (locale === "es") return es_stackcopied1(inputs)
	return zh_stackcopied1(inputs)
});
export { stackcopied1 as "stackCopied" }