/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharelinkcopyfailed3Inputs */

const en_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy link`)
};

const es_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo copiar el enlace`)
};

const zh_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制链接失败`)
};

/**
* | output |
* | --- |
* | "Failed to copy link" |
*
* @param {Sharelinkcopyfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sharelinkcopyfailed3 = /** @type {((inputs?: Sharelinkcopyfailed3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharelinkcopyfailed3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharelinkcopyfailed3(inputs)
	if (locale === "es") return es_sharelinkcopyfailed3(inputs)
	return zh_sharelinkcopyfailed3(inputs)
});
export { sharelinkcopyfailed3 as "shareLinkCopyFailed" }