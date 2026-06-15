/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavepreset2Inputs */

const en_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save preset`)
};

const es_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guardar plantilla`)
};

const zh_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存预设`)
};

/**
* | output |
* | --- |
* | "Save preset" |
*
* @param {Buildersavepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersavepreset2 = /** @type {((inputs?: Buildersavepreset2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavepreset2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersavepreset2(inputs)
	if (locale === "es") return es_buildersavepreset2(inputs)
	return zh_buildersavepreset2(inputs)
});
export { buildersavepreset2 as "builderSavePreset" }