/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparereadytitle2Inputs */

const en_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ready to try it?`)
};

const es_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Listo para probarlo?`)
};

const zh_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`准备试试吗？`)
};

/**
* | output |
* | --- |
* | "Ready to try it?" |
*
* @param {Comparereadytitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparereadytitle2 = /** @type {((inputs?: Comparereadytitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparereadytitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparereadytitle2(inputs)
	if (locale === "es") return es_comparereadytitle2(inputs)
	return zh_comparereadytitle2(inputs)
});
export { comparereadytitle2 as "compareReadyTitle" }