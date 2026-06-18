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

const ja_comparetypesafeapis3 = /** @type {(inputs: Comparetypesafeapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タイプセーフ API (tRPC、oRPC、GraphQL)`)
};

const ko_comparetypesafeapis3 = /** @type {(inputs: Comparetypesafeapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`유형이 안전한 APIs(tRPC, oRPC, GraphQL)`)
};

const zh_hant1_comparetypesafeapis3 = /** @type {(inputs: Comparetypesafeapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`類型安全性 API（tRPC、oRPC、GraphQL）`)
};

const de_comparetypesafeapis3 = /** @type {(inputs: Comparetypesafeapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Typsichere APIs (tRPC, oRPC, GraphQL)`)
};

const fr_comparetypesafeapis3 = /** @type {(inputs: Comparetypesafeapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`APIs de type sécurisé (tRPC, oRPC, GraphQL)`)
};

/**
* | output |
* | --- |
* | "Type-safe APIs (tRPC, oRPC, GraphQL)" |
*
* @param {Comparetypesafeapis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparetypesafeapis3 = /** @type {((inputs?: Comparetypesafeapis3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparetypesafeapis3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparetypesafeapis3(inputs)
	if (locale === "es") return es_comparetypesafeapis3(inputs)
	if (locale === "zh") return zh_comparetypesafeapis3(inputs)
	if (locale === "ja") return ja_comparetypesafeapis3(inputs)
	if (locale === "ko") return ko_comparetypesafeapis3(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparetypesafeapis3(inputs)
	if (locale === "de") return de_comparetypesafeapis3(inputs)
	return fr_comparetypesafeapis3(inputs)
});
export { comparetypesafeapis3 as "compareTypeSafeApis" }