/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefregressions2Inputs */

const en_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Graded runs where the package's existing test suite stopped passing. A dash means at least one graded run has no regression result.`)
};

const es_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuciones evaluadas en las que la suite de pruebas existente del paquete dejó de pasar. Un guion indica que al menos una ejecución evaluada no tiene un resultado de regresiones.`)
};

const zh_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`评测运行中，包自带的测试套件不再通过的那些。 短横线表示至少一次已评测运行的回归结果未知。`)
};

const ja_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`パッケージ既存のテストスイートが通らなくなった採点済みの実行です。 ダッシュは、採点済みの実行のうち少なくとも1件でリグレッションの結果が不明であることを示します。`)
};

const ko_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`패키지의 기존 테스트 스위트가 더 이상 통과하지 않게 된 채점 실행입니다. 대시는 채점된 실행 중 하나 이상에서 회귀 결과를 알 수 없음을 뜻합니다.`)
};

const zh_hant1_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`評測執行中，套件自帶的測試套件不再通過的那些。 短橫線表示至少一次已評測執行的迴歸結果未知。`)
};

const de_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bewertete Läufe, in denen die vorhandene Test-Suite des Pakets nicht mehr bestanden wurde. Ein Strich bedeutet, dass für mindestens einen bewerteten Lauf kein Regressionsergebnis vorliegt.`)
};

const fr_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutions évaluées où la suite de tests existante du paquet a cessé de passer. Un tiret indique qu’au moins une exécution évaluée n’a pas de résultat de régression.`)
};

const uk_fixproofdefregressions2 = /** @type {(inputs: Fixproofdefregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Оцінені запуски, де наявний набір тестів пакета перестав проходити. Риска означає, що принаймні для одного оціненого запуску немає результату перевірки регресій.`)
};

/**
* | output |
* | --- |
* | "Graded runs where the package's existing test suite stopped passing. A dash means at least one graded run has no regression result." |
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