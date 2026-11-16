/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandomtooltip2Inputs */



/**
* | output |
* | --- |
* | "Generate a random stack configuration" |
*
* @param {Builderrandomtooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrandomtooltip2 = /** @type {((inputs?: Builderrandomtooltip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandomtooltip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Generar una configuración de stack aleatoria")
	if (locale === "zh") return /** @type {LocalizedString} */ ("生成一个随机的 stack 配置")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランダムなスタック構成を生成する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("무작위 스택 구성 생성")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("產生一個隨機的 stack 配置")
	if (locale === "de") return /** @type {LocalizedString} */ ("Generieren Sie eine zufällige Stack-Konfiguration")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Générer une configuration de pile aléatoire")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створіть випадкову конфігурацію стека")
	return /** @type {LocalizedString} */ ("Generate a random stack configuration")
});
export { builderrandomtooltip2 as "builderRandomTooltip" }