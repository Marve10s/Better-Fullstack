/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystaljobs5Inputs */

const en_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimental Crystal background jobs.`)
};

const es_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trabajos en segundo plano experimentales de Crystal.`)
};

const zh_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实验性 Crystal 后台任务。`)
};

const ja_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実験的な Crystal バックグラウンドジョブ。`)
};

const ko_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험적인 Crystal 백그라운드 작업입니다.`)
};

const zh_hant1_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`實驗性 Crystal 背景工作。`)
};

const de_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimentelle Crystal-Hintergrundjobs.`)
};

const fr_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tâches d'arrière-plan expérimentales pour Crystal.`)
};

const uk_docsclisummarycrystalcrystaljobs5 = /** @type {(inputs: Docsclisummarycrystalcrystaljobs5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Експериментальні фонові завдання Crystal.`)
};

/**
* | output |
* | --- |
* | "Experimental Crystal background jobs." |
*
* @param {Docsclisummarycrystalcrystaljobs5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystaljobs5 = /** @type {((inputs?: Docsclisummarycrystalcrystaljobs5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystaljobs5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycrystalcrystaljobs5(inputs)
	if (locale === "zh") return zh_docsclisummarycrystalcrystaljobs5(inputs)
	if (locale === "ja") return ja_docsclisummarycrystalcrystaljobs5(inputs)
	if (locale === "ko") return ko_docsclisummarycrystalcrystaljobs5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycrystalcrystaljobs5(inputs)
	if (locale === "de") return de_docsclisummarycrystalcrystaljobs5(inputs)
	if (locale === "fr") return fr_docsclisummarycrystalcrystaljobs5(inputs)
	if (locale === "uk") return uk_docsclisummarycrystalcrystaljobs5(inputs)
	return en_docsclisummarycrystalcrystaljobs5(inputs)
});
export { docsclisummarycrystalcrystaljobs5 as "docsCliSummaryCrystalCrystalJobs" }