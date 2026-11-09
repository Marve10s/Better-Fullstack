/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetryunavailable2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Las preferencias de analítica del navegador no están disponibles en este entorno.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("当前环境无法使用浏览器分析偏好设置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("この環境ではブラウザ分析の設定を利用できません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 환경에서는 브라우저 분석 설정을 사용할 수 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("此環境無法使用瀏覽器分析偏好設定。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Einstellungen für Browser-Analysen sind in dieser Umgebung nicht verfügbar.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les préférences d'analyse du navigateur ne sont pas disponibles dans cet environnement.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштування аналітики браузера недоступні в цьому середовищі.")
	return /** @type {LocalizedString} */ ("Browser analytics preferences are unavailable in this environment.")
});
export { docstelemetryunavailable2 as "docsTelemetryUnavailable" }