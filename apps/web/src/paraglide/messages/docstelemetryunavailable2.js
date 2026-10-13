/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetryunavailable2Inputs */

const en_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser analytics preferences are unavailable in this environment.`)
};

const es_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las preferencias de analítica del navegador no están disponibles en este entorno.`)
};

const zh_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前环境无法使用浏览器分析偏好设置。`)
};

const ja_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`この環境ではブラウザ分析の設定を利用できません。`)
};

const ko_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 환경에서는 브라우저 분석 설정을 사용할 수 없습니다.`)
};

const zh_hant1_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此環境無法使用瀏覽器分析偏好設定。`)
};

const de_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Einstellungen für Browser-Analysen sind in dieser Umgebung nicht verfügbar.`)
};

const fr_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les préférences d'analyse du navigateur ne sont pas disponibles dans cet environnement.`)
};

const uk_docstelemetryunavailable2 = /** @type {(inputs: Docstelemetryunavailable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштування аналітики браузера недоступні в цьому середовищі.`)
};

/**
* | output |
* | --- |
* | "Browser analytics preferences are unavailable in this environment." |
*
* @param {Docstelemetryunavailable2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetryunavailable2 = /** @type {((inputs?: Docstelemetryunavailable2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetryunavailable2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docstelemetryunavailable2(inputs)
	if (locale === "zh") return zh_docstelemetryunavailable2(inputs)
	if (locale === "ja") return ja_docstelemetryunavailable2(inputs)
	if (locale === "ko") return ko_docstelemetryunavailable2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docstelemetryunavailable2(inputs)
	if (locale === "de") return de_docstelemetryunavailable2(inputs)
	if (locale === "fr") return fr_docstelemetryunavailable2(inputs)
	if (locale === "uk") return uk_docstelemetryunavailable2(inputs)
	return en_docstelemetryunavailable2(inputs)
});
export { docstelemetryunavailable2 as "docsTelemetryUnavailable" }