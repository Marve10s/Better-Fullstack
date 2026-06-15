/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Gohome1Inputs */

const en_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go Home`)
};

const es_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ir al inicio`)
};

const zh_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回首页`)
};

/**
* | output |
* | --- |
* | "Go Home" |
*
* @param {Gohome1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const gohome1 = /** @type {((inputs?: Gohome1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Gohome1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_gohome1(inputs)
	if (locale === "es") return es_gohome1(inputs)
	return zh_gohome1(inputs)
});
export { gohome1 as "goHome" }