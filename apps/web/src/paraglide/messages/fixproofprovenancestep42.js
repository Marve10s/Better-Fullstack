/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep42Inputs */

const en_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The hidden tests are copied in and run, together with the package's existing suite.`)
};

const es_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se copian las pruebas ocultas y se ejecutan junto con la suite existente del paquete.`)
};

const zh_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隐藏测试被复制进来，与包自带的测试套件一起运行。`)
};

const ja_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`非公開テストをコピーして、パッケージ既存のスイートと一緒に実行します。`)
};

const ko_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`비공개 테스트를 복사해 패키지의 기존 스위트와 함께 실행합니다.`)
};

const zh_hant1_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隱藏測試被複製進來，與套件自帶的測試套件一起執行。`)
};

const de_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die verborgenen Tests werden eingespielt und zusammen mit der vorhandenen Suite des Pakets ausgeführt.`)
};

const fr_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les tests cachés sont copiés puis exécutés, en même temps que la suite existante du paquet.`)
};

const uk_fixproofprovenancestep42 = /** @type {(inputs: Fixproofprovenancestep42Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Приховані тести копіюються й запускаються разом із наявним набором тестів пакета.`)
};

/**
* | output |
* | --- |
* | "The hidden tests are copied in and run, together with the package's existing suite." |
*
* @param {Fixproofprovenancestep42Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep42 = /** @type {((inputs?: Fixproofprovenancestep42Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep42Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep42(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep42(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep42(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep42(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep42(inputs)
	if (locale === "de") return de_fixproofprovenancestep42(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep42(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep42(inputs)
	return en_fixproofprovenancestep42(inputs)
});
export { fixproofprovenancestep42 as "fixproofProvenanceStep4" }