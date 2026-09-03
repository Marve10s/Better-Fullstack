/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofstatusgradedlabel3Inputs */

const en_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks graded`)
};

const es_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tareas evaluadas`)
};

const zh_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已评测任务`)
};

const ja_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`採点済みタスク`)
};

const ko_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`채점한 태스크`)
};

const zh_hant1_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已評測任務`)
};

const de_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bewertete Aufgaben`)
};

const fr_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tâches évaluées`)
};

const uk_fixproofstatusgradedlabel3 = /** @type {(inputs: Fixproofstatusgradedlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Оцінено задач`)
};

/**
* | output |
* | --- |
* | "Tasks graded" |
*
* @param {Fixproofstatusgradedlabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofstatusgradedlabel3 = /** @type {((inputs?: Fixproofstatusgradedlabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofstatusgradedlabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofstatusgradedlabel3(inputs)
	if (locale === "zh") return zh_fixproofstatusgradedlabel3(inputs)
	if (locale === "ja") return ja_fixproofstatusgradedlabel3(inputs)
	if (locale === "ko") return ko_fixproofstatusgradedlabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofstatusgradedlabel3(inputs)
	if (locale === "de") return de_fixproofstatusgradedlabel3(inputs)
	if (locale === "fr") return fr_fixproofstatusgradedlabel3(inputs)
	if (locale === "uk") return uk_fixproofstatusgradedlabel3(inputs)
	return en_fixproofstatusgradedlabel3(inputs)
});
export { fixproofstatusgradedlabel3 as "fixproofStatusGradedLabel" }