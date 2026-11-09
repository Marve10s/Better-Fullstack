/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestacksolidstart4Inputs */



/**
* | output |
* | --- |
* | "SolidStart 2 with file routes and its own server" |
*
* @param {Presetfuturestacksolidstart4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestacksolidstart4 = /** @type {((inputs?: Presetfuturestacksolidstart4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestacksolidstart4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("SolidStart 2 con rutas por archivo y su propio servidor")
	if (locale === "zh") return /** @type {LocalizedString} */ ("SolidStart 2，文件路由并自带服务器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ファイルルートと独自サーバーを持つ SolidStart 2")
	if (locale === "ko") return /** @type {LocalizedString} */ ("파일 라우트와 자체 서버를 갖춘 SolidStart 2")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("SolidStart 2，檔案路由並自帶伺服器")
	if (locale === "de") return /** @type {LocalizedString} */ ("SolidStart 2 mit Dateirouten und eigenem Server")
	if (locale === "fr") return /** @type {LocalizedString} */ ("SolidStart 2 avec routes par fichier et son propre serveur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("SolidStart 2 з файловими маршрутами та власним сервером")
	return /** @type {LocalizedString} */ ("SolidStart 2 with file routes and its own server")
});
export { presetfuturestacksolidstart4 as "presetFutureStackSolidStart" }