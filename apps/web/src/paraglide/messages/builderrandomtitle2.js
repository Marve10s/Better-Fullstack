/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandomtitle2Inputs */



/**
* | output |
* | --- |
* | "Generate a random stack" |
*
* @param {Builderrandomtitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrandomtitle2 = /** @type {((inputs?: Builderrandomtitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandomtitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Generar un stack aleatorio")
	if (locale === "zh") return /** @type {LocalizedString} */ ("生成随机 stack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランダムなスタックを生成する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("무작위 스택 생성")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("產生隨機 stack")
	if (locale === "de") return /** @type {LocalizedString} */ ("Generieren Sie einen zufälligen Stack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Générer une pile aléatoire")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створити випадковий стек")
	return /** @type {LocalizedString} */ ("Generate a random stack")
});
export { builderrandomtitle2 as "builderRandomTitle" }