/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlighteffect3Inputs */



/**
* | output |
* | --- |
* | "Run Effect in the app or on its own server" |
*
* @param {Changelogrelease20261001highlighteffect3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlighteffect3 = /** @type {((inputs?: Changelogrelease20261001highlighteffect3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlighteffect3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecuta Effect en la app o en su propio servidor")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在应用内或独立服务器上运行 Effect")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Effect をアプリ内または専用サーバーで実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Effect를 앱 안이나 별도 서버에서 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在應用程式內或獨立伺服器上執行 Effect")
	if (locale === "de") return /** @type {LocalizedString} */ ("Effect in der App oder auf eigenem Server ausführen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécutez Effect dans l'application ou sur son propre serveur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запускайте Effect у застосунку або на окремому сервері")
	return /** @type {LocalizedString} */ ("Run Effect in the app or on its own server")
});
export { changelogrelease20261001highlighteffect3 as "changelogRelease20261001HighlightEffect" }