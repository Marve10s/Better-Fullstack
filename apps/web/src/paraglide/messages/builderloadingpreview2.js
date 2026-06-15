/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderloadingpreview2Inputs */

const en_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading preview...`)
};

const es_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargando vista previa...`)
};

const zh_builderloadingpreview2 = /** @type {(inputs: Builderloadingpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加载预览...`)
};

/**
* | output |
* | --- |
* | "Loading preview..." |
*
* @param {Builderloadingpreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderloadingpreview2 = /** @type {((inputs?: Builderloadingpreview2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderloadingpreview2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderloadingpreview2(inputs)
	if (locale === "es") return es_builderloadingpreview2(inputs)
	return zh_builderloadingpreview2(inputs)
});
export { builderloadingpreview2 as "builderLoadingPreview" }