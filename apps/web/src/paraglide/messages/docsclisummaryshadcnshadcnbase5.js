/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnbase5Inputs */

const en_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn primitive base.`)
};

const es_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base de primitivas de shadcn.`)
};

const zh_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn 基础原语库。`)
};

const ja_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn のプリミティブベース。`)
};

const ko_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn 프리미티브 기반.`)
};

const zh_hant1_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn 基礎元件函式庫。`)
};

const de_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basis für shadcn-Primitives.`)
};

const fr_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base de primitives shadcn.`)
};

const uk_docsclisummaryshadcnshadcnbase5 = /** @type {(inputs: Docsclisummaryshadcnshadcnbase5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`База примітивів shadcn.`)
};

/**
* | output |
* | --- |
* | "shadcn primitive base." |
*
* @param {Docsclisummaryshadcnshadcnbase5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnbase5 = /** @type {((inputs?: Docsclisummaryshadcnshadcnbase5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnbase5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryshadcnshadcnbase5(inputs)
	if (locale === "zh") return zh_docsclisummaryshadcnshadcnbase5(inputs)
	if (locale === "ja") return ja_docsclisummaryshadcnshadcnbase5(inputs)
	if (locale === "ko") return ko_docsclisummaryshadcnshadcnbase5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryshadcnshadcnbase5(inputs)
	if (locale === "de") return de_docsclisummaryshadcnshadcnbase5(inputs)
	if (locale === "fr") return fr_docsclisummaryshadcnshadcnbase5(inputs)
	if (locale === "uk") return uk_docsclisummaryshadcnshadcnbase5(inputs)
	return en_docsclisummaryshadcnshadcnbase5(inputs)
});
export { docsclisummaryshadcnshadcnbase5 as "docsCliSummaryShadcnShadcnBase" }