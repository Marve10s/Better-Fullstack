/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatepreset2Inputs */

const en_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Update Preset`)
};

const es_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizar plantilla`)
};

const zh_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新预设`)
};

/**
* | output |
* | --- |
* | "Update Preset" |
*
* @param {Builderupdatepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderupdatepreset2 = /** @type {((inputs?: Builderupdatepreset2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepreset2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderupdatepreset2(inputs)
	if (locale === "es") return es_builderupdatepreset2(inputs)
	return zh_builderupdatepreset2(inputs)
});
export { builderupdatepreset2 as "builderUpdatePreset" }