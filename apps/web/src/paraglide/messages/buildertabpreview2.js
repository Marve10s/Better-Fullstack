/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabpreview2Inputs */

const en_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview`)
};

const es_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vista previa`)
};

const zh_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预览`)
};

/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Buildertabpreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildertabpreview2 = /** @type {((inputs?: Buildertabpreview2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabpreview2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertabpreview2(inputs)
	if (locale === "es") return es_buildertabpreview2(inputs)
	return zh_buildertabpreview2(inputs)
});
export { buildertabpreview2 as "builderTabPreview" }