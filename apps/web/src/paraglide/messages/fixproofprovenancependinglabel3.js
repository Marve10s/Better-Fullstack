/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancependinglabel3Inputs */

const en_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Three tasks are pending`)
};

const es_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tres tareas están pendientes`)
};

const zh_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`三个任务待运行`)
};

const ja_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3 つのタスクは保留中です`)
};

const ko_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`세 태스크는 대기 중입니다`)
};

const zh_hant1_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`三個任務待執行`)
};

const de_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Drei Aufgaben stehen aus`)
};

const fr_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trois tâches sont en attente`)
};

const uk_fixproofprovenancependinglabel3 = /** @type {(inputs: Fixproofprovenancependinglabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Три задачі в очікуванні`)
};

/**
* | output |
* | --- |
* | "Three tasks are pending" |
*
* @param {Fixproofprovenancependinglabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancependinglabel3 = /** @type {((inputs?: Fixproofprovenancependinglabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancependinglabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancependinglabel3(inputs)
	if (locale === "zh") return zh_fixproofprovenancependinglabel3(inputs)
	if (locale === "ja") return ja_fixproofprovenancependinglabel3(inputs)
	if (locale === "ko") return ko_fixproofprovenancependinglabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancependinglabel3(inputs)
	if (locale === "de") return de_fixproofprovenancependinglabel3(inputs)
	if (locale === "fr") return fr_fixproofprovenancependinglabel3(inputs)
	if (locale === "uk") return uk_fixproofprovenancependinglabel3(inputs)
	return en_fixproofprovenancependinglabel3(inputs)
});
export { fixproofprovenancependinglabel3 as "fixproofProvenancePendingLabel" }