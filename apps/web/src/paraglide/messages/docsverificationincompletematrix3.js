/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationincompletematrix3Inputs */

const en_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The latest release receipt has an incomplete proof matrix.`)
};

const es_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El comprobante más reciente de la versión tiene una matriz de evidencias incompleta.`)
};

const zh_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的发布回执包含不完整的证明矩阵。`)
};

const ja_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新のリリースレシートの証明マトリクスが不完全です。`)
};

const ko_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 릴리스 증빙의 증명 매트릭스가 불완전합니다.`)
};

const zh_hant1_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的發行回執含有不完整的證明矩陣。`)
};

const de_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der neueste Release-Beleg enthält eine unvollständige Nachweismatrix.`)
};

const fr_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le dernier reçu de version contient une matrice de preuves incomplète.`)
};

const uk_docsverificationincompletematrix3 = /** @type {(inputs: Docsverificationincompletematrix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Останнє підтвердження релізу містить неповну матрицю доказів.`)
};

/**
* | output |
* | --- |
* | "The latest release receipt has an incomplete proof matrix." |
*
* @param {Docsverificationincompletematrix3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationincompletematrix3 = /** @type {((inputs?: Docsverificationincompletematrix3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationincompletematrix3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationincompletematrix3(inputs)
	if (locale === "zh") return zh_docsverificationincompletematrix3(inputs)
	if (locale === "ja") return ja_docsverificationincompletematrix3(inputs)
	if (locale === "ko") return ko_docsverificationincompletematrix3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationincompletematrix3(inputs)
	if (locale === "de") return de_docsverificationincompletematrix3(inputs)
	if (locale === "fr") return fr_docsverificationincompletematrix3(inputs)
	if (locale === "uk") return uk_docsverificationincompletematrix3(inputs)
	return en_docsverificationincompletematrix3(inputs)
});
export { docsverificationincompletematrix3 as "docsVerificationIncompleteMatrix" }