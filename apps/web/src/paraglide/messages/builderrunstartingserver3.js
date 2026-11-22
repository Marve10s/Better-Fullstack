/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunstartingserver3Inputs */



/**
* | output |
* | --- |
* | "Starting development server" |
*
* @param {Builderrunstartingserver3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunstartingserver3 = /** @type {((inputs?: Builderrunstartingserver3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunstartingserver3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Iniciando servidor de desarrollo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在启动开发服务器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("開発サーバーを起動中")
	if (locale === "ko") return /** @type {LocalizedString} */ ("개발 서버 시작 중")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在啟動開發伺服器")
	if (locale === "de") return /** @type {LocalizedString} */ ("Entwicklungsserver wird gestartet")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Démarrage du serveur de développement")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запуск сервера розробки")
	return /** @type {LocalizedString} */ ("Starting development server")
});
export { builderrunstartingserver3 as "builderRunStartingServer" }