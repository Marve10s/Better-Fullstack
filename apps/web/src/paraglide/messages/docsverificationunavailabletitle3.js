/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationunavailabletitle3Inputs */

const en_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Release evidence unavailable`)
};

const es_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Evidencia de la versión no disponible`)
};

const zh_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法获取发布证据`)
};

const ja_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リリースのエビデンスを取得できません`)
};

const ko_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`릴리스 증거를 사용할 수 없음`)
};

const zh_hant1_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無法取得發行證據`)
};

const de_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Release-Nachweise nicht verfügbar`)
};

const fr_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preuves de version indisponibles`)
};

const uk_docsverificationunavailabletitle3 = /** @type {(inputs: Docsverificationunavailabletitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Докази релізу недоступні`)
};

/**
* | output |
* | --- |
* | "Release evidence unavailable" |
*
* @param {Docsverificationunavailabletitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationunavailabletitle3 = /** @type {((inputs?: Docsverificationunavailabletitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationunavailabletitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationunavailabletitle3(inputs)
	if (locale === "zh") return zh_docsverificationunavailabletitle3(inputs)
	if (locale === "ja") return ja_docsverificationunavailabletitle3(inputs)
	if (locale === "ko") return ko_docsverificationunavailabletitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationunavailabletitle3(inputs)
	if (locale === "de") return de_docsverificationunavailabletitle3(inputs)
	if (locale === "fr") return fr_docsverificationunavailabletitle3(inputs)
	if (locale === "uk") return uk_docsverificationunavailabletitle3(inputs)
	return en_docsverificationunavailabletitle3(inputs)
});
export { docsverificationunavailabletitle3 as "docsVerificationUnavailableTitle" }