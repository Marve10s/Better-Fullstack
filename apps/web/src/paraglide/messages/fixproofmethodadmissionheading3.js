/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodadmissionheading3Inputs */

const en_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How a task is admitted`)
};

const es_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cómo se admite una tarea`)
};

const zh_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务如何被收录`)
};

const ja_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タスクの採用基準`)
};

const ko_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크를 받아들이는 기준`)
};

const zh_hant1_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任務如何被收錄`)
};

const de_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wie eine Aufgabe aufgenommen wird`)
};

const fr_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comment une tâche est admise`)
};

const uk_fixproofmethodadmissionheading3 = /** @type {(inputs: Fixproofmethodadmissionheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Як задача потрапляє в набір`)
};

/**
* | output |
* | --- |
* | "How a task is admitted" |
*
* @param {Fixproofmethodadmissionheading3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodadmissionheading3 = /** @type {((inputs?: Fixproofmethodadmissionheading3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodadmissionheading3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodadmissionheading3(inputs)
	if (locale === "zh") return zh_fixproofmethodadmissionheading3(inputs)
	if (locale === "ja") return ja_fixproofmethodadmissionheading3(inputs)
	if (locale === "ko") return ko_fixproofmethodadmissionheading3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodadmissionheading3(inputs)
	if (locale === "de") return de_fixproofmethodadmissionheading3(inputs)
	if (locale === "fr") return fr_fixproofmethodadmissionheading3(inputs)
	if (locale === "uk") return uk_fixproofmethodadmissionheading3(inputs)
	return en_fixproofmethodadmissionheading3(inputs)
});
export { fixproofmethodadmissionheading3 as "fixproofMethodAdmissionHeading" }