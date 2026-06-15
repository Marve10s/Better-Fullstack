/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navpresets1Inputs */

const en_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Presets`)
};

const es_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantillas`)
};

const zh_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设`)
};

/**
* | output |
* | --- |
* | "Presets" |
*
* @param {Navpresets1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navpresets1 = /** @type {((inputs?: Navpresets1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navpresets1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navpresets1(inputs)
	if (locale === "es") return es_navpresets1(inputs)
	return zh_navpresets1(inputs)
});
export { navpresets1 as "navPresets" }