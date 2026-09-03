/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefregressions2Inputs */

const en_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing.`)
};

const es_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuciones evaluadas en las que la suite de pruebas existente del paquete dejó de pasar.`)
};

const zh_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`评测运行中，包自带的测试套件不再通过的那些。`)
};

const ja_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`パッケージ既存のテストスイートが通らなくなった採点済みの実行です。`)
};

const ko_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`패키지의 기존 테스트 스위트가 더 이상 통과하지 않게 된 채점 실행입니다.`)
};

const zh_hant1_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`評測執行中，套件自帶的測試套件不再通過的那些。`)
};

const de_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bewertete Läufe, in denen die vorhandene Test-Suite des Pakets nicht mehr bestanden wurde.`)
};

const fr_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutions évaluées où la suite de tests existante du paquet a cessé de passer.`)
};

const uk_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Оцінені запуски, де наявний набір тестів пакета перестав проходити.`)
};

/**
* | output |
* | --- |
* | "Graded runs where the package's existing test suite stopped passing." |
*
* @param {Fixproofdefregressions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefregressions2 = /** @type {((inputs?: Fixproofdefregressions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefregressions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefregressions2(inputs)
	if (locale === "zh") return zh_fixproofdefregressions2(inputs)
	if (locale === "ja") return ja_fixproofdefregressions2(inputs)
	if (locale === "ko") return ko_fixproofdefregressions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefregressions2(inputs)
	if (locale === "de") return de_fixproofdefregressions2(inputs)
	if (locale === "fr") return fr_fixproofdefregressions2(inputs)
	if (locale === "uk") return uk_fixproofdefregressions2(inputs)
	return en_fixproofdefregressions2(inputs)
});
export { fixproofdefregressions2 as "fixproofDefRegressions" }