/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecopycommand2Inputs */



/**
* | output |
* | --- |
* | "Copy command" |
*
* @param {Homecopycommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecopycommand2 = /** @type {((inputs?: Homecopycommand2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecopycommand2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar comando")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制命令")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コピーコマンド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("명령 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製指令")
	if (locale === "de") return /** @type {LocalizedString} */ ("Befehl kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier la commande")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Копіювати команду")
	return /** @type {LocalizedString} */ ("Copy command")
});
export { homecopycommand2 as "homeCopyCommand" }