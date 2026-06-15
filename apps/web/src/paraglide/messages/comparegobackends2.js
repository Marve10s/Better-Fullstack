/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegobackends2Inputs */

const en_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go backends (Gin, Echo)`)
};

const es_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backends Go (Gin, Echo)`)
};

const zh_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 后端（Gin、Echo）`)
};

/**
* | output |
* | --- |
* | "Go backends (Gin, Echo)" |
*
* @param {Comparegobackends2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparegobackends2 = /** @type {((inputs?: Comparegobackends2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegobackends2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegobackends2(inputs)
	if (locale === "es") return es_comparegobackends2(inputs)
	return zh_comparegobackends2(inputs)
});
export { comparegobackends2 as "compareGoBackends" }