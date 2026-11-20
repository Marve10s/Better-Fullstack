/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationopenci3Inputs */



/**
* | output |
* | --- |
* | "Open required CI run" |
*
* @param {Docsverificationopenci3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationopenci3 = /** @type {((inputs?: Docsverificationopenci3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationopenci3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir la ejecución de CI obligatoria")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开必需的 CI 运行")
	if (locale === "ja") return /** @type {LocalizedString} */ ("必須の CI 実行を開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("필수 CI 실행 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟必要的 CI 執行")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erforderlichen CI-Lauf öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir l'exécution CI requise")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити обовʼязковий запуск CI")
	return /** @type {LocalizedString} */ ("Open required CI run")
});
export { docsverificationopenci3 as "docsVerificationOpenCi" }