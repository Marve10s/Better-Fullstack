/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Launchradarmodaleyebrow3Inputs */

const en_launchradarmodaleyebrow3 = /** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`July drop / Development`)
};

/** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */
const es_launchradarmodaleyebrow3 = en_launchradarmodaleyebrow3;

/** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */
const zh_launchradarmodaleyebrow3 = en_launchradarmodaleyebrow3;

/** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */
const ja_launchradarmodaleyebrow3 = en_launchradarmodaleyebrow3;

/** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */
const ko_launchradarmodaleyebrow3 = en_launchradarmodaleyebrow3;

/** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */
const zh_hant1_launchradarmodaleyebrow3 = zh_launchradarmodaleyebrow3;

/** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */
const de_launchradarmodaleyebrow3 = en_launchradarmodaleyebrow3;

/** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */
const fr_launchradarmodaleyebrow3 = en_launchradarmodaleyebrow3;

/** @type {(inputs: Launchradarmodaleyebrow3Inputs) => LocalizedString} */
const uk_launchradarmodaleyebrow3 = en_launchradarmodaleyebrow3;

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
	if (locale === "en") return en_launchradarmodaleyebrow3(inputs)
	if (locale === "es") return es_launchradarmodaleyebrow3(inputs)
	if (locale === "zh") return zh_launchradarmodaleyebrow3(inputs)
	if (locale === "ja") return ja_launchradarmodaleyebrow3(inputs)
	if (locale === "ko") return ko_launchradarmodaleyebrow3(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarmodaleyebrow3(inputs)
	if (locale === "de") return de_launchradarmodaleyebrow3(inputs)
	if (locale === "fr") return fr_launchradarmodaleyebrow3(inputs)
	return uk_launchradarmodaleyebrow3(inputs)
});
export { launchradarmodaleyebrow3 as "launchRadarModalEyebrow" }