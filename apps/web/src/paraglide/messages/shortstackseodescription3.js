/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Shortstackseodescription3Inputs */

const en_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open a short Better Fullstack builder configuration link.`)
};

const es_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abre un enlace corto de configuración del constructor de Better Fullstack.`)
};

const zh_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开一个短链接形式的 Better Fullstack 构建器配置。`)
};

/**
* | output |
* | --- |
* | "Open a short Better Fullstack builder configuration link." |
*
* @param {Shortstackseodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const shortstackseodescription3 = /** @type {((inputs?: Shortstackseodescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Shortstackseodescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_shortstackseodescription3(inputs)
	if (locale === "es") return es_shortstackseodescription3(inputs)
	return zh_shortstackseodescription3(inputs)
});
export { shortstackseodescription3 as "shortStackSeoDescription" }