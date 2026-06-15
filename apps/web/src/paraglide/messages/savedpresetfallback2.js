/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetfallback2Inputs */

const en_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved preset`)
};

const es_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantilla guardada`)
};

const zh_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已保存预设`)
};

/**
* | output |
* | --- |
* | "Saved preset" |
*
* @param {Savedpresetfallback2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedpresetfallback2 = /** @type {((inputs?: Savedpresetfallback2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetfallback2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetfallback2(inputs)
	if (locale === "es") return es_savedpresetfallback2(inputs)
	return zh_savedpresetfallback2(inputs)
});
export { savedpresetfallback2 as "savedPresetFallback" }