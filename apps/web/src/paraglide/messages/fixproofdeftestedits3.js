/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdeftestedits3Inputs */

const en_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits the agent made to test files. The harness reverts them before grading.`)
};

const es_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambios que el agente hizo en archivos de prueba. El harness los revierte antes de evaluar.`)
};

const zh_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理对测试文件所做的改动。harness 会在评测前把它们还原。`)
};

const ja_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントがテストファイルに加えた変更です。ハーネスが採点前に差し戻します。`)
};

const ko_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트가 테스트 파일에 가한 수정입니다. 하네스가 채점 전에 되돌립니다.`)
};

const zh_hant1_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式對測試檔案所做的改動。harness 會在評測前把它們還原。`)
};

const de_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Änderungen, die der Agent an Testdateien vorgenommen hat. Das Harness setzt sie vor der Bewertung zurück.`)
};

const fr_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modifications que l'agent a apportées aux fichiers de test. Le harness les annule avant l'évaluation.`)
};

const uk_fixproofdeftestedits3 = /** @type {(inputs: Fixproofdeftestedits3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зміни, які агент вніс у файли тестів. Harness скасовує їх перед оцінюванням.`)
};

/**
* | output |
* | --- |
* | "Edits the agent made to test files. The harness reverts them before grading." |
*
* @param {Fixproofdeftestedits3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdeftestedits3 = /** @type {((inputs?: Fixproofdeftestedits3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdeftestedits3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdeftestedits3(inputs)
	if (locale === "zh") return zh_fixproofdeftestedits3(inputs)
	if (locale === "ja") return ja_fixproofdeftestedits3(inputs)
	if (locale === "ko") return ko_fixproofdeftestedits3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdeftestedits3(inputs)
	if (locale === "de") return de_fixproofdeftestedits3(inputs)
	if (locale === "fr") return fr_fixproofdeftestedits3(inputs)
	if (locale === "uk") return uk_fixproofdeftestedits3(inputs)
	return en_fixproofdeftestedits3(inputs)
});
export { fixproofdeftestedits3 as "fixproofDefTestEdits" }