/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep52Inputs */

const en_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time.`)
};

const es_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El harness registra el resultado, las comprobaciones superadas, cualquier regresión, los cambios revertidos en pruebas y el tiempo real transcurrido.`)
};

const zh_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`harness 记录结果、通过的检查、出现的回归、被还原的测试改动以及实际耗时。`)
};

const ja_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ハーネスは結果、合格したチェック、リグレッション、差し戻したテスト変更、実時間を記録します。`)
};

const ko_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`하네스가 결과, 통과한 검사, 회귀, 되돌린 테스트 수정, 실제 소요 시간을 기록합니다.`)
};

const zh_hant1_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`harness 記錄結果、通過的檢查、出現的迴歸、被還原的測試改動以及實際耗時。`)
};

const de_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Das Harness protokolliert das Ergebnis, die bestandenen Prüfungen, jede Regression, die zurückgesetzten Test-Änderungen und die verstrichene Zeit.`)
};

const fr_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le harness enregistre le résultat, les vérifications passées, toute régression, les modifications de tests annulées et le temps réel écoulé.`)
};

const uk_fixproofprovenancestep52 = /** @type {(inputs: Fixproofprovenancestep52Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness записує результат, пройдені перевірки, будь-яку регресію, скасовані зміни в тестах і реальний час роботи.`)
};

/**
* | output |
* | --- |
* | "The harness records the outcome, the checks that passed, any regression, the reverted test edits and the wall-clock time." |
*
* @param {Fixproofprovenancestep52Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep52 = /** @type {((inputs?: Fixproofprovenancestep52Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep52Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep52(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep52(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep52(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep52(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep52(inputs)
	if (locale === "de") return de_fixproofprovenancestep52(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep52(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep52(inputs)
	return en_fixproofprovenancestep52(inputs)
});
export { fixproofprovenancestep52 as "fixproofProvenanceStep5" }