/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcommandcopied2Inputs */



/**
* | output |
* | --- |
* | "Command copied to clipboard!" |
*
* @param {Stackcommandcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackcommandcopied2 = /** @type {((inputs?: Stackcommandcopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcommandcopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comando copiado al portapapeles.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("命令已复制到剪贴板！")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コマンドがクリップボードにコピーされました!")
	if (locale === "ko") return /** @type {LocalizedString} */ ("명령이 클립보드에 복사되었습니다!")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("命令已複製到剪貼簿！")
	if (locale === "de") return /** @type {LocalizedString} */ ("Befehl in die Zwischenablage kopiert!")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Commande copiée dans le presse-papier !")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Команду скопійовано в буфер обміну!")
	return /** @type {LocalizedString} */ ("Command copied to clipboard!")
});
export { stackcommandcopied2 as "stackCommandCopied" }