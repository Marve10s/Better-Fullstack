/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyjobqueue6Inputs */



/**
* | output |
* | --- |
* | "Ruby background job queue." |
*
* @param {Docsclisummaryrubyrubyjobqueue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubyjobqueue6 = /** @type {((inputs?: Docsclisummaryrubyrubyjobqueue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubyjobqueue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cola de trabajos en segundo plano de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby 后台任务队列。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby のバックグラウンドジョブキュー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby 백그라운드 작업 큐.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby 背景工作佇列。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-Hintergrundjob-Warteschlange.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("File de tâches en arrière-plan Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Черга фонових завдань Ruby.")
	return /** @type {LocalizedString} */ ("Ruby background job queue.")
});
export { docsclisummaryrubyrubyjobqueue6 as "docsCliSummaryRubyRubyJobQueue" }