/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogocli5Inputs */

const en_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go CLI tooling.`)
};

const es_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramientas CLI Go.`)
};

const zh_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go CLI 工具。`)
};

const ja_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go の CLI ツール。`)
};

const ko_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go CLI 도구.`)
};

const zh_hant1_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go CLI 工具。`)
};

const de_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI-Werkzeuge für Go.`)
};

const fr_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outils CLI Go.`)
};

const uk_docsclisummarygogocli5 = /** @type {(inputs: Docsclisummarygogocli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інструменти CLI для Go.`)
};

/**
* | output |
* | --- |
* | "Go CLI tooling." |
*
* @param {Docsclisummarygogocli5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogocli5 = /** @type {((inputs?: Docsclisummarygogocli5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogocli5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogocli5(inputs)
	if (locale === "zh") return zh_docsclisummarygogocli5(inputs)
	if (locale === "ja") return ja_docsclisummarygogocli5(inputs)
	if (locale === "ko") return ko_docsclisummarygogocli5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogocli5(inputs)
	if (locale === "de") return de_docsclisummarygogocli5(inputs)
	if (locale === "fr") return fr_docsclisummarygogocli5(inputs)
	if (locale === "uk") return uk_docsclisummarygogocli5(inputs)
	return en_docsclisummarygogocli5(inputs)
});
export { docsclisummarygogocli5 as "docsCliSummaryGoGoCli" }