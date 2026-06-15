/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homefactyolo2Inputs */

const en_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO mode doubles every single one of them`)
};

const es_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El modo YOLO duplica cada una de ellas`)
};

const zh_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO 模式会让每个组合再翻倍`)
};

/**
* | output |
* | --- |
* | "YOLO mode doubles every single one of them" |
*
* @param {Homefactyolo2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homefactyolo2 = /** @type {((inputs?: Homefactyolo2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactyolo2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactyolo2(inputs)
	if (locale === "es") return es_homefactyolo2(inputs)
	return zh_homefactyolo2(inputs)
});
export { homefactyolo2 as "homeFactYolo" }