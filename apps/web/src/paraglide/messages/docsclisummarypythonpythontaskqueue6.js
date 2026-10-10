/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythontaskqueue6Inputs */

const en_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python task queue.`)
};

const es_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cola de tareas en Python.`)
};

const zh_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 任务队列。`)
};

const ja_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のタスクキュー。`)
};

const ko_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 작업 큐.`)
};

const zh_hant1_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 工作佇列。`)
};

const de_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aufgabenwarteschlange für Python.`)
};

const fr_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`File d’attente de tâches Python.`)
};

const uk_docsclisummarypythonpythontaskqueue6 = /** @type {(inputs: Docsclisummarypythonpythontaskqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Черга завдань для Python.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythontaskqueue6(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythontaskqueue6(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythontaskqueue6(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythontaskqueue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythontaskqueue6(inputs)
	if (locale === "de") return de_docsclisummarypythonpythontaskqueue6(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythontaskqueue6(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythontaskqueue6(inputs)
	return en_docsclisummarypythonpythontaskqueue6(inputs)
});
export { docsclisummarypythonpythontaskqueue6 as "docsCliSummaryPythonPythonTaskQueue" }