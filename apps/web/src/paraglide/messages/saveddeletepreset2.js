/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Saveddeletepreset2Inputs */

const en_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete Preset`)
};

const es_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eliminar plantilla`)
};

const zh_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除预设`)
};

/**
* | output |
* | --- |
* | "Delete Preset" |
*
* @param {Saveddeletepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const saveddeletepreset2 = /** @type {((inputs?: Saveddeletepreset2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddeletepreset2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_saveddeletepreset2(inputs)
	if (locale === "es") return es_saveddeletepreset2(inputs)
	return zh_saveddeletepreset2(inputs)
});
export { saveddeletepreset2 as "savedDeletePreset" }