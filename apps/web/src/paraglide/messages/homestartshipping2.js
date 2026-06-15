/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartshipping2Inputs */

const en_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start shipping.`)
};

const es_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Empieza a lanzar.`)
};

const zh_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始发布。`)
};

/**
* | output |
* | --- |
* | "Start shipping." |
*
* @param {Homestartshipping2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homestartshipping2 = /** @type {((inputs?: Homestartshipping2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartshipping2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homestartshipping2(inputs)
	if (locale === "es") return es_homestartshipping2(inputs)
	return zh_homestartshipping2(inputs)
});
export { homestartshipping2 as "homeStartShipping" }