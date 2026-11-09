/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationgoboundary3Inputs */



/**
* | output |
* | --- |
* | "Exercises Gin and GORM with local SQLite, not a network database." |
*
* @param {Docsverificationgoboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationgoboundary3 = /** @type {((inputs?: Docsverificationgoboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationgoboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Prueba Gin y GORM con SQLite local, no con una base de datos en red.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用本地 SQLite 测试 Gin 和 GORM，不包括网络数据库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Gin と GORM をローカル SQLite でテストします。ネットワークデータベースは対象外です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Gin과 GORM을 로컬 SQLite로 테스트하며, 네트워크 데이터베이스는 테스트하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用本機 SQLite 測試 Gin 與 GORM，不包含網路資料庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testet Gin und GORM mit lokalem SQLite, nicht mit einer Netzwerkdatenbank.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Teste Gin et GORM avec SQLite local, pas avec une base de données réseau.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевіряє Gin і GORM з локальною SQLite, а не з мережевою базою даних.")
	return /** @type {LocalizedString} */ ("Exercises Gin and GORM with local SQLite, not a network database.")
});
export { docsverificationgoboundary3 as "docsVerificationGoBoundary" }