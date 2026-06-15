/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderyolomode2Inputs */

const en_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO Mode`)
};

const es_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modo YOLO`)
};

const zh_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO 模式`)
};

/**
* | output |
* | --- |
* | "YOLO Mode" |
*
* @param {Builderyolomode2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderyolomode2 = /** @type {((inputs?: Builderyolomode2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderyolomode2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderyolomode2(inputs)
	if (locale === "es") return es_builderyolomode2(inputs)
	return zh_builderyolomode2(inputs)
});
export { builderyolomode2 as "builderYoloMode" }