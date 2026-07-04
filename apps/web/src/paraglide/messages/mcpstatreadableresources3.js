/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatreadableresources3Inputs */

const en_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`readable resources`)
};

const es_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`recursos legibles`)
};

const zh_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可读资源`)
};

const ja_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`読み取り可能なリソース`)
};

const ko_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`읽을 수 있는 리소스`)
};

const zh_hant1_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可讀資源`)
};

const de_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`lesbare Ressourcen`)
};

const fr_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ressources lisibles`)
};

const uk_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`доступні для читання ресурси`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpstatreadableresources3(inputs)
	if (locale === "es") return es_mcpstatreadableresources3(inputs)
	if (locale === "zh") return zh_mcpstatreadableresources3(inputs)
	if (locale === "ja") return ja_mcpstatreadableresources3(inputs)
	if (locale === "ko") return ko_mcpstatreadableresources3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpstatreadableresources3(inputs)
	if (locale === "de") return de_mcpstatreadableresources3(inputs)
	if (locale === "fr") return fr_mcpstatreadableresources3(inputs)
	return uk_mcpstatreadableresources3(inputs)
});
export { mcpstatreadableresources3 as "mcpStatReadableResources" }