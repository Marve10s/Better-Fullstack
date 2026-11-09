/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatreadableresources3Inputs */



/**
* | output |
* | --- |
* | "readable resources" |
*
* @param {Mcpstatreadableresources3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpstatreadableresources3 = /** @type {((inputs?: Mcpstatreadableresources3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatreadableresources3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("recursos legibles")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可读资源")
	if (locale === "ja") return /** @type {LocalizedString} */ ("読み取り可能なリソース")
	if (locale === "ko") return /** @type {LocalizedString} */ ("읽을 수 있는 리소스")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("可讀資源")
	if (locale === "de") return /** @type {LocalizedString} */ ("lesbare Ressourcen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ressources lisibles")
	if (locale === "uk") return /** @type {LocalizedString} */ ("доступні для читання ресурси")
	return /** @type {LocalizedString} */ ("readable resources")
});
export { mcpstatreadableresources3 as "mcpStatReadableResources" }