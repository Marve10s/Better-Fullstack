/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcommandcopyfailed3Inputs */



/**
* | output |
* | --- |
* | "Failed to copy command" |
*
* @param {Stackcommandcopyfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackcommandcopyfailed3 = /** @type {((inputs?: Stackcommandcopyfailed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcommandcopyfailed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se pudo copiar el comando")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制命令失败")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コマンドのコピーに失敗しました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("명령을 복사하지 못했습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製命令失敗")
	if (locale === "de") return /** @type {LocalizedString} */ ("Befehl konnte nicht kopiert werden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Échec de la copie de la commande")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не вдалося скопіювати команду")
	return /** @type {LocalizedString} */ ("Failed to copy command")
});
export { stackcommandcopyfailed3 as "stackCommandCopyFailed" }