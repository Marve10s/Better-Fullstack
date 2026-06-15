/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navmultiecosystem2Inputs */

const en_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multi-Ecosystem`)
};

const es_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multi-ecosistema`)
};

const zh_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`多生态`)
};

/**
* | output |
* | --- |
* | "Multi-Ecosystem" |
*
* @param {Navmultiecosystem2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navmultiecosystem2 = /** @type {((inputs?: Navmultiecosystem2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navmultiecosystem2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navmultiecosystem2(inputs)
	if (locale === "es") return es_navmultiecosystem2(inputs)
	return zh_navmultiecosystem2(inputs)
});
export { navmultiecosystem2 as "navMultiEcosystem" }