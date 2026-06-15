/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogtitle1Inputs */

const en_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notes from the workshop.`)
};

const es_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notas desde el taller.`)
};

const zh_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来自工作台的笔记。`)
};

/**
* | output |
* | --- |
* | "Notes from the workshop." |
*
* @param {Blogtitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const blogtitle1 = /** @type {((inputs?: Blogtitle1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogtitle1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogtitle1(inputs)
	if (locale === "es") return es_blogtitle1(inputs)
	return zh_blogtitle1(inputs)
});
export { blogtitle1 as "blogTitle" }