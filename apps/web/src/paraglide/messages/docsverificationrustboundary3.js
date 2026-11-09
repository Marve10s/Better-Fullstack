/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationrustboundary3Inputs */



/**
* | output |
* | --- |
* | "Exercises the generated Clap info, start, and check commands with Axum and SeaORM on local SQLite, not a network database." |
*
* @param {Docsverificationrustboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationrustboundary3 = /** @type {((inputs?: Docsverificationrustboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationrustboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Prueba los comandos info, start y check de Clap generados con Axum y SeaORM sobre SQLite local, no sobre una base de datos en red.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在本地 SQLite 上结合 Axum 和 SeaORM 测试生成的 Clap info、start 和 check 命令，不包括网络数据库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成された Clap の info、start、check コマンドを、Axum と SeaORM を使ってローカル SQLite 上でテストします。ネットワークデータベースは対象外です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성된 Clap info, start, check 명령을 Axum 및 SeaORM과 함께 로컬 SQLite에서 테스트하며, 네트워크 데이터베이스는 테스트하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在本機 SQLite 上搭配 Axum 與 SeaORM 測試產生的 Clap info、start 與 check 指令，不包含網路資料庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testet die generierten Clap-Befehle info, start und check mit Axum und SeaORM auf lokalem SQLite, nicht mit einer Netzwerkdatenbank.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Teste les commandes Clap générées info, start et check avec Axum et SeaORM sur SQLite local, pas sur une base de données réseau.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевіряє згенеровані команди Clap info, start і check з Axum і SeaORM на локальній SQLite, а не на мережевій базі даних.")
	return /** @type {LocalizedString} */ ("Exercises the generated Clap info, start, and check commands with Axum and SeaORM on local SQLite, not a network database.")
});
export { docsverificationrustboundary3 as "docsVerificationRustBoundary" }