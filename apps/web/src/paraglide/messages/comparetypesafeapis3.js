/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparetypesafeapis3Inputs */



/**
* | output |
* | --- |
* | "Type-safe APIs (tRPC, oRPC, GraphQL)" |
*
* @param {Comparetypesafeapis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparetypesafeapis3 = /** @type {((inputs?: Comparetypesafeapis3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparetypesafeapis3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("APIs con seguridad de tipos (tRPC, oRPC, GraphQL)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("类型安全 API（tRPC、oRPC、GraphQL）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("タイプセーフ API (tRPC、oRPC、GraphQL)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("타입 안전 API(tRPC, oRPC, GraphQL)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("類型安全性 API（tRPC、oRPC、GraphQL）")
	if (locale === "de") return /** @type {LocalizedString} */ ("Typsichere APIs (tRPC, oRPC, GraphQL)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("APIs à typage sûr (tRPC, oRPC, GraphQL)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Типобезпечні API (tRPC, oRPC, GraphQL)")
	return /** @type {LocalizedString} */ ("Type-safe APIs (tRPC, oRPC, GraphQL)")
});
export { comparetypesafeapis3 as "compareTypeSafeApis" }