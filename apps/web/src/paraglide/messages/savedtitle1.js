/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedtitle1Inputs */

const en_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved Projects & Presets`)
};

const es_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proyectos y plantillas guardados`)
};

const zh_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已保存项目和预设`)
};

/**
* | output |
* | --- |
* | "Saved Projects & Presets" |
*
* @param {Savedtitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedtitle1 = /** @type {((inputs?: Savedtitle1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedtitle1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedtitle1(inputs)
	if (locale === "es") return es_savedtitle1(inputs)
	return zh_savedtitle1(inputs)
});
export { savedtitle1 as "savedTitle" }