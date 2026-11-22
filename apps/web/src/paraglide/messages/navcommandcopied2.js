/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcommandcopied2Inputs */



/**
* | output |
* | --- |
* | "Command copied" |
*
* @param {Navcommandcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navcommandcopied2 = /** @type {((inputs?: Navcommandcopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcommandcopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comando copiado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("命令已复制")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コマンドがコピーされました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("명령이 복사되었습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("命令已複製")
	if (locale === "de") return /** @type {LocalizedString} */ ("Befehl kopiert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Commande copiée")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Команду скопійовано")
	return /** @type {LocalizedString} */ ("Command copied")
});
export { navcommandcopied2 as "navCommandCopied" }