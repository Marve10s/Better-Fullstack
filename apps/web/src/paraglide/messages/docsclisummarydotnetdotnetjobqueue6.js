/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetjobqueue6Inputs */



/**
* | output |
* | --- |
* | ".NET background jobs." |
*
* @param {Docsclisummarydotnetdotnetjobqueue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetjobqueue6 = /** @type {((inputs?: Docsclisummarydotnetdotnetjobqueue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetjobqueue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Tareas en segundo plano en .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 后台任务。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のバックグラウンドジョブ。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 백그라운드 작업.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 背景工作。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Hintergrundaufgaben für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Tâches en arrière-plan .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фонові завдання в .NET.")
	return /** @type {LocalizedString} */ (".NET background jobs.")
});
export { docsclisummarydotnetdotnetjobqueue6 as "docsCliSummaryDotnetDotnetJobQueue" }