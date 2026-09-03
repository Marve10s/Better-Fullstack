/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep32Inputs */

const en_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When the agent stops, the harness reverts every edit it made to test files.`)
};

const es_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cuando el agente para, el harness revierte todos los cambios que hizo en archivos de prueba.`)
};

const zh_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理停止后，harness 会还原它对测试文件做的每一处改动。`)
};

const ja_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントが停止すると、ハーネスはテストファイルへの変更をすべて差し戻します。`)
};

const ko_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트가 멈추면 하네스가 테스트 파일에 가한 수정을 모두 되돌립니다.`)
};

const zh_hant1_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式停止後，harness 會還原它對測試檔案做的每一處改動。`)
};

const de_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wenn der Agent stoppt, setzt das Harness jede Änderung zurück, die er an Testdateien vorgenommen hat.`)
};

const fr_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quand l'agent s'arrête, le harness annule toutes les modifications qu'il a faites dans les fichiers de test.`)
};

const uk_fixproofprovenancestep32 = /** @type {(inputs: Fixproofprovenancestep32Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Коли агент зупиняється, harness скасовує кожну його зміну у файлах тестів.`)
};

/**
* | output |
* | --- |
* | "When the agent stops, the harness reverts every edit it made to test files." |
*
* @param {Fixproofprovenancestep32Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep32 = /** @type {((inputs?: Fixproofprovenancestep32Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep32Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep32(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep32(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep32(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep32(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep32(inputs)
	if (locale === "de") return de_fixproofprovenancestep32(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep32(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep32(inputs)
	return en_fixproofprovenancestep32(inputs)
});
export { fixproofprovenancestep32 as "fixproofProvenanceStep3" }