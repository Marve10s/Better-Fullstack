/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonpackagemanager6Inputs */



/**
* | output |
* | --- |
* | "Python package manager." |
*
* @param {Docsclisummarypythonpythonpackagemanager6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonpackagemanager6 = /** @type {((inputs?: Docsclisummarypythonpythonpackagemanager6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonpackagemanager6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Gestor de paquetes Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 包管理器。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のパッケージマネージャー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 패키지 매니저.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 套件管理器。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Paketmanager für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Gestionnaire de paquets Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Менеджер пакетів Python.")
	return /** @type {LocalizedString} */ ("Python package manager.")
});
export { docsclisummarypythonpythonpackagemanager6 as "docsCliSummaryPythonPythonPackageManager" }