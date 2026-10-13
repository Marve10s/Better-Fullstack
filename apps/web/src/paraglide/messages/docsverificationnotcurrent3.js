/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnotcurrent3Inputs */

const en_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build verification is not current`)
};

const es_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La verificación de compilación no está al día`)
};

const zh_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建验证不是最新状态`)
};

const ja_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルド検証は最新ではありません`)
};

const ko_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌드 검증이 최신이 아닙니다`)
};

const zh_hant1_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建置驗證不是最新狀態`)
};

const de_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build-Verifizierung ist nicht aktuell`)
};

const fr_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La vérification de build n'est pas à jour`)
};

const uk_docsverificationnotcurrent3 = /** @type {(inputs: Docsverificationnotcurrent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевірка збирання неактуальна`)
};

/**
* | output |
* | --- |
* | "Build verification is not current" |
*
* @param {Docsverificationnotcurrent3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnotcurrent3 = /** @type {((inputs?: Docsverificationnotcurrent3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnotcurrent3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationnotcurrent3(inputs)
	if (locale === "zh") return zh_docsverificationnotcurrent3(inputs)
	if (locale === "ja") return ja_docsverificationnotcurrent3(inputs)
	if (locale === "ko") return ko_docsverificationnotcurrent3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationnotcurrent3(inputs)
	if (locale === "de") return de_docsverificationnotcurrent3(inputs)
	if (locale === "fr") return fr_docsverificationnotcurrent3(inputs)
	if (locale === "uk") return uk_docsverificationnotcurrent3(inputs)
	return en_docsverificationnotcurrent3(inputs)
});
export { docsverificationnotcurrent3 as "docsVerificationNotCurrent" }