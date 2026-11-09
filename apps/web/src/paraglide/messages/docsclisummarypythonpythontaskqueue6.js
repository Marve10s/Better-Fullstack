/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythontaskqueue6Inputs */



/**
* | output |
* | --- |
* | "Python task queue." |
*
* @param {Docsclisummarypythonpythontaskqueue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythontaskqueue6 = /** @type {((inputs?: Docsclisummarypythonpythontaskqueue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythontaskqueue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cola de tareas en Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 任务队列。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のタスクキュー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 작업 큐.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 工作佇列。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Aufgabenwarteschlange für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("File d’attente de tâches Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Черга завдань для Python.")
	return /** @type {LocalizedString} */ ("Python task queue.")
});
export { docsclisummarypythonpythontaskqueue6 as "docsCliSummaryPythonPythonTaskQueue" }