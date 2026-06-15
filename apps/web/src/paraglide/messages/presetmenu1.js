/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetmenu1Inputs */

const en_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Presets`)
};

const es_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantillas`)
};

const zh_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设`)
};

/**
* | output |
* | --- |
* | "Presets" |
*
* @param {Presetmenu1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presetmenu1 = /** @type {((inputs?: Presetmenu1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetmenu1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetmenu1(inputs)
	if (locale === "es") return es_presetmenu1(inputs)
	return zh_presetmenu1(inputs)
});
export { presetmenu1 as "presetMenu" }