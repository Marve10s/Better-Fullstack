/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrustbackendintent4Inputs */

const en_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prefer systems-grade APIs`)
};

const es_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preferir APIs de nivel sistemas`)
};

const zh_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`偏好系统级 API`)
};

/**
* | output |
* | --- |
* | "Prefer systems-grade APIs" |
*
* @param {Presettrackrustbackendintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackendintent4 = /** @type {((inputs?: Presettrackrustbackendintent4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackendintent4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrustbackendintent4(inputs)
	if (locale === "es") return es_presettrackrustbackendintent4(inputs)
	return zh_presettrackrustbackendintent4(inputs)
});
export { presettrackrustbackendintent4 as "presetTrackRustBackendIntent" }