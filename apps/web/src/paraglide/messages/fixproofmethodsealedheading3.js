/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodsealedheading3Inputs */

const en_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Why the tasks stay sealed`)
};

const es_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Por qué las tareas siguen selladas`)
};

const zh_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务为什么保持封闭`)
};

const ja_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タスクを封印しておく理由`)
};

const ko_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크를 봉인해 두는 이유`)
};

const zh_hant1_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任務為什麼保持封閉`)
};

const de_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Warum die Aufgaben versiegelt bleiben`)
};

const fr_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pourquoi les tâches restent scellées`)
};

const uk_fixproofmethodsealedheading3 = /** @type {(inputs: Fixproofmethodsealedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Чому задачі лишаються закритими`)
};

/**
* | output |
* | --- |
* | "Why the tasks stay sealed" |
*
* @param {Fixproofmethodsealedheading3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodsealedheading3 = /** @type {((inputs?: Fixproofmethodsealedheading3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodsealedheading3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodsealedheading3(inputs)
	if (locale === "zh") return zh_fixproofmethodsealedheading3(inputs)
	if (locale === "ja") return ja_fixproofmethodsealedheading3(inputs)
	if (locale === "ko") return ko_fixproofmethodsealedheading3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodsealedheading3(inputs)
	if (locale === "de") return de_fixproofmethodsealedheading3(inputs)
	if (locale === "fr") return fr_fixproofmethodsealedheading3(inputs)
	if (locale === "uk") return uk_fixproofmethodsealedheading3(inputs)
	return en_fixproofmethodsealedheading3(inputs)
});
export { fixproofmethodsealedheading3 as "fixproofMethodSealedHeading" }