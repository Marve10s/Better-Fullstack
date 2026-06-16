/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparetypesafeapis3Inputs */

const en_comparetypesafeapis3 = /** @type {(inputs: Comparetypesafeapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type-safe APIs (tRPC, oRPC, GraphQL)`)
};

const es_comparetypesafeapis3 = /** @type {(inputs: Comparetypesafeapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`APIs con seguridad de tipos (tRPC, oRPC, GraphQL)`)
};

const zh_comparetypesafeapis3 = /** @type {(inputs: Comparetypesafeapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型安全 API（tRPC、oRPC、GraphQL）`)
};

/**
* | output |
* | --- |
* | "Type-safe APIs (tRPC, oRPC, GraphQL)" |
*
* @param {Comparetypesafeapis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparetypesafeapis3 = /** @type {((inputs?: Comparetypesafeapis3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparetypesafeapis3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparetypesafeapis3(inputs)
	if (locale === "es") return es_comparetypesafeapis3(inputs)
	return zh_comparetypesafeapis3(inputs)
});
export { comparetypesafeapis3 as "compareTypeSafeApis" }