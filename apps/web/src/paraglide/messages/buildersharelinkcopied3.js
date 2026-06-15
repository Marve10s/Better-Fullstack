/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersharelinkcopied3Inputs */

const en_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Share link copied!`)
};

const es_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enlace copiado.`)
};

const zh_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享链接已复制！`)
};

/**
* | output |
* | --- |
* | "Share link copied!" |
*
* @param {Buildersharelinkcopied3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersharelinkcopied3 = /** @type {((inputs?: Buildersharelinkcopied3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersharelinkcopied3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersharelinkcopied3(inputs)
	if (locale === "es") return es_buildersharelinkcopied3(inputs)
	return zh_buildersharelinkcopied3(inputs)
});
export { buildersharelinkcopied3 as "builderShareLinkCopied" }