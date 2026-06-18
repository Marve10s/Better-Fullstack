/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrustbackenddescription4Inputs */

const en_presettrackrustbackenddescription4 = /** @type {(inputs: Presettrackrustbackenddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Axum and SeaORM for a compact Rust backend with typed persistence and observability hooks.`)
};

const es_presettrackrustbackenddescription4 = /** @type {(inputs: Presettrackrustbackenddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Axum y SeaORM para un backend Rust compacto con persistencia tipada y hooks de observabilidad.`)
};

const zh_presettrackrustbackenddescription4 = /** @type {(inputs: Presettrackrustbackenddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Axum 和 SeaORM，用于紧凑的 Rust 后端，包含类型化持久化和可观测性 hooks。`)
};

const ja_presettrackrustbackenddescription4 = /** @type {(inputs: Presettrackrustbackenddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Axum および SeaORM は、型付き永続性と可観測性フックを備えたコンパクトな Rust バックエンド用です。`)
};

const ko_presettrackrustbackenddescription4 = /** @type {(inputs: Presettrackrustbackenddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`형식화된 지속성 및 관찰 가능성 후크가 있는 컴팩트 Rust 백엔드용 Axum 및 SeaORM.`)
};

const zh_hant1_presettrackrustbackenddescription4 = /** @type {(inputs: Presettrackrustbackenddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Axum 和 SeaORM，用於緊湊的 Rust 後端，包含類型化持久化和可觀測性 hooks。`)
};

const de_presettrackrustbackenddescription4 = /** @type {(inputs: Presettrackrustbackenddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Axum und SeaORM für ein kompaktes Rust-Backend mit typisierten Persistenz- und Observability-Hooks.`)
};

const fr_presettrackrustbackenddescription4 = /** @type {(inputs: Presettrackrustbackenddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Axum et SeaORM pour un backend Rust compact avec des hooks de persistance et d'observabilité typés.`)
};

/**
* | output |
* | --- |
* | "Axum and SeaORM for a compact Rust backend with typed persistence and observability hooks." |
*
* @param {Presettrackrustbackenddescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackenddescription4 = /** @type {((inputs?: Presettrackrustbackenddescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackenddescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrustbackenddescription4(inputs)
	if (locale === "es") return es_presettrackrustbackenddescription4(inputs)
	if (locale === "zh") return zh_presettrackrustbackenddescription4(inputs)
	if (locale === "ja") return ja_presettrackrustbackenddescription4(inputs)
	if (locale === "ko") return ko_presettrackrustbackenddescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackrustbackenddescription4(inputs)
	if (locale === "de") return de_presettrackrustbackenddescription4(inputs)
	return fr_presettrackrustbackenddescription4(inputs)
});
export { presettrackrustbackenddescription4 as "presetTrackRustBackendDescription" }