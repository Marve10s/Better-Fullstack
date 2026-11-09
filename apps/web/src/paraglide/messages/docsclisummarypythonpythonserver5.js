/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonserver5Inputs */



/**
* | output |
* | --- |
* | "Python production server." |
*
* @param {Docsclisummarypythonpythonserver5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonserver5 = /** @type {((inputs?: Docsclisummarypythonpythonserver5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonserver5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Servidor de producción Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 生产服务器。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の本番用サーバー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 프로덕션 서버.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 正式環境伺服器。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Produktionsserver für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Serveur de production Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Сервер Python для продакшну.")
	return /** @type {LocalizedString} */ ("Python production server.")
});
export { docsclisummarypythonpythonserver5 as "docsCliSummaryPythonPythonServer" }