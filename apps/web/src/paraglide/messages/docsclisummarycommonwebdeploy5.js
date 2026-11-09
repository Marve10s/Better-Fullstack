/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonwebdeploy5Inputs */



/**
* | output |
* | --- |
* | "Deployment target config for the web app." |
*
* @param {Docsclisummarycommonwebdeploy5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonwebdeploy5 = /** @type {((inputs?: Docsclisummarycommonwebdeploy5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonwebdeploy5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configuración del destino de despliegue de la aplicación web.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Web 应用的部署目标配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Web アプリのデプロイ先の設定。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("웹 앱의 배포 대상 구성.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Web 應用程式的部署目標設定。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Konfiguration des Deployment-Ziels für die Web-App.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configuration de la cible de déploiement de l’application web.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Конфігурація цільового середовища розгортання вебзастосунку.")
	return /** @type {LocalizedString} */ ("Deployment target config for the web app.")
});
export { docsclisummarycommonwebdeploy5 as "docsCliSummaryCommonWebDeploy" }