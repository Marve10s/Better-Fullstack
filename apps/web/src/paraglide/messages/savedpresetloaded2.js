/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetloaded2Inputs */

const en_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Loaded preset: ${i?.name}`)
};

const es_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Plantilla cargada: ${i?.name}`)
};

const zh_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已加载预设：${i?.name}`)
};

/**
* | output |
* | --- |
* | "Loaded preset: {name}" |
*
* @param {Savedpresetloaded2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedpresetloaded2 = /** @type {((inputs: Savedpresetloaded2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetloaded2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetloaded2(inputs)
	if (locale === "es") return es_savedpresetloaded2(inputs)
	return zh_savedpresetloaded2(inputs)
});
export { savedpresetloaded2 as "savedPresetLoaded" }