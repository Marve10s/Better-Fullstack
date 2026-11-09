/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonpackagemanager5Inputs */



/**
* | output |
* | --- |
* | "Package manager for the generated workspace." |
*
* @param {Docsclisummarycommonpackagemanager5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonpackagemanager5 = /** @type {((inputs?: Docsclisummarycommonpackagemanager5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonpackagemanager5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Gestor de paquetes del espacio de trabajo generado.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("生成的工作区所用的包管理器。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成するワークスペースのパッケージマネージャー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성되는 워크스페이스의 패키지 매니저.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("產生的工作區所使用的套件管理器。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Paketmanager für den generierten Arbeitsbereich.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Gestionnaire de paquets pour l’espace de travail généré.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Менеджер пакетів для згенерованого робочого простору.")
	return /** @type {LocalizedString} */ ("Package manager for the generated workspace.")
});
export { docsclisummarycommonpackagemanager5 as "docsCliSummaryCommonPackageManager" }