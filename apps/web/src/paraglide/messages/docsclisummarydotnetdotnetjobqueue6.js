/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetjobqueue6Inputs */

const en_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET background jobs.`)
};

const es_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tareas en segundo plano en .NET.`)
};

const zh_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 后台任务。`)
};

const ja_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のバックグラウンドジョブ。`)
};

const ko_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 백그라운드 작업.`)
};

const zh_hant1_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 背景工作。`)
};

const de_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hintergrundaufgaben für .NET.`)
};

const fr_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tâches en arrière-plan .NET.`)
};

const uk_docsclisummarydotnetdotnetjobqueue6 = /** @type {(inputs: Docsclisummarydotnetdotnetjobqueue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Фонові завдання в .NET.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetjobqueue6(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetjobqueue6(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetjobqueue6(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetjobqueue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetjobqueue6(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetjobqueue6(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetjobqueue6(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetjobqueue6(inputs)
	return en_docsclisummarydotnetdotnetjobqueue6(inputs)
});
export { docsclisummarydotnetdotnetjobqueue6 as "docsCliSummaryDotnetDotnetJobQueue" }