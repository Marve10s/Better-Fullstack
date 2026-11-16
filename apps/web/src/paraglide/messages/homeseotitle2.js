/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeseotitle2Inputs */



/**
* | output |
* | --- |
* | "Better Fullstack - Scaffold Production-Ready Fullstack Apps in Seconds" |
*
* @param {Homeseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeseotitle2 = /** @type {((inputs?: Homeseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Better Fullstack - Crea apps fullstack listas para producción en segundos")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Better Fullstack - 几秒内生成可用于生产的全栈应用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Better Fullstack - 本番環境に対応したフルスタックアプリを数秒でスキャフォールド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Better Fullstack - 몇 초 만에 프로덕션 준비가 완료된 풀스택 앱 스캐폴딩")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Better Fullstack - 幾秒內產生可用於生產的全端應用")
	if (locale === "de") return /** @type {LocalizedString} */ ("Better Fullstack – Erstellen Sie in Sekundenschnelle produktionsbereite Fullstack-Apps")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Better Fullstack - Échafaudez des applications Fullstack prêtes pour la production en quelques secondes")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Better Fullstack - фулстек-застосунки для продакшену за кілька секунд")
	return /** @type {LocalizedString} */ ("Better Fullstack - Scaffold Production-Ready Fullstack Apps in Seconds")
});
export { homeseotitle2 as "homeSeoTitle" }