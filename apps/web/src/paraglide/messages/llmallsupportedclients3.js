/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmallsupportedclients3Inputs */

const en_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`all supported clients`)
};

const es_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`todos los clientes soportados`)
};

const zh_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有支持的客户端`)
};

const ja_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`サポートされているすべてのクライアント`)
};

const ko_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`지원되는 모든 클라이언트`)
};

const zh_hant1_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有支援的客戶端`)
};

const de_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`alle unterstützten Clients`)
};

const fr_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`tous les clients pris en charge`)
};

const uk_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`всі підтримувані клієнти`)
};

/**
* | output |
* | --- |
* | "all supported clients" |
*
* @param {Llmallsupportedclients3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmallsupportedclients3 = /** @type {((inputs?: Llmallsupportedclients3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmallsupportedclients3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmallsupportedclients3(inputs)
	if (locale === "es") return es_llmallsupportedclients3(inputs)
	if (locale === "zh") return zh_llmallsupportedclients3(inputs)
	if (locale === "ja") return ja_llmallsupportedclients3(inputs)
	if (locale === "ko") return ko_llmallsupportedclients3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmallsupportedclients3(inputs)
	if (locale === "de") return de_llmallsupportedclients3(inputs)
	if (locale === "fr") return fr_llmallsupportedclients3(inputs)
	return uk_llmallsupportedclients3(inputs)
});
export { llmallsupportedclients3 as "llmAllSupportedClients" }