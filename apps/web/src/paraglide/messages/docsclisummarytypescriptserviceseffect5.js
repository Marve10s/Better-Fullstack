/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptserviceseffect5Inputs */

const en_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect capability level.`)
};

const es_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nivel de funcionalidades de Effect.`)
};

const zh_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect 使用级别。`)
};

const ja_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect の利用レベル。`)
};

const ko_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect 사용 수준.`)
};

const zh_hant1_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect 使用層級。`)
};

const de_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Funktionsumfang von Effect.`)
};

const fr_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Niveau de fonctionnalités d’Effect.`)
};

const uk_docsclisummarytypescriptserviceseffect5 = /** @type {(inputs: Docsclisummarytypescriptserviceseffect5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Рівень можливостей Effect.`)
};

/**
* | output |
* | --- |
* | "Effect capability level." |
*
* @param {Docsclisummarytypescriptserviceseffect5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptserviceseffect5 = /** @type {((inputs?: Docsclisummarytypescriptserviceseffect5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptserviceseffect5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptserviceseffect5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptserviceseffect5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptserviceseffect5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptserviceseffect5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptserviceseffect5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptserviceseffect5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptserviceseffect5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptserviceseffect5(inputs)
	return en_docsclisummarytypescriptserviceseffect5(inputs)
});
export { docsclisummarytypescriptserviceseffect5 as "docsCliSummaryTypescriptServicesEffect" }