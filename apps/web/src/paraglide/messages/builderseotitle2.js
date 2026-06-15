/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderseotitle2Inputs */

const en_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder | Better Fullstack`)
};

const es_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor de stack | Better Fullstack`)
};

const zh_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 构建器 | Better Fullstack`)
};

/**
* | output |
* | --- |
* | "Stack Builder \| Better Fullstack" |
*
* @param {Builderseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderseotitle2 = /** @type {((inputs?: Builderseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderseotitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderseotitle2(inputs)
	if (locale === "es") return es_builderseotitle2(inputs)
	return zh_builderseotitle2(inputs)
});
export { builderseotitle2 as "builderSeoTitle" }