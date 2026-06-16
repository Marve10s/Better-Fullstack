/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclosenavigation2Inputs */

const en_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close docs navigation`)
};

const es_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar navegación de docs`)
};

const zh_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭文档导航`)
};

/**
* | output |
* | --- |
* | "Close docs navigation" |
*
* @param {Docsclosenavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docsclosenavigation2 = /** @type {((inputs?: Docsclosenavigation2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclosenavigation2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsclosenavigation2(inputs)
	if (locale === "es") return es_docsclosenavigation2(inputs)
	return zh_docsclosenavigation2(inputs)
});
export { docsclosenavigation2 as "docsCloseNavigation" }