/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharedstackseodescription3Inputs */

const en_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open a shared Better Fullstack builder configuration.`)
};

const es_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abre una configuración compartida del constructor de Better Fullstack.`)
};

const zh_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开一个共享的 Better Fullstack 构建器配置。`)
};

/**
* | output |
* | --- |
* | "Open a shared Better Fullstack builder configuration." |
*
* @param {Sharedstackseodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sharedstackseodescription3 = /** @type {((inputs?: Sharedstackseodescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharedstackseodescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharedstackseodescription3(inputs)
	if (locale === "es") return es_sharedstackseodescription3(inputs)
	return zh_sharedstackseodescription3(inputs)
});
export { sharedstackseodescription3 as "sharedStackSeoDescription" }