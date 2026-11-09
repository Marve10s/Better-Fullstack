/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docspackagemanager2Inputs */



/**
* | output |
* | --- |
* | "Package manager" |
*
* @param {Docspackagemanager2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docspackagemanager2 = /** @type {((inputs?: Docspackagemanager2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docspackagemanager2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Gestor de paquetes")
	if (locale === "zh") return /** @type {LocalizedString} */ ("包管理器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("パッケージマネージャー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("패키지 매니저")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("套件管理器")
	if (locale === "de") return /** @type {LocalizedString} */ ("Paketmanager")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Gestionnaire de paquets")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Менеджер пакетів")
	return /** @type {LocalizedString} */ ("Package manager")
});
export { docspackagemanager2 as "docsPackageManager" }