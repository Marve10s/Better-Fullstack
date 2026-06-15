/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpopenbuilder2Inputs */

const en_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open builder`)
};

const es_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir constructor`)
};

const zh_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开构建器`)
};

/**
* | output |
* | --- |
* | "Open builder" |
*
* @param {Mcpopenbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpopenbuilder2 = /** @type {((inputs?: Mcpopenbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpopenbuilder2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpopenbuilder2(inputs)
	if (locale === "es") return es_mcpopenbuilder2(inputs)
	return zh_mcpopenbuilder2(inputs)
});
export { mcpopenbuilder2 as "mcpOpenBuilder" }