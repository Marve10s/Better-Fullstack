/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunbrowserunsupportedtitle4Inputs */



/**
* | output |
* | --- |
* | "This browser cannot start the runtime" |
*
* @param {Builderrunbrowserunsupportedtitle4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunbrowserunsupportedtitle4 = /** @type {((inputs?: Builderrunbrowserunsupportedtitle4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunbrowserunsupportedtitle4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Este navegador no puede iniciar el entorno")
	if (locale === "zh") return /** @type {LocalizedString} */ ("此浏览器无法启动运行时")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このブラウザではランタイムを起動できません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 브라우저에서 런타임을 시작할 수 없습니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("此瀏覽器無法啟動執行階段")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dieser Browser kann die Laufzeit nicht starten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ce navigateur ne peut pas démarrer l’environnement")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Цей браузер не може запустити середовище")
	return /** @type {LocalizedString} */ ("This browser cannot start the runtime")
});
export { builderrunbrowserunsupportedtitle4 as "builderRunBrowserUnsupportedTitle" }