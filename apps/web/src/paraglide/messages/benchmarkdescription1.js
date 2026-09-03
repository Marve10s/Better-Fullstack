/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Benchmarkdescription1Inputs */

const en_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const es_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof evalúa agentes de programación con errores reales y sellados de bases de código privadas, verificados por pruebas ocultas.`)
};

const zh_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof 用来自私有代码库的封闭真实问题评测编程代理，并由隐藏测试验证。`)
};

const ja_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof は、非公開コードベースから集めた封印済みの実際の不具合でコーディングエージェントを採点し、非公開テストで検証します。`)
};

const ko_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof는 비공개 코드베이스에서 가져온 봉인된 실제 이슈로 코딩 에이전트를 채점하고, 비공개 테스트로 검증합니다.`)
};

const zh_hant1_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof 用來自私有程式碼庫的封閉真實問題評測程式代理程式，並由隱藏測試驗證。`)
};

const de_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof bewertet Coding-Agenten an versiegelten, echten Fehlern aus privaten Codebasen, verifiziert durch verborgene Tests.`)
};

const fr_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof évalue les agents de codage sur des bugs réels et scellés issus de bases de code privées, vérifiés par des tests cachés.`)
};

const uk_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof оцінює агентів для коду на закритих реальних помилках із приватних кодових баз, перевірених прихованими тестами.`)
};

/**
* | output |
* | --- |
* | "Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests." |
*
* @param {Benchmarkdescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const benchmarkdescription1 = /** @type {((inputs?: Benchmarkdescription1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Benchmarkdescription1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_benchmarkdescription1(inputs)
	if (locale === "zh") return zh_benchmarkdescription1(inputs)
	if (locale === "ja") return ja_benchmarkdescription1(inputs)
	if (locale === "ko") return ko_benchmarkdescription1(inputs)
	if (locale === "zh-Hant") return zh_hant1_benchmarkdescription1(inputs)
	if (locale === "de") return de_benchmarkdescription1(inputs)
	if (locale === "fr") return fr_benchmarkdescription1(inputs)
	if (locale === "uk") return uk_benchmarkdescription1(inputs)
	return en_benchmarkdescription1(inputs)
});
export { benchmarkdescription1 as "benchmarkDescription" }