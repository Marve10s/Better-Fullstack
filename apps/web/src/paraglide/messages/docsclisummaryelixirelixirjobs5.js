/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirjobs5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Tareas en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 后台任务。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のジョブ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 작업.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 背景工作。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Aufgaben für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Tâches Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Завдання в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir jobs.")
});
export { docsclisummaryelixirelixirjobs5 as "docsCliSummaryElixirElixirJobs" }