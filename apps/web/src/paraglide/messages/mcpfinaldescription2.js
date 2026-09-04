/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaldescription2Inputs */

const en_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private and public codebases, verified by hidden tests.`)
};

const es_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof evalúa agentes de programación con errores reales y sellados de bases de código privadas y públicas, verificados por pruebas ocultas.`)
};

const zh_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof 用来自私有和公开代码库的封闭真实问题评测编程代理，并由隐藏测试验证。`)
};

const ja_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof は、非公開および公開コードベースから集めた封印済みの実際の不具合でコーディングエージェントを採点し、非公開テストで検証します。`)
};

const ko_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof는 비공개 및 공개 코드베이스에서 가져온 봉인된 실제 이슈로 코딩 에이전트를 채점하고, 비공개 테스트로 검증합니다.`)
};

const zh_hant1_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof 用來自私有和公開程式碼庫的封閉真實問題評測程式代理程式，並由隱藏測試驗證。`)
};

const de_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof bewertet Coding-Agenten an versiegelten, echten Fehlern aus privaten und öffentlichen Codebasen, verifiziert durch verborgene Tests.`)
};

const fr_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof évalue les agents de codage sur des bugs réels et scellés issus de bases de code privées et publiques, vérifiés par des tests cachés.`)
};

const uk_mcpfinaldescription2 = /** @type {(inputs: Mcpfinaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof оцінює агентів для коду на закритих реальних помилках із приватних і публічних кодових баз, перевірених прихованими тестами.`)
};

/**
* | output |
* | --- |
* | "Fixproof grades coding agents on sealed, real issues from private and public codebases, verified by hidden tests." |
*
* @param {Mcpfinaldescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpfinaldescription2 = /** @type {((inputs?: Mcpfinaldescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaldescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_mcpfinaldescription2(inputs)
	if (locale === "zh") return zh_mcpfinaldescription2(inputs)
	if (locale === "ja") return ja_mcpfinaldescription2(inputs)
	if (locale === "ko") return ko_mcpfinaldescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpfinaldescription2(inputs)
	if (locale === "de") return de_mcpfinaldescription2(inputs)
	if (locale === "fr") return fr_mcpfinaldescription2(inputs)
	if (locale === "uk") return uk_mcpfinaldescription2(inputs)
	return en_mcpfinaldescription2(inputs)
});
export { mcpfinaldescription2 as "mcpFinalDescription" }