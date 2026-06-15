/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeseotitle2Inputs */

const en_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — Scaffold Production-Ready Fullstack Apps in Seconds`)
};

const es_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — Crea apps fullstack listas para producción en segundos`)
};

const zh_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — 几秒内生成可用于生产的全栈应用`)
};

/**
* | output |
* | --- |
* | "Better Fullstack — Scaffold Production-Ready Fullstack Apps in Seconds" |
*
* @param {Homeseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homeseotitle2 = /** @type {((inputs?: Homeseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeseotitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeseotitle2(inputs)
	if (locale === "es") return es_homeseotitle2(inputs)
	return zh_homeseotitle2(inputs)
});
export { homeseotitle2 as "homeSeoTitle" }