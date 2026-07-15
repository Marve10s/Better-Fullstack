/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Launchradarmodaldescription3Inputs */

const en_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} new libraries and tools across four ecosystems, organized so you can jump straight to what matters.`)
};

/** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */
const es_launchradarmodaldescription3 = en_launchradarmodaldescription3;

/** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */
const zh_launchradarmodaldescription3 = en_launchradarmodaldescription3;

/** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */
const ja_launchradarmodaldescription3 = en_launchradarmodaldescription3;

/** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */
const ko_launchradarmodaldescription3 = en_launchradarmodaldescription3;

/** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */
const zh_hant1_launchradarmodaldescription3 = zh_launchradarmodaldescription3;

/** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */
const de_launchradarmodaldescription3 = en_launchradarmodaldescription3;

/** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */
const fr_launchradarmodaldescription3 = en_launchradarmodaldescription3;

/** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */
const uk_launchradarmodaldescription3 = en_launchradarmodaldescription3;

/**
* | output |
* | --- |
* | "{count} new libraries and tools across four ecosystems, organized so you can jump straight to what matters." |
*
* @param {Launchradarmodaldescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarmodaldescription3 = /** @type {((inputs: Launchradarmodaldescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarmodaldescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_launchradarmodaldescription3(inputs)
	if (locale === "es") return es_launchradarmodaldescription3(inputs)
	if (locale === "zh") return zh_launchradarmodaldescription3(inputs)
	if (locale === "ja") return ja_launchradarmodaldescription3(inputs)
	if (locale === "ko") return ko_launchradarmodaldescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarmodaldescription3(inputs)
	if (locale === "de") return de_launchradarmodaldescription3(inputs)
	if (locale === "fr") return fr_launchradarmodaldescription3(inputs)
	return uk_launchradarmodaldescription3(inputs)
});
export { launchradarmodaldescription3 as "launchRadarModalDescription" }