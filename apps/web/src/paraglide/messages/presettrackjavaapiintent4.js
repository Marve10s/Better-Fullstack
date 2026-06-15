/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackjavaapiintent4Inputs */

const en_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ship Spring services`)
};

const es_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lanzar servicios Spring`)
};

const zh_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发布 Spring 服务`)
};

/**
* | output |
* | --- |
* | "Ship Spring services" |
*
* @param {Presettrackjavaapiintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapiintent4 = /** @type {((inputs?: Presettrackjavaapiintent4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapiintent4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackjavaapiintent4(inputs)
	if (locale === "es") return es_presettrackjavaapiintent4(inputs)
	return zh_presettrackjavaapiintent4(inputs)
});
export { presettrackjavaapiintent4 as "presetTrackJavaApiIntent" }