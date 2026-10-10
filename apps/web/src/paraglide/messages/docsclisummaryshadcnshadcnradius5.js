/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnradius5Inputs */

const en_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Corner radius scale.`)
};

const es_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Escala del radio de las esquinas.`)
};

const zh_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`圆角尺寸。`)
};

const ja_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`角丸のスケール。`)
};

const ko_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모서리 반경 스케일.`)
};

const zh_hant1_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`圓角尺寸。`)
};

const de_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skala für den Eckenradius.`)
};

const fr_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Échelle des rayons des coins.`)
};

const uk_docsclisummaryshadcnshadcnradius5 = /** @type {(inputs: Docsclisummaryshadcnshadcnradius5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шкала радіусів заокруглення кутів.`)
};

/**
* | output |
* | --- |
* | "Corner radius scale." |
*
* @param {Docsclisummaryshadcnshadcnradius5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnradius5 = /** @type {((inputs?: Docsclisummaryshadcnshadcnradius5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnradius5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryshadcnshadcnradius5(inputs)
	if (locale === "zh") return zh_docsclisummaryshadcnshadcnradius5(inputs)
	if (locale === "ja") return ja_docsclisummaryshadcnshadcnradius5(inputs)
	if (locale === "ko") return ko_docsclisummaryshadcnshadcnradius5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryshadcnshadcnradius5(inputs)
	if (locale === "de") return de_docsclisummaryshadcnshadcnradius5(inputs)
	if (locale === "fr") return fr_docsclisummaryshadcnshadcnradius5(inputs)
	if (locale === "uk") return uk_docsclisummaryshadcnshadcnradius5(inputs)
	return en_docsclisummaryshadcnshadcnradius5(inputs)
});
export { docsclisummaryshadcnshadcnradius5 as "docsCliSummaryShadcnShadcnRadius" }