/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofclaim1Inputs */

const en_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Real issues from private codebases, sealed. Hidden tests decide.`)
};

const es_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Errores reales de bases de código privadas, sellados. Deciden las pruebas ocultas.`)
};

const zh_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来自私有代码库的真实问题，全部封闭。由隐藏测试判定。`)
};

const ja_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`非公開コードベースの実際の不具合を封印。判定するのは非公開テストです。`)
};

const ko_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`비공개 코드베이스의 실제 이슈를 봉인했습니다. 판정은 비공개 테스트가 합니다.`)
};

const zh_hant1_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`來自私有程式碼庫的真實問題，全部封閉。由隱藏測試判定。`)
};

const de_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Echte Fehler aus privaten Codebasen, versiegelt. Verborgene Tests entscheiden.`)
};

const fr_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Des bugs réels issus de bases de code privées, scellés. Ce sont les tests cachés qui tranchent.`)
};

const uk_fixproofclaim1 = /** @type {(inputs: Fixproofclaim1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Реальні помилки з приватних кодових баз, закриті. Вирішують приховані тести.`)
};

/**
* | output |
* | --- |
* | "Real issues from private codebases, sealed. Hidden tests decide." |
*
* @param {Fixproofclaim1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofclaim1 = /** @type {((inputs?: Fixproofclaim1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofclaim1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofclaim1(inputs)
	if (locale === "zh") return zh_fixproofclaim1(inputs)
	if (locale === "ja") return ja_fixproofclaim1(inputs)
	if (locale === "ko") return ko_fixproofclaim1(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofclaim1(inputs)
	if (locale === "de") return de_fixproofclaim1(inputs)
	if (locale === "fr") return fr_fixproofclaim1(inputs)
	if (locale === "uk") return uk_fixproofclaim1(inputs)
	return en_fixproofclaim1(inputs)
});
export { fixproofclaim1 as "fixproofClaim" }