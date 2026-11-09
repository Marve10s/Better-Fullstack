/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonecosystem4Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ecosistema de lenguaje o entorno de ejecución para el proyecto que se va a generar.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("要生成的语言/运行时生态。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スキャフォールドする言語/ランタイムのエコシステム。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스캐폴딩할 언어/런타임 생태계.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("要產生的語言或執行環境生態系。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Sprach- oder Laufzeitökosystem für das Projektgerüst.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Écosystème de langage ou d’environnement d’exécution pour le projet à générer.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Екосистема мови або середовища виконання для створення каркаса проєкту.")
	return /** @type {LocalizedString} */ ("Language/runtime ecosystem to scaffold.")
});
export { docsclisummarycommonecosystem4 as "docsCliSummaryCommonEcosystem" }