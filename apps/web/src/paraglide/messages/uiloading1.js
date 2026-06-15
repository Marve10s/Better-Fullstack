/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uiloading1Inputs */

const en_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading`)
};

const es_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargando`)
};

const zh_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载中`)
};

/**
* | output |
* | --- |
* | "Loading" |
*
* @param {Uiloading1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const uiloading1 = /** @type {((inputs?: Uiloading1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uiloading1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_uiloading1(inputs)
	if (locale === "es") return es_uiloading1(inputs)
	return zh_uiloading1(inputs)
});
export { uiloading1 as "uiLoading" }