/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersharelinkfailed3Inputs */

const en_buildersharelinkfailed3 = /** @type {(inputs: Buildersharelinkfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy link`)
};

const es_buildersharelinkfailed3 = /** @type {(inputs: Buildersharelinkfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo copiar el enlace`)
};

const zh_buildersharelinkfailed3 = /** @type {(inputs: Buildersharelinkfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制链接失败`)
};

/**
* | output |
* | --- |
* | "Failed to copy link" |
*
* @param {Buildersharelinkfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersharelinkfailed3 = /** @type {((inputs?: Buildersharelinkfailed3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersharelinkfailed3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersharelinkfailed3(inputs)
	if (locale === "es") return es_buildersharelinkfailed3(inputs)
	return zh_buildersharelinkfailed3(inputs)
});
export { buildersharelinkfailed3 as "builderShareLinkFailed" }