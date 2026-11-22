/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationdotnetboundary3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Prueba ASP.NET y EF Core con la base de datos SQLite local generada.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用生成的本地 SQLite 数据库测试 ASP.NET 和 EF Core。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成されたローカル SQLite データベースで ASP.NET と EF Core をテストします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성된 로컬 SQLite 데이터베이스로 ASP.NET과 EF Core를 테스트합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用產生的本機 SQLite 資料庫測試 ASP.NET 與 EF Core。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testet ASP.NET und EF Core mit der generierten lokalen SQLite-Datenbank.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Teste ASP.NET et EF Core avec la base de données SQLite locale générée.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевіряє ASP.NET і EF Core зі згенерованою локальною базою даних SQLite.")
	return /** @type {LocalizedString} */ ("Exercises ASP.NET and EF Core with the generated local SQLite database.")
});
export { docsverificationdotnetboundary3 as "docsVerificationDotnetBoundary" }