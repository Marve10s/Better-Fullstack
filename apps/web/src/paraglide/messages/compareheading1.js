/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareheading1Inputs */

const en_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How does Better Fullstack compare?`)
};

const es_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Cómo se compara Better Fullstack?`)
};

const zh_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack 有什么不同？`)
};

/**
* | output |
* | --- |
* | "How does Better Fullstack compare?" |
*
* @param {Compareheading1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareheading1 = /** @type {((inputs?: Compareheading1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareheading1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareheading1(inputs)
	if (locale === "es") return es_compareheading1(inputs)
	return zh_compareheading1(inputs)
});
export { compareheading1 as "compareHeading" }