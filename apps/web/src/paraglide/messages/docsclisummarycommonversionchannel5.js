/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonversionchannel5Inputs */

const en_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dependency version channel.`)
};

const es_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Canal de versiones de las dependencias.`)
};

const zh_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依赖版本通道。`)
};

const ja_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依存関係のバージョンチャネル。`)
};

const ko_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`의존성 버전 채널.`)
};

const zh_hant1_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`相依套件的版本通道。`)
};

const de_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Versionskanal für Abhängigkeiten.`)
};

const fr_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Canal de versions des dépendances.`)
};

const uk_docsclisummarycommonversionchannel5 = /** @type {(inputs: Docsclisummarycommonversionchannel5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Канал версій залежностей.`)
};

/**
* | output |
* | --- |
* | "Dependency version channel." |
*
* @param {Docsclisummarycommonversionchannel5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonversionchannel5 = /** @type {((inputs?: Docsclisummarycommonversionchannel5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonversionchannel5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonversionchannel5(inputs)
	if (locale === "zh") return zh_docsclisummarycommonversionchannel5(inputs)
	if (locale === "ja") return ja_docsclisummarycommonversionchannel5(inputs)
	if (locale === "ko") return ko_docsclisummarycommonversionchannel5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonversionchannel5(inputs)
	if (locale === "de") return de_docsclisummarycommonversionchannel5(inputs)
	if (locale === "fr") return fr_docsclisummarycommonversionchannel5(inputs)
	if (locale === "uk") return uk_docsclisummarycommonversionchannel5(inputs)
	return en_docsclisummarycommonversionchannel5(inputs)
});
export { docsclisummarycommonversionchannel5 as "docsCliSummaryCommonVersionChannel" }