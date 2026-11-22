/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationelixirboundary3Inputs */



/**
* | output |
* | --- |
* | "Exercises Phoenix and Ecto migrations against local SQLite." |
*
* @param {Docsverificationelixirboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationelixirboundary3 = /** @type {((inputs?: Docsverificationelixirboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationelixirboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Prueba Phoenix y las migraciones de Ecto con SQLite local.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("针对本地 SQLite 测试 Phoenix 和 Ecto 迁移。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ローカル SQLite に対して Phoenix と Ecto マイグレーションをテストします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("로컬 SQLite를 대상으로 Phoenix와 Ecto 마이그레이션을 테스트합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("針對本機 SQLite 測試 Phoenix 與 Ecto 遷移。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testet Phoenix und Ecto-Migrationen mit lokalem SQLite.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Teste Phoenix et les migrations Ecto avec SQLite local.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевіряє Phoenix і міграції Ecto на локальній SQLite.")
	return /** @type {LocalizedString} */ ("Exercises Phoenix and Ecto migrations against local SQLite.")
});
export { docsverificationelixirboundary3 as "docsVerificationElixirBoundary" }