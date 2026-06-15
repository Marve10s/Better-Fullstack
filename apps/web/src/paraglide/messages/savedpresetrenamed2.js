/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetrenamed2Inputs */

const en_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preset renamed`)
};

const es_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantilla renombrada`)
};

const zh_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设已重命名`)
};

/**
* | output |
* | --- |
* | "Preset renamed" |
*
* @param {Savedpresetrenamed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedpresetrenamed2 = /** @type {((inputs?: Savedpresetrenamed2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetrenamed2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetrenamed2(inputs)
	if (locale === "es") return es_savedpresetrenamed2(inputs)
	return zh_savedpresetrenamed2(inputs)
});
export { savedpresetrenamed2 as "savedPresetRenamed" }