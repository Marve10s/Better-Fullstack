/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationincompletematrix3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("El comprobante más reciente de la versión tiene una matriz de evidencias incompleta.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新的发布回执包含不完整的证明矩阵。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新のリリースレシートの証明マトリクスが不完全です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 릴리스 증빙의 증명 매트릭스가 불완전합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新的發行回執含有不完整的證明矩陣。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der neueste Release-Beleg enthält eine unvollständige Nachweismatrix.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le dernier reçu de version contient une matrice de preuves incomplète.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останнє підтвердження релізу містить неповну матрицю доказів.")
	return /** @type {LocalizedString} */ ("The latest release receipt has an incomplete proof matrix.")
});
export { docsverificationincompletematrix3 as "docsVerificationIncompleteMatrix" }