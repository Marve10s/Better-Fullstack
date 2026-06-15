/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetopenmenu2Inputs */

const en_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open preset menu`)
};

const es_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir menú de plantillas`)
};

const zh_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开预设菜单`)
};

/**
* | output |
* | --- |
* | "Open preset menu" |
*
* @param {Presetopenmenu2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presetopenmenu2 = /** @type {((inputs?: Presetopenmenu2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetopenmenu2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetopenmenu2(inputs)
	if (locale === "es") return es_presetopenmenu2(inputs)
	return zh_presetopenmenu2(inputs)
});
export { presetopenmenu2 as "presetOpenMenu" }