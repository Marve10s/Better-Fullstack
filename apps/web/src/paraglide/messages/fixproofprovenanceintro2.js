/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenanceintro2Inputs */

const en_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated.`)
};

const es_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada cifra de esta página sale de una ejecución registrada. Aquí no hay nada puntuado a mano ni estimado.`)
};

const zh_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本页的每个数字都来自一次记录在案的运行。这里没有任何人工打分或估算。`)
};

const ja_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このページの数値はすべて、記録された実行から得たものです。手作業での採点や推定は含みません。`)
};

const ko_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 페이지의 모든 수치는 기록된 실행에서 나옵니다. 손으로 매기거나 추정한 값은 없습니다.`)
};

const zh_hant1_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本頁的每個數字都來自一次記錄在案的執行。這裡沒有任何人工評分或估算。`)
};

const de_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jede Zahl auf dieser Seite stammt aus einem aufgezeichneten Lauf. Nichts hier ist von Hand bewertet oder geschätzt.`)
};

const fr_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chaque chiffre de cette page sort d'une exécution enregistrée. Rien ici n'est noté à la main ni estimé.`)
};

const uk_fixproofprovenanceintro2 = /** @type {(inputs: Fixproofprovenanceintro2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кожне число на цій сторінці походить із записаного запуску. Тут немає нічого оціненого вручну чи приблизного.`)
};

/**
* | output |
* | --- |
* | "Every number on this page comes out of a recorded run. Nothing here is hand-scored or estimated." |
*
* @param {Fixproofprovenanceintro2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenanceintro2 = /** @type {((inputs?: Fixproofprovenanceintro2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenanceintro2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenanceintro2(inputs)
	if (locale === "zh") return zh_fixproofprovenanceintro2(inputs)
	if (locale === "ja") return ja_fixproofprovenanceintro2(inputs)
	if (locale === "ko") return ko_fixproofprovenanceintro2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenanceintro2(inputs)
	if (locale === "de") return de_fixproofprovenanceintro2(inputs)
	if (locale === "fr") return fr_fixproofprovenanceintro2(inputs)
	if (locale === "uk") return uk_fixproofprovenanceintro2(inputs)
	return en_fixproofprovenanceintro2(inputs)
});
export { fixproofprovenanceintro2 as "fixproofProvenanceIntro" }