/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandomtooltip2Inputs */

const en_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate a random stack configuration`)
};

const es_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generar una configuración de stack aleatoria`)
};

const zh_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成一个随机的 stack 配置`)
};

/**
* | output |
* | --- |
* | "Generate a random stack configuration" |
*
* @param {Builderrandomtooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderrandomtooltip2 = /** @type {((inputs?: Builderrandomtooltip2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandomtooltip2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrandomtooltip2(inputs)
	if (locale === "es") return es_builderrandomtooltip2(inputs)
	return zh_builderrandomtooltip2(inputs)
});
export { builderrandomtooltip2 as "builderRandomTooltip" }