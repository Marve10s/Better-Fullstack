/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Launchradarexplore2Inputs */

const en_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`See what landed`)
};

/** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */
const es_launchradarexplore2 = en_launchradarexplore2;

/** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */
const zh_launchradarexplore2 = en_launchradarexplore2;

/** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */
const ja_launchradarexplore2 = en_launchradarexplore2;

/** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */
const ko_launchradarexplore2 = en_launchradarexplore2;

/** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */
const zh_hant1_launchradarexplore2 = zh_launchradarexplore2;

/** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */
const de_launchradarexplore2 = en_launchradarexplore2;

/** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */
const fr_launchradarexplore2 = en_launchradarexplore2;

/** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */
const uk_launchradarexplore2 = en_launchradarexplore2;

/**
* | output |
* | --- |
* | "See what landed" |
*
* @param {Launchradarexplore2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarexplore2 = /** @type {((inputs?: Launchradarexplore2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarexplore2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_launchradarexplore2(inputs)
	if (locale === "es") return es_launchradarexplore2(inputs)
	if (locale === "zh") return zh_launchradarexplore2(inputs)
	if (locale === "ja") return ja_launchradarexplore2(inputs)
	if (locale === "ko") return ko_launchradarexplore2(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarexplore2(inputs)
	if (locale === "de") return de_launchradarexplore2(inputs)
	if (locale === "fr") return fr_launchradarexplore2(inputs)
	return uk_launchradarexplore2(inputs)
});
export { launchradarexplore2 as "launchRadarExplore" }