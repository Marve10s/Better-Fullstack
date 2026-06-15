/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderopendocumentation2Inputs */

const en_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open documentation`)
};

const es_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir documentación`)
};

const zh_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开文档`)
};

/**
* | output |
* | --- |
* | "Open documentation" |
*
* @param {Builderopendocumentation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderopendocumentation2 = /** @type {((inputs?: Builderopendocumentation2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderopendocumentation2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderopendocumentation2(inputs)
	if (locale === "es") return es_builderopendocumentation2(inputs)
	return zh_builderopendocumentation2(inputs)
});
export { builderopendocumentation2 as "builderOpenDocumentation" }