/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesjobqueue6Inputs */

const en_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Background job / queue system.`)
};

const es_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sistema de tareas en segundo plano / colas.`)
};

const zh_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`后台任务 / 队列系统。`)
};

const ja_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バックグラウンドジョブ / キューシステム。`)
};

const ko_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백그라운드 작업 / 큐 시스템.`)
};

const zh_hant1_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`背景工作 / 佇列系統。`)
};

const de_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`System für Hintergrundaufgaben / Warteschlangen.`)
};

const fr_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Système de tâches en arrière-plan / files d’attente.`)
};

const uk_docsclisummarytypescriptservicesjobqueue6 = /** @type {(inputs: Docsclisummarytypescriptservicesjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Система фонових завдань / черг.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesjobqueue6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesjobqueue6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesjobqueue6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesjobqueue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesjobqueue6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesjobqueue6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesjobqueue6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesjobqueue6(inputs)
	return en_docsclisummarytypescriptservicesjobqueue6(inputs)
});
export { docsclisummarytypescriptservicesjobqueue6 as "docsCliSummaryTypescriptServicesJobQueue" }