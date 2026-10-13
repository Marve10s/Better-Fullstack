/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationelixirboundary3Inputs */

const en_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exercises Phoenix and Ecto migrations against local SQLite.`)
};

const es_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prueba Phoenix y las migraciones de Ecto con SQLite local.`)
};

const zh_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`针对本地 SQLite 测试 Phoenix 和 Ecto 迁移。`)
};

const ja_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ローカル SQLite に対して Phoenix と Ecto マイグレーションをテストします。`)
};

const ko_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`로컬 SQLite를 대상으로 Phoenix와 Ecto 마이그레이션을 테스트합니다.`)
};

const zh_hant1_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`針對本機 SQLite 測試 Phoenix 與 Ecto 遷移。`)
};

const de_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testet Phoenix und Ecto-Migrationen mit lokalem SQLite.`)
};

const fr_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teste Phoenix et les migrations Ecto avec SQLite local.`)
};

const uk_docsverificationelixirboundary3 = /** @type {(inputs: Docsverificationelixirboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевіряє Phoenix і міграції Ecto на локальній SQLite.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationelixirboundary3(inputs)
	if (locale === "zh") return zh_docsverificationelixirboundary3(inputs)
	if (locale === "ja") return ja_docsverificationelixirboundary3(inputs)
	if (locale === "ko") return ko_docsverificationelixirboundary3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationelixirboundary3(inputs)
	if (locale === "de") return de_docsverificationelixirboundary3(inputs)
	if (locale === "fr") return fr_docsverificationelixirboundary3(inputs)
	if (locale === "uk") return uk_docsverificationelixirboundary3(inputs)
	return en_docsverificationelixirboundary3(inputs)
});
export { docsverificationelixirboundary3 as "docsVerificationElixirBoundary" }