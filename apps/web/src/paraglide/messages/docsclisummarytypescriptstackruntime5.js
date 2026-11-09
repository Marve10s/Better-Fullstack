/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackruntime5Inputs */



/**
* | output |
* | --- |
* | "Server runtime." |
*
* @param {Docsclisummarytypescriptstackruntime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackruntime5 = /** @type {((inputs?: Docsclisummarytypescriptstackruntime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackruntime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Entorno de ejecución del servidor.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("服务器运行时。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("サーバーのランタイム。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("서버 런타임.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("伺服器執行環境。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Server-Laufzeit.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Environnement d’exécution du serveur.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Середовище виконання сервера.")
	return /** @type {LocalizedString} */ ("Server runtime.")
});
export { docsclisummarytypescriptstackruntime5 as "docsCliSummaryTypescriptStackRuntime" }