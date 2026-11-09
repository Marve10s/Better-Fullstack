/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonverbose4Inputs */



/**
* | output |
* | --- |
* | "Print detailed scaffold output." |
*
* @param {Docsclisummarycommonverbose4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonverbose4 = /** @type {((inputs?: Docsclisummarycommonverbose4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonverbose4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Mostrar la salida detallada de la generación del proyecto.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("输出详细的生成日志。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スキャフォールドの詳細な出力を表示します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스캐폴딩 출력을 자세히 표시합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("輸出詳細的專案產生日誌。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Detaillierte Ausgabe zur Erstellung des Projektgerüsts anzeigen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Afficher les détails de la génération du projet.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вивести докладні відомості про створення каркаса проєкту.")
	return /** @type {LocalizedString} */ ("Print detailed scaffold output.")
});
export { docsclisummarycommonverbose4 as "docsCliSummaryCommonVerbose" }