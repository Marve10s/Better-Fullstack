/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyjobqueue6Inputs */

const en_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby background job queue.`)
};

const es_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cola de trabajos en segundo plano de Ruby.`)
};

const zh_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 后台任务队列。`)
};

const ja_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby のバックグラウンドジョブキュー。`)
};

const ko_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 백그라운드 작업 큐.`)
};

const zh_hant1_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 背景工作佇列。`)
};

const de_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-Hintergrundjob-Warteschlange.`)
};

const fr_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`File de tâches en arrière-plan Ruby.`)
};

const uk_docsclisummaryrubyrubyjobqueue6 = /** @type {(inputs: Docsclisummaryrubyrubyjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Черга фонових завдань Ruby.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubyjobqueue6(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubyjobqueue6(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubyjobqueue6(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubyjobqueue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubyjobqueue6(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubyjobqueue6(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubyjobqueue6(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubyjobqueue6(inputs)
	return en_docsclisummaryrubyrubyjobqueue6(inputs)
});
export { docsclisummaryrubyrubyjobqueue6 as "docsCliSummaryRubyRubyJobQueue" }