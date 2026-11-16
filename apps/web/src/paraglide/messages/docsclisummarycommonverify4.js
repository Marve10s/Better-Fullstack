/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonverify4Inputs */



/**
* | output |
* | --- |
* | "Run generated checks after scaffolding where supported." |
*
* @param {Docsclisummarycommonverify4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonverify4 = /** @type {((inputs?: Docsclisummarycommonverify4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonverify4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecutar las comprobaciones generadas tras crear la estructura del proyecto, donde se admita.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在支持的情况下，生成项目后运行生成的检查。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("対応している場合、スキャフォールド後に生成されたチェックを実行します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("지원되는 경우 스캐폴딩 후 생성된 검사를 실행합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在支援的情況下，產生專案後執行產生的檢查。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Generierte Prüfungen nach der Erstellung des Projektgerüsts ausführen, sofern unterstützt.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécuter les vérifications générées après la génération du projet, si cette fonction est prise en charge.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запустити згенеровані перевірки після створення каркаса проєкту, якщо це підтримується.")
	return /** @type {LocalizedString} */ ("Run generated checks after scaffolding where supported.")
});
export { docsclisummarycommonverify4 as "docsCliSummaryCommonVerify" }