/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonecosystem4Inputs */

const en_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Language/runtime ecosystem to scaffold.`)
};

const es_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosistema de lenguaje o entorno de ejecución para el proyecto que se va a generar.`)
};

const zh_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要生成的语言/运行时生态。`)
};

const ja_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スキャフォールドする言語/ランタイムのエコシステム。`)
};

const ko_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스캐폴딩할 언어/런타임 생태계.`)
};

const zh_hant1_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要產生的語言或執行環境生態系。`)
};

const de_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sprach- oder Laufzeitökosystem für das Projektgerüst.`)
};

const fr_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Écosystème de langage ou d’environnement d’exécution pour le projet à générer.`)
};

const uk_docsclisummarycommonecosystem4 = /** @type {(inputs: Docsclisummarycommonecosystem4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Екосистема мови або середовища виконання для створення каркаса проєкту.`)
};

/**
* | output |
* | --- |
* | "Language/runtime ecosystem to scaffold." |
*
* @param {Docsclisummarycommonecosystem4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonecosystem4 = /** @type {((inputs?: Docsclisummarycommonecosystem4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonecosystem4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonecosystem4(inputs)
	if (locale === "zh") return zh_docsclisummarycommonecosystem4(inputs)
	if (locale === "ja") return ja_docsclisummarycommonecosystem4(inputs)
	if (locale === "ko") return ko_docsclisummarycommonecosystem4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonecosystem4(inputs)
	if (locale === "de") return de_docsclisummarycommonecosystem4(inputs)
	if (locale === "fr") return fr_docsclisummarycommonecosystem4(inputs)
	if (locale === "uk") return uk_docsclisummarycommonecosystem4(inputs)
	return en_docsclisummarycommonecosystem4(inputs)
});
export { docsclisummarycommonecosystem4 as "docsCliSummaryCommonEcosystem" }