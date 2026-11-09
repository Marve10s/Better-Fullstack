/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpjobqueue6Inputs */



/**
* | output |
* | --- |
* | "PHP background job queue." |
*
* @param {Docsclisummaryphpphpjobqueue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpjobqueue6 = /** @type {((inputs?: Docsclisummaryphpphpjobqueue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpjobqueue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cola de trabajos en segundo plano de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP 后台任务队列。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP のバックグラウンドジョブキュー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP 백그라운드 작업 큐.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP 背景工作佇列。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-Warteschlange für Hintergrundjobs.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("File de tâches en arrière-plan PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Черга фонових завдань PHP.")
	return /** @type {LocalizedString} */ ("PHP background job queue.")
});
export { docsclisummaryphpphpjobqueue6 as "docsCliSummaryPhpPhpJobQueue" }