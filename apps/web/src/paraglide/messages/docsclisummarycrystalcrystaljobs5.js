/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystaljobs5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Trabajos en segundo plano experimentales de Crystal.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实验性 Crystal 后台任务。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実験的な Crystal バックグラウンドジョブ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실험적인 Crystal 백그라운드 작업입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("實驗性 Crystal 背景工作。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Experimentelle Crystal-Hintergrundjobs.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Tâches d'arrière-plan expérimentales pour Crystal.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Експериментальні фонові завдання Crystal.")
	return /** @type {LocalizedString} */ ("Experimental Crystal background jobs.")
});
export { docsclisummarycrystalcrystaljobs5 as "docsCliSummaryCrystalCrystalJobs" }