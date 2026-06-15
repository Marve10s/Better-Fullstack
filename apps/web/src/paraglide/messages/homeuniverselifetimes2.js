/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeuniverselifetimes2Inputs */

const en_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`universe lifetimes`)
};

const es_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`vidas del universo`)
};

const zh_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`个宇宙寿命`)
};

/**
* | output |
* | --- |
* | "universe lifetimes" |
*
* @param {Homeuniverselifetimes2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homeuniverselifetimes2 = /** @type {((inputs?: Homeuniverselifetimes2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeuniverselifetimes2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeuniverselifetimes2(inputs)
	if (locale === "es") return es_homeuniverselifetimes2(inputs)
	return zh_homeuniverselifetimes2(inputs)
});
export { homeuniverselifetimes2 as "homeUniverseLifetimes" }