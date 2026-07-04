/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrustbackendname4Inputs */

const en_presettrackrustbackendname4 = /** @type {(inputs: Presettrackrustbackendname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust Backend`)
};

const es_presettrackrustbackendname4 = /** @type {(inputs: Presettrackrustbackendname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend Rust`)
};

const zh_presettrackrustbackendname4 = /** @type {(inputs: Presettrackrustbackendname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 后端`)
};

const ja_presettrackrustbackendname4 = /** @type {(inputs: Presettrackrustbackendname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rustバックエンド`)
};

const ko_presettrackrustbackendname4 = /** @type {(inputs: Presettrackrustbackendname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`러스트 백엔드`)
};

const zh_hant1_presettrackrustbackendname4 = /** @type {(inputs: Presettrackrustbackendname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 後端`)
};

const de_presettrackrustbackendname4 = /** @type {(inputs: Presettrackrustbackendname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust-Backend`)
};

const fr_presettrackrustbackendname4 = /** @type {(inputs: Presettrackrustbackendname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back-end rouillé`)
};

/**
* | output |
* | --- |
* | "Rust Backend" |
*
* @param {Presettrackrustbackendname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackendname4 = /** @type {((inputs?: Presettrackrustbackendname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackendname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrustbackendname4(inputs)
	if (locale === "es") return es_presettrackrustbackendname4(inputs)
	if (locale === "zh") return zh_presettrackrustbackendname4(inputs)
	if (locale === "ja") return ja_presettrackrustbackendname4(inputs)
	if (locale === "ko") return ko_presettrackrustbackendname4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackrustbackendname4(inputs)
	if (locale === "de") return de_presettrackrustbackendname4(inputs)
	return fr_presettrackrustbackendname4(inputs)
});
export { presettrackrustbackendname4 as "presetTrackRustBackendName" }