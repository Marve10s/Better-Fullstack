/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Toconthispage3Inputs */

const en_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`On this page`)
};

const es_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En esta página`)
};

const zh_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本页内容`)
};

/**
* | output |
* | --- |
* | "On this page" |
*
* @param {Toconthispage3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const toconthispage3 = /** @type {((inputs?: Toconthispage3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Toconthispage3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_toconthispage3(inputs)
	if (locale === "es") return es_toconthispage3(inputs)
	return zh_toconthispage3(inputs)
});
export { toconthispage3 as "tocOnThisPage" }