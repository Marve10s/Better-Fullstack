/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareopenbuilder2Inputs */

const en_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open Stack Builder`)
};

const es_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir constructor de stack`)
};

const zh_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开 Stack 构建器`)
};

/**
* | output |
* | --- |
* | "Open Stack Builder" |
*
* @param {Compareopenbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareopenbuilder2 = /** @type {((inputs?: Compareopenbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareopenbuilder2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareopenbuilder2(inputs)
	if (locale === "es") return es_compareopenbuilder2(inputs)
	return zh_compareopenbuilder2(inputs)
});
export { compareopenbuilder2 as "compareOpenBuilder" }