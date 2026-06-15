/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uiclose1Inputs */

const en_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close`)
};

const es_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar`)
};

const zh_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭`)
};

/**
* | output |
* | --- |
* | "Close" |
*
* @param {Uiclose1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const uiclose1 = /** @type {((inputs?: Uiclose1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uiclose1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_uiclose1(inputs)
	if (locale === "es") return es_uiclose1(inputs)
	return zh_uiclose1(inputs)
});
export { uiclose1 as "uiClose" }