/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackjavaapiname4Inputs */

const en_presettrackjavaapiname4 = /** @type {(inputs: Presettrackjavaapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API`)
};

const es_presettrackjavaapiname4 = /** @type {(inputs: Presettrackjavaapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API Java`)
};

const zh_presettrackjavaapiname4 = /** @type {(inputs: Presettrackjavaapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API`)
};

/**
* | output |
* | --- |
* | "Java API" |
*
* @param {Presettrackjavaapiname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapiname4 = /** @type {((inputs?: Presettrackjavaapiname4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapiname4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackjavaapiname4(inputs)
	if (locale === "es") return es_presettrackjavaapiname4(inputs)
	return zh_presettrackjavaapiname4(inputs)
});
export { presettrackjavaapiname4 as "presetTrackJavaApiName" }