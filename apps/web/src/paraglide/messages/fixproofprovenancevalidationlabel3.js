/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancevalidationlabel3Inputs */

const en_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The tests were validated first`)
};

const es_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las pruebas se validaron primero`)
};

const zh_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`测试先经过验证`)
};

const ja_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`テストは先に検証しました`)
};

const ko_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`테스트를 먼저 검증했습니다`)
};

const zh_hant1_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`測試先經過驗證`)
};

const de_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die Tests wurden zuerst validiert`)
};

const fr_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les tests ont d'abord été validés`)
};

const uk_fixproofprovenancevalidationlabel3 = /** @type {(inputs: Fixproofprovenancevalidationlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Тести спершу перевірили`)
};

/**
* | output |
* | --- |
* | "The tests were validated first" |
*
* @param {Fixproofprovenancevalidationlabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancevalidationlabel3 = /** @type {((inputs?: Fixproofprovenancevalidationlabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancevalidationlabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancevalidationlabel3(inputs)
	if (locale === "zh") return zh_fixproofprovenancevalidationlabel3(inputs)
	if (locale === "ja") return ja_fixproofprovenancevalidationlabel3(inputs)
	if (locale === "ko") return ko_fixproofprovenancevalidationlabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancevalidationlabel3(inputs)
	if (locale === "de") return de_fixproofprovenancevalidationlabel3(inputs)
	if (locale === "fr") return fr_fixproofprovenancevalidationlabel3(inputs)
	if (locale === "uk") return uk_fixproofprovenancevalidationlabel3(inputs)
	return en_fixproofprovenancevalidationlabel3(inputs)
});
export { fixproofprovenancevalidationlabel3 as "fixproofProvenanceValidationLabel" }