/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareuilibrarychoices3Inputs */

const en_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`UI library choices`)
};

const es_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Opciones de librería UI`)
};

const zh_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`UI 库选择`)
};

/**
* | output |
* | --- |
* | "UI library choices" |
*
* @param {Compareuilibrarychoices3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareuilibrarychoices3 = /** @type {((inputs?: Compareuilibrarychoices3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareuilibrarychoices3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareuilibrarychoices3(inputs)
	if (locale === "es") return es_compareuilibrarychoices3(inputs)
	return zh_compareuilibrarychoices3(inputs)
});
export { compareuilibrarychoices3 as "compareUiLibraryChoices" }