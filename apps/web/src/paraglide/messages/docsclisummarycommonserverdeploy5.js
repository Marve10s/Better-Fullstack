/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonserverdeploy5Inputs */



/**
* | output |
* | --- |
* | "Deployment target config for the server." |
*
* @param {Docsclisummarycommonserverdeploy5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonserverdeploy5 = /** @type {((inputs?: Docsclisummarycommonserverdeploy5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonserverdeploy5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configuración del destino de despliegue del servidor.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("服务器的部署目标配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("サーバーのデプロイ先の設定。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("서버의 배포 대상 구성.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("伺服器的部署目標設定。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Konfiguration des Deployment-Ziels für den Server.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configuration de la cible de déploiement du serveur.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Конфігурація цільового середовища розгортання сервера.")
	return /** @type {LocalizedString} */ ("Deployment target config for the server.")
});
export { docsclisummarycommonserverdeploy5 as "docsCliSummaryCommonServerDeploy" }