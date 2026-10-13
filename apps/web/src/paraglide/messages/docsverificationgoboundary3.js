/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationgoboundary3Inputs */

const en_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exercises Gin and GORM with local SQLite, not a network database.`)
};

const es_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prueba Gin y GORM con SQLite local, no con una base de datos en red.`)
};

const zh_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用本地 SQLite 测试 Gin 和 GORM，不包括网络数据库。`)
};

const ja_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gin と GORM をローカル SQLite でテストします。ネットワークデータベースは対象外です。`)
};

const ko_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gin과 GORM을 로컬 SQLite로 테스트하며, 네트워크 데이터베이스는 테스트하지 않습니다.`)
};

const zh_hant1_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用本機 SQLite 測試 Gin 與 GORM，不包含網路資料庫。`)
};

const de_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testet Gin und GORM mit lokalem SQLite, nicht mit einer Netzwerkdatenbank.`)
};

const fr_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teste Gin et GORM avec SQLite local, pas avec une base de données réseau.`)
};

const uk_docsverificationgoboundary3 = /** @type {(inputs: Docsverificationgoboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевіряє Gin і GORM з локальною SQLite, а не з мережевою базою даних.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationgoboundary3(inputs)
	if (locale === "zh") return zh_docsverificationgoboundary3(inputs)
	if (locale === "ja") return ja_docsverificationgoboundary3(inputs)
	if (locale === "ko") return ko_docsverificationgoboundary3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationgoboundary3(inputs)
	if (locale === "de") return de_docsverificationgoboundary3(inputs)
	if (locale === "fr") return fr_docsverificationgoboundary3(inputs)
	if (locale === "uk") return uk_docsverificationgoboundary3(inputs)
	return en_docsverificationgoboundary3(inputs)
});
export { docsverificationgoboundary3 as "docsVerificationGoBoundary" }