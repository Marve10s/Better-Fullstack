/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationrustboundary3Inputs */

const en_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exercises the generated Clap info, start, and check commands with Axum and SeaORM on local SQLite, not a network database.`)
};

const es_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prueba los comandos info, start y check de Clap generados con Axum y SeaORM sobre SQLite local, no sobre una base de datos en red.`)
};

const zh_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在本地 SQLite 上结合 Axum 和 SeaORM 测试生成的 Clap info、start 和 check 命令，不包括网络数据库。`)
};

const ja_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成された Clap の info、start、check コマンドを、Axum と SeaORM を使ってローカル SQLite 上でテストします。ネットワークデータベースは対象外です。`)
};

const ko_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 Clap info, start, check 명령을 Axum 및 SeaORM과 함께 로컬 SQLite에서 테스트하며, 네트워크 데이터베이스는 테스트하지 않습니다.`)
};

const zh_hant1_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在本機 SQLite 上搭配 Axum 與 SeaORM 測試產生的 Clap info、start 與 check 指令，不包含網路資料庫。`)
};

const de_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testet die generierten Clap-Befehle info, start und check mit Axum und SeaORM auf lokalem SQLite, nicht mit einer Netzwerkdatenbank.`)
};

const fr_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teste les commandes Clap générées info, start et check avec Axum et SeaORM sur SQLite local, pas sur une base de données réseau.`)
};

const uk_docsverificationrustboundary3 = /** @type {(inputs: Docsverificationrustboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевіряє згенеровані команди Clap info, start і check з Axum і SeaORM на локальній SQLite, а не на мережевій базі даних.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationrustboundary3(inputs)
	if (locale === "zh") return zh_docsverificationrustboundary3(inputs)
	if (locale === "ja") return ja_docsverificationrustboundary3(inputs)
	if (locale === "ko") return ko_docsverificationrustboundary3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationrustboundary3(inputs)
	if (locale === "de") return de_docsverificationrustboundary3(inputs)
	if (locale === "fr") return fr_docsverificationrustboundary3(inputs)
	if (locale === "uk") return uk_docsverificationrustboundary3(inputs)
	return en_docsverificationrustboundary3(inputs)
});
export { docsverificationrustboundary3 as "docsVerificationRustBoundary" }