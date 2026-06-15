/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetnamerequired3Inputs */

const en_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preset name cannot be empty`)
};

const es_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El nombre de la plantilla no puede estar vacío`)
};

const zh_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设名称不能为空`)
};

/**
* | output |
* | --- |
* | "Preset name cannot be empty" |
*
* @param {Savedpresetnamerequired3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedpresetnamerequired3 = /** @type {((inputs?: Savedpresetnamerequired3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetnamerequired3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetnamerequired3(inputs)
	if (locale === "es") return es_savedpresetnamerequired3(inputs)
	return zh_savedpresetnamerequired3(inputs)
});
export { savedpresetnamerequired3 as "savedPresetNameRequired" }