/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrustbackenddescription4Inputs */



/**
* | output |
* | --- |
* | "Axum and SeaORM for a compact Rust backend with typed persistence and observability hooks." |
*
* @param {Presettrackrustbackenddescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackenddescription4 = /** @type {((inputs?: Presettrackrustbackenddescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackenddescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Axum y SeaORM para un backend Rust compacto con persistencia tipada y hooks de observabilidad.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Axum 和 SeaORM，用于紧凑的 Rust 后端，包含类型化持久化和可观测性 hooks。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Axum および SeaORM は、型付き永続性と可観測性フックを備えたコンパクトな Rust バックエンド用です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("형식화된 지속성 및 관찰 가능성 후크가 있는 컴팩트 Rust 백엔드용 Axum 및 SeaORM.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Axum 和 SeaORM，用於緊湊的 Rust 後端，包含類型化持久化和可觀測性 hooks。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Axum und SeaORM für ein kompaktes Rust-Backend mit typisierten Persistenz- und Observability-Hooks.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Axum et SeaORM pour un backend Rust compact avec des hooks de persistance et d'observabilité typés.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Axum і SeaORM для компактного Rust-бекенду з типізованою persistence-логікою та observability.")
	return /** @type {LocalizedString} */ ("Axum and SeaORM for a compact Rust backend with typed persistence and observability hooks.")
});
export { presettrackrustbackenddescription4 as "presetTrackRustBackendDescription" }