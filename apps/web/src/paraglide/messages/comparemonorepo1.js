/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparemonorepo1Inputs */

const en_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo (Turborepo)`)
};

const es_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo (Turborepo)`)
};

const zh_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo（Turborepo）`)
};

/**
* | output |
* | --- |
* | "Monorepo (Turborepo)" |
*
* @param {Comparemonorepo1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparemonorepo1 = /** @type {((inputs?: Comparemonorepo1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparemonorepo1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparemonorepo1(inputs)
	if (locale === "es") return es_comparemonorepo1(inputs)
	return zh_comparemonorepo1(inputs)
});
export { comparemonorepo1 as "compareMonorepo" }