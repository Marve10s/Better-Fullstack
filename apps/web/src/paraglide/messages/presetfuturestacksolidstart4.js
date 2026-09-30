/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestacksolidstart4Inputs */

const en_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart 2 with file routes and its own server`)
};

const es_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart 2 con rutas por archivo y su propio servidor`)
};

const zh_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart 2，文件路由并自带服务器`)
};

const ja_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ファイルルートと独自サーバーを持つ SolidStart 2`)
};

const ko_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`파일 라우트와 자체 서버를 갖춘 SolidStart 2`)
};

const zh_hant1_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart 2，檔案路由並自帶伺服器`)
};

const de_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart 2 mit Dateirouten und eigenem Server`)
};

const fr_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart 2 avec routes par fichier et son propre serveur`)
};

const uk_presetfuturestacksolidstart4 = /** @type {(inputs: Presetfuturestacksolidstart4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart 2 з файловими маршрутами та власним сервером`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_presetfuturestacksolidstart4(inputs)
	if (locale === "zh") return zh_presetfuturestacksolidstart4(inputs)
	if (locale === "ja") return ja_presetfuturestacksolidstart4(inputs)
	if (locale === "ko") return ko_presetfuturestacksolidstart4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetfuturestacksolidstart4(inputs)
	if (locale === "de") return de_presetfuturestacksolidstart4(inputs)
	if (locale === "fr") return fr_presetfuturestacksolidstart4(inputs)
	if (locale === "uk") return uk_presetfuturestacksolidstart4(inputs)
	return en_presetfuturestacksolidstart4(inputs)
});
export { presetfuturestacksolidstart4 as "presetFutureStackSolidStart" }