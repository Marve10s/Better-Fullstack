/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonverify4Inputs */

const en_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run generated checks after scaffolding where supported.`)
};

const es_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecutar las comprobaciones generadas tras crear la estructura del proyecto, donde se admita.`)
};

const zh_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在支持的情况下，生成项目后运行生成的检查。`)
};

const ja_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`対応している場合、スキャフォールド後に生成されたチェックを実行します。`)
};

const ko_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`지원되는 경우 스캐폴딩 후 생성된 검사를 실행합니다.`)
};

const zh_hant1_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在支援的情況下，產生專案後執行產生的檢查。`)
};

const de_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generierte Prüfungen nach der Erstellung des Projektgerüsts ausführen, sofern unterstützt.`)
};

const fr_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécuter les vérifications générées après la génération du projet, si cette fonction est prise en charge.`)
};

const uk_docsclisummarycommonverify4 = /** @type {(inputs: Docsclisummarycommonverify4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустити згенеровані перевірки після створення каркаса проєкту, якщо це підтримується.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonverify4(inputs)
	if (locale === "zh") return zh_docsclisummarycommonverify4(inputs)
	if (locale === "ja") return ja_docsclisummarycommonverify4(inputs)
	if (locale === "ko") return ko_docsclisummarycommonverify4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonverify4(inputs)
	if (locale === "de") return de_docsclisummarycommonverify4(inputs)
	if (locale === "fr") return fr_docsclisummarycommonverify4(inputs)
	if (locale === "uk") return uk_docsclisummarycommonverify4(inputs)
	return en_docsclisummarycommonverify4(inputs)
});
export { docsclisummarycommonverify4 as "docsCliSummaryCommonVerify" }