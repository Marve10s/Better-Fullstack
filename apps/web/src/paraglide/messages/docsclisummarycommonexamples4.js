/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonexamples4Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Funciones de ejemplo opcionales que se incluirán.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("要包含的可选示例功能。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("含めるサンプル機能 (任意)。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("포함할 선택적 예제 기능.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("要包含的選用範例功能。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Optionale Beispielfunktionen, die eingebunden werden sollen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exemples de fonctionnalités facultatifs à inclure.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Необов’язкові приклади функцій, які потрібно додати.")
	return /** @type {LocalizedString} */ ("Optional example features to include.")
});
export { docsclisummarycommonexamples4 as "docsCliSummaryCommonExamples" }