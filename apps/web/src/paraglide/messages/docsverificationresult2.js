/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationresult2Inputs */

const en_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Result`)
};

const es_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resultado`)
};

const zh_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结果`)
};

const ja_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果`)
};

const ko_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`결과`)
};

const zh_hant1_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果`)
};

const de_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ergebnis`)
};

const fr_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Résultat`)
};

const uk_docsverificationresult2 = /** @type {(inputs: Docsverificationresult2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Результат`)
};

/**
* | output |
* | --- |
* | "Result" |
*
* @param {Docsverificationresult2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationresult2 = /** @type {((inputs?: Docsverificationresult2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationresult2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationresult2(inputs)
	if (locale === "zh") return zh_docsverificationresult2(inputs)
	if (locale === "ja") return ja_docsverificationresult2(inputs)
	if (locale === "ko") return ko_docsverificationresult2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationresult2(inputs)
	if (locale === "de") return de_docsverificationresult2(inputs)
	if (locale === "fr") return fr_docsverificationresult2(inputs)
	if (locale === "uk") return uk_docsverificationresult2(inputs)
	return en_docsverificationresult2(inputs)
});
export { docsverificationresult2 as "docsVerificationResult" }