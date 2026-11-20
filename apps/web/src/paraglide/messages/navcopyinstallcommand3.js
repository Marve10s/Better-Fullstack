/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcopyinstallcommand3Inputs */



/**
* | output |
* | --- |
* | "Copy install command" |
*
* @param {Navcopyinstallcommand3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navcopyinstallcommand3 = /** @type {((inputs?: Navcopyinstallcommand3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcopyinstallcommand3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar comando de instalación")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制安装命令")
	if (locale === "ja") return /** @type {LocalizedString} */ ("インストールコマンドのコピー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("설치 명령 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製安裝指令")
	if (locale === "de") return /** @type {LocalizedString} */ ("Installationsbefehl kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier la commande d'installation")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Копіювати команду встановлення")
	return /** @type {LocalizedString} */ ("Copy install command")
});
export { navcopyinstallcommand3 as "navCopyInstallCommand" }