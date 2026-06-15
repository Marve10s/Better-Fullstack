/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcopy1Inputs */

const en_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy`)
};

const es_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar`)
};

const zh_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制`)
};

/**
* | output |
* | --- |
* | "Copy" |
*
* @param {Stackcopy1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackcopy1 = /** @type {((inputs?: Stackcopy1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcopy1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackcopy1(inputs)
	if (locale === "es") return es_stackcopy1(inputs)
	return zh_stackcopy1(inputs)
});
export { stackcopy1 as "stackCopy" }