/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefresolvedindex3Inputs */

const en_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Difficulty-weighted share of tasks where every hidden check passed and no regression appeared. This is the headline number.`)
};

const es_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proporción ponderada por dificultad de las tareas en las que pasaron todas las comprobaciones ocultas y no apareció ninguna regresión. Es la cifra principal.`)
};

const zh_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有隐藏检查都通过且没有出现回归的任务占比，按难度加权。这是最核心的数字。`)
};

const ja_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべての非公開チェックに合格し、リグレッションも出なかったタスクの割合を、難易度で重み付けした値です。これが中心となる数値です。`)
};

const ko_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 비공개 검사를 통과하고 회귀가 없었던 태스크의 비율을 난이도로 가중한 값입니다. 이 페이지의 대표 수치입니다.`)
};

const zh_hant1_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有隱藏檢查都通過且沒有出現迴歸的任務占比，按難度加權。這是最核心的數字。`)
};

const de_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nach Schwierigkeit gewichteter Anteil der Aufgaben, bei denen jede verborgene Prüfung bestanden wurde und keine Regression auftrat. Das ist die zentrale Kennzahl.`)
};

const fr_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Part des tâches, pondérée par la difficulté, où toutes les vérifications cachées sont passées et où aucune régression n'est apparue. C'est le chiffre principal.`)
};

const uk_fixproofdefresolvedindex3 = /** @type {(inputs: Fixproofdefresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зважена за складністю частка задач, де пройшли всі приховані перевірки й не виникло регресій. Це головне число.`)
};

/**
* | output |
* | --- |
* | "Difficulty-weighted share of tasks where every hidden check passed and no regression appeared. This is the headline number." |
*
* @param {Fixproofdefresolvedindex3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefresolvedindex3 = /** @type {((inputs?: Fixproofdefresolvedindex3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefresolvedindex3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefresolvedindex3(inputs)
	if (locale === "zh") return zh_fixproofdefresolvedindex3(inputs)
	if (locale === "ja") return ja_fixproofdefresolvedindex3(inputs)
	if (locale === "ko") return ko_fixproofdefresolvedindex3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefresolvedindex3(inputs)
	if (locale === "de") return de_fixproofdefresolvedindex3(inputs)
	if (locale === "fr") return fr_fixproofdefresolvedindex3(inputs)
	if (locale === "uk") return uk_fixproofdefresolvedindex3(inputs)
	return en_fixproofdefresolvedindex3(inputs)
});
export { fixproofdefresolvedindex3 as "fixproofDefResolvedIndex" }