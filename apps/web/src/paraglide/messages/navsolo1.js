/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsolo1Inputs */

const en_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo`)
};

const es_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo`)
};

const zh_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`单项目`)
};

/**
* | output |
* | --- |
* | "Solo" |
*
* @param {Navsolo1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navsolo1 = /** @type {((inputs?: Navsolo1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsolo1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navsolo1(inputs)
	if (locale === "es") return es_navsolo1(inputs)
	return zh_navsolo1(inputs)
});
export { navsolo1 as "navSolo" }