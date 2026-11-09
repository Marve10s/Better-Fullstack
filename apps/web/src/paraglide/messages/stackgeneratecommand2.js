/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackgeneratecommand2Inputs */



/**
* | output |
* | --- |
* | "Generate command" |
*
* @param {Stackgeneratecommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackgeneratecommand2 = /** @type {((inputs?: Stackgeneratecommand2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackgeneratecommand2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Generar comando")
	if (locale === "zh") return /** @type {LocalizedString} */ ("生成命令")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コマンドを生成する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("명령 생성")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("產生指令")
	if (locale === "de") return /** @type {LocalizedString} */ ("Befehl generieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Générer une commande")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Згенерувати команду")
	return /** @type {LocalizedString} */ ("Generate command")
});
export { stackgeneratecommand2 as "stackGenerateCommand" }