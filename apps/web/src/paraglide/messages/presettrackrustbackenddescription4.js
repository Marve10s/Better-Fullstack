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

/**
* | output |
* | --- |
* | "Axum and SeaORM for a compact Rust backend with typed persistence and observability hooks." |
*
* @param {Presettrackrustbackenddescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackenddescription4 = /** @type {((inputs?: Presettrackrustbackenddescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackenddescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrustbackenddescription4(inputs)
	if (locale === "es") return es_presettrackrustbackenddescription4(inputs)
	return zh_presettrackrustbackenddescription4(inputs)
});
export { presettrackrustbackenddescription4 as "presetTrackRustBackendDescription" }