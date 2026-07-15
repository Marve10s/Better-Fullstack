/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Launchradarheadline2Inputs */

const en_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} new stack choices, now in the builder.`)
};

/** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */
const es_launchradarheadline2 = en_launchradarheadline2;

/** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */
const zh_launchradarheadline2 = en_launchradarheadline2;

/** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */
const ja_launchradarheadline2 = en_launchradarheadline2;

/** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */
const ko_launchradarheadline2 = en_launchradarheadline2;

/** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */
const zh_hant1_launchradarheadline2 = zh_launchradarheadline2;

/** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */
const de_launchradarheadline2 = en_launchradarheadline2;

/** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */
const fr_launchradarheadline2 = en_launchradarheadline2;

/** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */
const uk_launchradarheadline2 = en_launchradarheadline2;

/**
* | output |
* | --- |
* | "{count} new stack choices, now in the builder." |
*
* @param {Launchradarheadline2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarheadline2 = /** @type {((inputs: Launchradarheadline2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarheadline2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_launchradarheadline2(inputs)
	if (locale === "es") return es_launchradarheadline2(inputs)
	if (locale === "zh") return zh_launchradarheadline2(inputs)
	if (locale === "ja") return ja_launchradarheadline2(inputs)
	if (locale === "ko") return ko_launchradarheadline2(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarheadline2(inputs)
	if (locale === "de") return de_launchradarheadline2(inputs)
	if (locale === "fr") return fr_launchradarheadline2(inputs)
	return uk_launchradarheadline2(inputs)
});
export { launchradarheadline2 as "launchRadarHeadline" }