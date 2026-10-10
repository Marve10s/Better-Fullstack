/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationdotnetboundary3Inputs */

const en_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exercises ASP.NET and EF Core with the generated local SQLite database.`)
};

const es_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prueba ASP.NET y EF Core con la base de datos SQLite local generada.`)
};

const zh_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用生成的本地 SQLite 数据库测试 ASP.NET 和 EF Core。`)
};

const ja_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成されたローカル SQLite データベースで ASP.NET と EF Core をテストします。`)
};

const ko_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 로컬 SQLite 데이터베이스로 ASP.NET과 EF Core를 테스트합니다.`)
};

const zh_hant1_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用產生的本機 SQLite 資料庫測試 ASP.NET 與 EF Core。`)
};

const de_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testet ASP.NET und EF Core mit der generierten lokalen SQLite-Datenbank.`)
};

const fr_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teste ASP.NET et EF Core avec la base de données SQLite locale générée.`)
};

const uk_docsverificationdotnetboundary3 = /** @type {(inputs: Docsverificationdotnetboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевіряє ASP.NET і EF Core зі згенерованою локальною базою даних SQLite.`)
};

/**
* | output |
* | --- |
* | "Exercises ASP.NET and EF Core with the generated local SQLite database." |
*
* @param {Docsverificationdotnetboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationdotnetboundary3 = /** @type {((inputs?: Docsverificationdotnetboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationdotnetboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationdotnetboundary3(inputs)
	if (locale === "zh") return zh_docsverificationdotnetboundary3(inputs)
	if (locale === "ja") return ja_docsverificationdotnetboundary3(inputs)
	if (locale === "ko") return ko_docsverificationdotnetboundary3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationdotnetboundary3(inputs)
	if (locale === "de") return de_docsverificationdotnetboundary3(inputs)
	if (locale === "fr") return fr_docsverificationdotnetboundary3(inputs)
	if (locale === "uk") return uk_docsverificationdotnetboundary3(inputs)
	return en_docsverificationdotnetboundary3(inputs)
});
export { docsverificationdotnetboundary3 as "docsVerificationDotnetBoundary" }