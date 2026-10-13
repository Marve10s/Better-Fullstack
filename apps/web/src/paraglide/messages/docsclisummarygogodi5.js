/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogodi5Inputs */

const en_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go dependency injection.`)
};

const es_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inyección de dependencias en Go.`)
};

const zh_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 依赖注入。`)
};

const ja_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go の依存性注入。`)
};

const ko_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 의존성 주입.`)
};

const zh_hant1_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 相依性注入。`)
};

const de_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dependency Injection für Go.`)
};

const fr_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Injection de dépendances Go.`)
};

const uk_docsclisummarygogodi5 = /** @type {(inputs: Docsclisummarygogodi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Впровадження залежностей у Go.`)
};

/**
* | output |
* | --- |
* | "Go dependency injection." |
*
* @param {Docsclisummarygogodi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogodi5 = /** @type {((inputs?: Docsclisummarygogodi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogodi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogodi5(inputs)
	if (locale === "zh") return zh_docsclisummarygogodi5(inputs)
	if (locale === "ja") return ja_docsclisummarygogodi5(inputs)
	if (locale === "ko") return ko_docsclisummarygogodi5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogodi5(inputs)
	if (locale === "de") return de_docsclisummarygogodi5(inputs)
	if (locale === "fr") return fr_docsclisummarygogodi5(inputs)
	if (locale === "uk") return uk_docsclisummarygogodi5(inputs)
	return en_docsclisummarygogodi5(inputs)
});
export { docsclisummarygogodi5 as "docsCliSummaryGoGoDi" }