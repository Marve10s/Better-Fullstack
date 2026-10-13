/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonexamples4Inputs */

const en_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optional example features to include.`)
};

const es_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Funciones de ejemplo opcionales que se incluirán.`)
};

const zh_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要包含的可选示例功能。`)
};

const ja_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`含めるサンプル機能 (任意)。`)
};

const ko_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`포함할 선택적 예제 기능.`)
};

const zh_hant1_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要包含的選用範例功能。`)
};

const de_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optionale Beispielfunktionen, die eingebunden werden sollen.`)
};

const fr_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exemples de fonctionnalités facultatifs à inclure.`)
};

const uk_docsclisummarycommonexamples4 = /** @type {(inputs: Docsclisummarycommonexamples4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Необов’язкові приклади функцій, які потрібно додати.`)
};

/**
* | output |
* | --- |
* | "Optional example features to include." |
*
* @param {Docsclisummarycommonexamples4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonexamples4 = /** @type {((inputs?: Docsclisummarycommonexamples4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonexamples4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonexamples4(inputs)
	if (locale === "zh") return zh_docsclisummarycommonexamples4(inputs)
	if (locale === "ja") return ja_docsclisummarycommonexamples4(inputs)
	if (locale === "ko") return ko_docsclisummarycommonexamples4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonexamples4(inputs)
	if (locale === "de") return de_docsclisummarycommonexamples4(inputs)
	if (locale === "fr") return fr_docsclisummarycommonexamples4(inputs)
	if (locale === "uk") return uk_docsclisummarycommonexamples4(inputs)
	return en_docsclisummarycommonexamples4(inputs)
});
export { docsclisummarycommonexamples4 as "docsCliSummaryCommonExamples" }