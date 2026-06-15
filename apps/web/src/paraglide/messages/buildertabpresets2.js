/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabpresets2Inputs */

const en_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Presets`)
};

const es_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantillas`)
};

const zh_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设`)
};

/**
* | output |
* | --- |
* | "Presets" |
*
* @param {Buildertabpresets2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildertabpresets2 = /** @type {((inputs?: Buildertabpresets2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabpresets2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertabpresets2(inputs)
	if (locale === "es") return es_buildertabpresets2(inputs)
	return zh_buildertabpresets2(inputs)
});
export { buildertabpresets2 as "builderTabPresets" }