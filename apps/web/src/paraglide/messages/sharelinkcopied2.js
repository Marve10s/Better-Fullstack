/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharelinkcopied2Inputs */

const en_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Link copied to clipboard!`)
};

const es_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enlace copiado al portapapeles.`)
};

const zh_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`链接已复制到剪贴板！`)
};

/**
* | output |
* | --- |
* | "Link copied to clipboard!" |
*
* @param {Sharelinkcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sharelinkcopied2 = /** @type {((inputs?: Sharelinkcopied2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharelinkcopied2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharelinkcopied2(inputs)
	if (locale === "es") return es_sharelinkcopied2(inputs)
	return zh_sharelinkcopied2(inputs)
});
export { sharelinkcopied2 as "shareLinkCopied" }