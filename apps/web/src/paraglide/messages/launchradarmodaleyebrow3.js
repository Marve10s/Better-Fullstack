/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Launchradarmodaleyebrow3Inputs */

const en_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`July drop / Development`)
};

const es_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Drop de julio / Development`)
};

const zh_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七月上新 / Development`)
};

const ja_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7月ドロップ / Development`)
};

const ko_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7월 드롭 / Development`)
};

const zh_hant1_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七月上新 / Development`)
};

const de_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Juli-Drop / Development`)
};

const fr_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Drop de juillet / Development`)
};

const uk_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Липневий дроп / Development`)
};

/**
* | output |
* | --- |
* | "July drop / Development" |
*
* @param {Launchradarmodaleyebrow3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarmodaleyebrow3 = /** @type {((inputs?: Launchradarmodaleyebrow3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarmodaleyebrow3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_launchradarmodaleyebrow3(inputs)
	if (locale === "zh") return zh_launchradarmodaleyebrow3(inputs)
	if (locale === "ja") return ja_launchradarmodaleyebrow3(inputs)
	if (locale === "ko") return ko_launchradarmodaleyebrow3(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarmodaleyebrow3(inputs)
	if (locale === "de") return de_launchradarmodaleyebrow3(inputs)
	if (locale === "fr") return fr_launchradarmodaleyebrow3(inputs)
	if (locale === "uk") return uk_launchradarmodaleyebrow3(inputs)
	return en_launchradarmodaleyebrow3(inputs)
});
export { launchradarmodaleyebrow3 as "launchRadarModalEyebrow" }