/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesjobqueue6Inputs */



/**
* | output |
* | --- |
* | "Background job / queue system." |
*
* @param {Docsclisummarytypescriptservicesjobqueue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesjobqueue6 = /** @type {((inputs?: Docsclisummarytypescriptservicesjobqueue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesjobqueue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Sistema de tareas en segundo plano / colas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("后台任务 / 队列系统。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("バックグラウンドジョブ / キューシステム。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("백그라운드 작업 / 큐 시스템.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("背景工作 / 佇列系統。")
	if (locale === "de") return /** @type {LocalizedString} */ ("System für Hintergrundaufgaben / Warteschlangen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Système de tâches en arrière-plan / files d’attente.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Система фонових завдань / черг.")
	return /** @type {LocalizedString} */ ("Background job / queue system.")
});
export { docsclisummarytypescriptservicesjobqueue6 as "docsCliSummaryTypescriptServicesJobQueue" }