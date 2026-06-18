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

const ja_presettrackjavaapiname4 = /** @type {(inputs: Presettrackjavaapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API`)
};

const ko_presettrackjavaapiname4 = /** @type {(inputs: Presettrackjavaapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`자바 API`)
};

const zh_hant1_presettrackjavaapiname4 = /** @type {(inputs: Presettrackjavaapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API`)
};

const de_presettrackjavaapiname4 = /** @type {(inputs: Presettrackjavaapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API`)
};

const fr_presettrackjavaapiname4 = /** @type {(inputs: Presettrackjavaapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java API`)
};

/**
* | output |
* | --- |
* | "Java API" |
*
* @param {Presettrackjavaapiname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapiname4 = /** @type {((inputs?: Presettrackjavaapiname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapiname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackjavaapiname4(inputs)
	if (locale === "es") return es_presettrackjavaapiname4(inputs)
	if (locale === "zh") return zh_presettrackjavaapiname4(inputs)
	if (locale === "ja") return ja_presettrackjavaapiname4(inputs)
	if (locale === "ko") return ko_presettrackjavaapiname4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackjavaapiname4(inputs)
	if (locale === "de") return de_presettrackjavaapiname4(inputs)
	return fr_presettrackjavaapiname4(inputs)
});
export { presettrackjavaapiname4 as "presetTrackJavaApiName" }