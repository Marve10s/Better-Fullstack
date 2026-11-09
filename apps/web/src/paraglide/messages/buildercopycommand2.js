/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercopycommand2Inputs */



/**
* | output |
* | --- |
* | "Copy command" |
*
* @param {Buildercopycommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercopycommand2 = /** @type {((inputs?: Buildercopycommand2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercopycommand2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
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
export { buildercopycommand2 as "builderCopyCommand" }