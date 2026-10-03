/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationcurrent2Inputs */

const en_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build verification is current`)
};

const es_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La verificación de compilación está al día`)
};

const zh_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建验证为最新状态`)
};

const ja_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルド検証は最新です`)
};

const ko_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌드 검증이 최신입니다`)
};

const zh_hant1_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建置驗證為最新狀態`)
};

const de_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build-Verifizierung ist aktuell`)
};

const fr_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La vérification de build est à jour`)
};

const uk_docsverificationcurrent2 = /** @type {(inputs: Docsverificationcurrent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевірка збирання актуальна`)
};

/**
* | output |
* | --- |
* | "Build verification is current" |
*
* @param {Docsverificationcurrent2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationcurrent2 = /** @type {((inputs?: Docsverificationcurrent2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationcurrent2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationcurrent2(inputs)
	if (locale === "zh") return zh_docsverificationcurrent2(inputs)
	if (locale === "ja") return ja_docsverificationcurrent2(inputs)
	if (locale === "ko") return ko_docsverificationcurrent2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationcurrent2(inputs)
	if (locale === "de") return de_docsverificationcurrent2(inputs)
	if (locale === "fr") return fr_docsverificationcurrent2(inputs)
	if (locale === "uk") return uk_docsverificationcurrent2(inputs)
	return en_docsverificationcurrent2(inputs)
});
export { docsverificationcurrent2 as "docsVerificationCurrent" }