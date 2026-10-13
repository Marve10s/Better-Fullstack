/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirjobs5Inputs */

const en_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir jobs.`)
};

const es_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tareas en Elixir.`)
};

const zh_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 后台任务。`)
};

const ja_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のジョブ。`)
};

const ko_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 작업.`)
};

const zh_hant1_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 背景工作。`)
};

const de_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aufgaben für Elixir.`)
};

const fr_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tâches Elixir.`)
};

const uk_docsclisummaryelixirelixirjobs5 = /** @type {(inputs: Docsclisummaryelixirelixirjobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Завдання в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir jobs." |
*
* @param {Docsclisummaryelixirelixirjobs5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirjobs5 = /** @type {((inputs?: Docsclisummaryelixirelixirjobs5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirjobs5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirjobs5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirjobs5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirjobs5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirjobs5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirjobs5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirjobs5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirjobs5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirjobs5(inputs)
	return en_docsclisummaryelixirelixirjobs5(inputs)
});
export { docsclisummaryelixirelixirjobs5 as "docsCliSummaryElixirElixirJobs" }