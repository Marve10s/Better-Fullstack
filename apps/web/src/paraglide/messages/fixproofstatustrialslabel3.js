/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofstatustrialslabel3Inputs */

const en_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trials per task`)
};

const es_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Intentos por tarea`)
};

const zh_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个任务的试验次数`)
};

const ja_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タスクあたりの試行数`)
};

const ko_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크당 시도`)
};

const zh_hant1_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個任務的試驗次數`)
};

const de_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Versuche pro Aufgabe`)
};

const fr_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Essais par tâche`)
};

const uk_fixproofstatustrialslabel3 = /** @type {(inputs: Fixproofstatustrialslabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спроб на задачу`)
};

/**
* | output |
* | --- |
* | "Trials per task" |
*
* @param {Fixproofstatustrialslabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofstatustrialslabel3 = /** @type {((inputs?: Fixproofstatustrialslabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofstatustrialslabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofstatustrialslabel3(inputs)
	if (locale === "zh") return zh_fixproofstatustrialslabel3(inputs)
	if (locale === "ja") return ja_fixproofstatustrialslabel3(inputs)
	if (locale === "ko") return ko_fixproofstatustrialslabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofstatustrialslabel3(inputs)
	if (locale === "de") return de_fixproofstatustrialslabel3(inputs)
	if (locale === "fr") return fr_fixproofstatustrialslabel3(inputs)
	if (locale === "uk") return uk_fixproofstatustrialslabel3(inputs)
	return en_fixproofstatustrialslabel3(inputs)
});
export { fixproofstatustrialslabel3 as "fixproofStatusTrialsLabel" }