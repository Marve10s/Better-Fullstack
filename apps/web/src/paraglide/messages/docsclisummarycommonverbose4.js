/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonverbose4Inputs */

const en_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Print detailed scaffold output.`)
};

const es_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mostrar la salida detallada de la generación del proyecto.`)
};

const zh_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输出详细的生成日志。`)
};

const ja_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スキャフォールドの詳細な出力を表示します。`)
};

const ko_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스캐폴딩 출력을 자세히 표시합니다.`)
};

const zh_hant1_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`輸出詳細的專案產生日誌。`)
};

const de_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Detaillierte Ausgabe zur Erstellung des Projektgerüsts anzeigen.`)
};

const fr_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Afficher les détails de la génération du projet.`)
};

const uk_docsclisummarycommonverbose4 = /** @type {(inputs: Docsclisummarycommonverbose4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вивести докладні відомості про створення каркаса проєкту.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonverbose4(inputs)
	if (locale === "zh") return zh_docsclisummarycommonverbose4(inputs)
	if (locale === "ja") return ja_docsclisummarycommonverbose4(inputs)
	if (locale === "ko") return ko_docsclisummarycommonverbose4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonverbose4(inputs)
	if (locale === "de") return de_docsclisummarycommonverbose4(inputs)
	if (locale === "fr") return fr_docsclisummarycommonverbose4(inputs)
	if (locale === "uk") return uk_docsclisummarycommonverbose4(inputs)
	return en_docsclisummarycommonverbose4(inputs)
});
export { docsclisummarycommonverbose4 as "docsCliSummaryCommonVerbose" }