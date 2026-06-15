/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderseodescription2Inputs */

const en_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build and share custom fullstack combinations with the Better Fullstack visual stack builder.`)
};

const es_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crea y comparte combinaciones fullstack personalizadas con el constructor visual de Better Fullstack.`)
};

const zh_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 Better Fullstack 可视化 stack 构建器创建并分享自定义全栈组合。`)
};

/**
* | output |
* | --- |
* | "Build and share custom fullstack combinations with the Better Fullstack visual stack builder." |
*
* @param {Builderseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderseodescription2 = /** @type {((inputs?: Builderseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderseodescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderseodescription2(inputs)
	if (locale === "es") return es_builderseodescription2(inputs)
	return zh_builderseodescription2(inputs)
});
export { builderseodescription2 as "builderSeoDescription" }