/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Launchradarmodaltitle3Inputs */

const en_launchradarmodaltitle3 = /** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The builder just got much bigger.`)
};

/** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */
const es_launchradarmodaltitle3 = en_launchradarmodaltitle3;

/** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */
const zh_launchradarmodaltitle3 = en_launchradarmodaltitle3;

/** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */
const ja_launchradarmodaltitle3 = en_launchradarmodaltitle3;

/** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */
const ko_launchradarmodaltitle3 = en_launchradarmodaltitle3;

/** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */
const zh_hant1_launchradarmodaltitle3 = zh_launchradarmodaltitle3;

/** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */
const de_launchradarmodaltitle3 = en_launchradarmodaltitle3;

/** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */
const fr_launchradarmodaltitle3 = en_launchradarmodaltitle3;

/** @type {(inputs: Launchradarmodaltitle3Inputs) => LocalizedString} */
const uk_launchradarmodaltitle3 = en_launchradarmodaltitle3;

/**
* | output |
* | --- |
* | "The builder just got much bigger." |
*
* @param {Launchradarmodaltitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarmodaltitle3 = /** @type {((inputs?: Launchradarmodaltitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarmodaltitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_launchradarmodaltitle3(inputs)
	if (locale === "es") return es_launchradarmodaltitle3(inputs)
	if (locale === "zh") return zh_launchradarmodaltitle3(inputs)
	if (locale === "ja") return ja_launchradarmodaltitle3(inputs)
	if (locale === "ko") return ko_launchradarmodaltitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarmodaltitle3(inputs)
	if (locale === "de") return de_launchradarmodaltitle3(inputs)
	if (locale === "fr") return fr_launchradarmodaltitle3(inputs)
	return uk_launchradarmodaltitle3(inputs)
});
export { launchradarmodaltitle3 as "launchRadarModalTitle" }