/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresources1Inputs */

const en_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`readable resources`)
};

const es_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`recursos legibles`)
};

const zh_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可读资源`)
};

const ja_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`読み取り可能なリソース`)
};

const ko_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`읽을 수 있는 리소스`)
};

const zh_hant1_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可讀資源`)
};

const de_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`lesbare Ressourcen`)
};

const fr_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ressources lisibles`)
};

const uk_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`доступні для читання ресурси`)
};

/**
* | output |
* | --- |
* | "readable resources" |
*
* @param {Mcpresources1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpresources1 = /** @type {((inputs?: Mcpresources1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresources1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpresources1(inputs)
	if (locale === "es") return es_mcpresources1(inputs)
	if (locale === "zh") return zh_mcpresources1(inputs)
	if (locale === "ja") return ja_mcpresources1(inputs)
	if (locale === "ko") return ko_mcpresources1(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpresources1(inputs)
	if (locale === "de") return de_mcpresources1(inputs)
	if (locale === "fr") return fr_mcpresources1(inputs)
	return uk_mcpresources1(inputs)
});
export { mcpresources1 as "mcpResources" }