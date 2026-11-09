/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunbooting2Inputs */



/**
* | output |
* | --- |
* | "Booting browser runtime" |
*
* @param {Builderrunbooting2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunbooting2 = /** @type {((inputs?: Builderrunbooting2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunbooting2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Iniciando entorno del navegador")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在启动浏览器运行时")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブラウザランタイムを起動中")
	if (locale === "ko") return /** @type {LocalizedString} */ ("브라우저 런타임 부팅 중")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在啟動瀏覽器執行階段")
	if (locale === "de") return /** @type {LocalizedString} */ ("Browser-Laufzeit wird gestartet")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Démarrage de l’environnement navigateur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запуск середовища браузера")
	return /** @type {LocalizedString} */ ("Booting browser runtime")
});
export { builderrunbooting2 as "builderRunBooting" }