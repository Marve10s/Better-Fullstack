/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharedstackseotitle3Inputs */

const en_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Shared Stack | Better Fullstack`)
};

const es_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack compartido | Better Fullstack`)
};

const zh_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共享 Stack | Better Fullstack`)
};

/**
* | output |
* | --- |
* | "Shared Stack \| Better Fullstack" |
*
* @param {Sharedstackseotitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sharedstackseotitle3 = /** @type {((inputs?: Sharedstackseotitle3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharedstackseotitle3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharedstackseotitle3(inputs)
	if (locale === "es") return es_sharedstackseotitle3(inputs)
	return zh_sharedstackseotitle3(inputs)
});
export { sharedstackseotitle3 as "sharedStackSeoTitle" }