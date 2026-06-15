/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackloaded1Inputs */

const en_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack loaded successfully`)
};

const es_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack cargado correctamente`)
};

const zh_stackloaded1 = /** @type {(inputs: Stackloaded1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 加载成功`)
};

/**
* | output |
* | --- |
* | "Stack loaded successfully" |
*
* @param {Stackloaded1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackloaded1 = /** @type {((inputs?: Stackloaded1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackloaded1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackloaded1(inputs)
	if (locale === "es") return es_stackloaded1(inputs)
	return zh_stackloaded1(inputs)
});
export { stackloaded1 as "stackLoaded" }