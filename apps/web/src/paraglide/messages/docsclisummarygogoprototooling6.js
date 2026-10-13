/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoprototooling6Inputs */

const en_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go protobuf tooling.`)
};

const es_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramientas protobuf Go.`)
};

const zh_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go protobuf 工具。`)
};

const ja_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go の protobuf ツール。`)
};

const ko_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go protobuf 도구.`)
};

const zh_hant1_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go protobuf 工具。`)
};

const de_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`protobuf-Werkzeuge für Go.`)
};

const fr_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outils protobuf Go.`)
};

const uk_docsclisummarygogoprototooling6 = /** @type {(inputs: Docsclisummarygogoprototooling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інструменти protobuf для Go.`)
};

/**
* | output |
* | --- |
* | "Go protobuf tooling." |
*
* @param {Docsclisummarygogoprototooling6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoprototooling6 = /** @type {((inputs?: Docsclisummarygogoprototooling6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoprototooling6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogoprototooling6(inputs)
	if (locale === "zh") return zh_docsclisummarygogoprototooling6(inputs)
	if (locale === "ja") return ja_docsclisummarygogoprototooling6(inputs)
	if (locale === "ko") return ko_docsclisummarygogoprototooling6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogoprototooling6(inputs)
	if (locale === "de") return de_docsclisummarygogoprototooling6(inputs)
	if (locale === "fr") return fr_docsclisummarygogoprototooling6(inputs)
	if (locale === "uk") return uk_docsclisummarygogoprototooling6(inputs)
	return en_docsclisummarygogoprototooling6(inputs)
});
export { docsclisummarygogoprototooling6 as "docsCliSummaryGoGoProtoTooling" }