/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationopenci3Inputs */

const en_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open required CI run`)
};

const es_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir la ejecución de CI obligatoria`)
};

const zh_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开必需的 CI 运行`)
};

const ja_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`必須の CI 実行を開く`)
};

const ko_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`필수 CI 실행 열기`)
};

const zh_hant1_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟必要的 CI 執行`)
};

const de_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erforderlichen CI-Lauf öffnen`)
};

const fr_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir l'exécution CI requise`)
};

const uk_docsverificationopenci3 = /** @type {(inputs: Docsverificationopenci3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкрити обовʼязковий запуск CI`)
};

/**
* | output |
* | --- |
* | "Open required CI run" |
*
* @param {Docsverificationopenci3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationopenci3 = /** @type {((inputs?: Docsverificationopenci3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationopenci3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationopenci3(inputs)
	if (locale === "zh") return zh_docsverificationopenci3(inputs)
	if (locale === "ja") return ja_docsverificationopenci3(inputs)
	if (locale === "ko") return ko_docsverificationopenci3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationopenci3(inputs)
	if (locale === "de") return de_docsverificationopenci3(inputs)
	if (locale === "fr") return fr_docsverificationopenci3(inputs)
	if (locale === "uk") return uk_docsverificationopenci3(inputs)
	return en_docsverificationopenci3(inputs)
});
export { docsverificationopenci3 as "docsVerificationOpenCi" }