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

/**
* | output |
* | --- |
* | "Rust Backend" |
*
* @param {Presettrackrustbackendname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackendname4 = /** @type {((inputs?: Presettrackrustbackendname4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackendname4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrustbackendname4(inputs)
	if (locale === "es") return es_presettrackrustbackendname4(inputs)
	return zh_presettrackrustbackendname4(inputs)
});
export { presettrackrustbackendname4 as "presetTrackRustBackendName" }