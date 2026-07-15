/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsectionresources2Inputs */

const en_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resources`)
};

const es_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recursos`)
};

const zh_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`资源`)
};

const ja_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リソース`)
};

const ko_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`리소스`)
};

const zh_hant1_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`資源`)
};

const de_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ressourcen`)
};

const fr_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ressources`)
};

const uk_navsectionresources2 = /** @type {(inputs: Navsectionresources2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ресурси`)
};

/**
* | output |
* | --- |
* | "Resources" |
*
* @param {Navsectionresources2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navsectionresources2 = /** @type {((inputs?: Navsectionresources2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsectionresources2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navsectionresources2(inputs)
	if (locale === "es") return es_navsectionresources2(inputs)
	if (locale === "zh") return zh_navsectionresources2(inputs)
	if (locale === "ja") return ja_navsectionresources2(inputs)
	if (locale === "ko") return ko_navsectionresources2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navsectionresources2(inputs)
	if (locale === "de") return de_navsectionresources2(inputs)
	if (locale === "fr") return fr_navsectionresources2(inputs)
	return uk_navsectionresources2(inputs)
});
export { navsectionresources2 as "navSectionResources" }