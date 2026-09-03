/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancepending2Inputs */

const en_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They are simply not run yet. They sit outside both indexes and outside the graded count.`)
};

const es_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simplemente todavía no se han ejecutado. Quedan fuera de ambos índices y fuera del recuento de tareas evaluadas.`)
};

const zh_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`它们只是还没跑。它们不在两个指数里，也不在已评测的计数里。`)
};

const ja_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`まだ実行していないだけです。どちらの指数にも、採点済みの件数にも含まれません。`)
};

const ko_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`아직 실행하지 않았을 뿐입니다. 두 지수에도, 채점한 태스크 수에도 들어가지 않습니다.`)
};

const zh_hant1_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`它們只是還沒跑。它們不在兩個指數裡，也不在已評測的計數裡。`)
};

const de_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sie wurden schlicht noch nicht ausgeführt. Sie stehen außerhalb beider Indizes und außerhalb der Zahl der bewerteten Aufgaben.`)
};

const fr_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elles n'ont tout simplement pas encore été exécutées. Elles restent hors des deux indices et hors du décompte des tâches évaluées.`)
};

const uk_fixproofprovenancepending2 = /** @type {(inputs: Fixproofprovenancepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Їх просто ще не запускали. Вони поза обома індексами й поза лічильником оцінених задач.`)
};

/**
* | output |
* | --- |
* | "They are simply not run yet. They sit outside both indexes and outside the graded count." |
*
* @param {Fixproofprovenancepending2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancepending2 = /** @type {((inputs?: Fixproofprovenancepending2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancepending2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancepending2(inputs)
	if (locale === "zh") return zh_fixproofprovenancepending2(inputs)
	if (locale === "ja") return ja_fixproofprovenancepending2(inputs)
	if (locale === "ko") return ko_fixproofprovenancepending2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancepending2(inputs)
	if (locale === "de") return de_fixproofprovenancepending2(inputs)
	if (locale === "fr") return fr_fixproofprovenancepending2(inputs)
	if (locale === "uk") return uk_fixproofprovenancepending2(inputs)
	return en_fixproofprovenancepending2(inputs)
});
export { fixproofprovenancepending2 as "fixproofProvenancePending" }