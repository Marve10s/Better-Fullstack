/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnfont5Inputs */

const en_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default font.`)
};

const es_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fuente predeterminada.`)
};

const zh_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认字体。`)
};

const ja_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`デフォルトのフォント。`)
};

const ko_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기본 글꼴.`)
};

const zh_hant1_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設字型。`)
};

const de_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Standardschriftart.`)
};

const fr_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Police par défaut.`)
};

const uk_docsclisummaryshadcnshadcnfont5 = /** @type {(inputs: Docsclisummaryshadcnshadcnfont5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Типовий шрифт.`)
};

/**
* | output |
* | --- |
* | "Default font." |
*
* @param {Docsclisummaryshadcnshadcnfont5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnfont5 = /** @type {((inputs?: Docsclisummaryshadcnshadcnfont5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnfont5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryshadcnshadcnfont5(inputs)
	if (locale === "zh") return zh_docsclisummaryshadcnshadcnfont5(inputs)
	if (locale === "ja") return ja_docsclisummaryshadcnshadcnfont5(inputs)
	if (locale === "ko") return ko_docsclisummaryshadcnshadcnfont5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryshadcnshadcnfont5(inputs)
	if (locale === "de") return de_docsclisummaryshadcnshadcnfont5(inputs)
	if (locale === "fr") return fr_docsclisummaryshadcnshadcnfont5(inputs)
	if (locale === "uk") return uk_docsclisummaryshadcnshadcnfont5(inputs)
	return en_docsclisummaryshadcnshadcnfont5(inputs)
});
export { docsclisummaryshadcnshadcnfont5 as "docsCliSummaryShadcnShadcnFont" }