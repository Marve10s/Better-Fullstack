/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpjobqueue6Inputs */

const en_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP background job queue.`)
};

const es_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cola de trabajos en segundo plano de PHP.`)
};

const zh_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 后台任务队列。`)
};

const ja_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP のバックグラウンドジョブキュー。`)
};

const ko_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 백그라운드 작업 큐.`)
};

const zh_hant1_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 背景工作佇列。`)
};

const de_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-Warteschlange für Hintergrundjobs.`)
};

const fr_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`File de tâches en arrière-plan PHP.`)
};

const uk_docsclisummaryphpphpjobqueue6 = /** @type {(inputs: Docsclisummaryphpphpjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Черга фонових завдань PHP.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphpjobqueue6(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphpjobqueue6(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphpjobqueue6(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphpjobqueue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphpjobqueue6(inputs)
	if (locale === "de") return de_docsclisummaryphpphpjobqueue6(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphpjobqueue6(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphpjobqueue6(inputs)
	return en_docsclisummaryphpphpjobqueue6(inputs)
});
export { docsclisummaryphpphpjobqueue6 as "docsCliSummaryPhpPhpJobQueue" }