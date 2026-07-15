/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernewfilter2Inputs */

const en_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New in this release`)
};

/** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */
const es_buildernewfilter2 = en_buildernewfilter2;

/** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */
const zh_buildernewfilter2 = en_buildernewfilter2;

/** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */
const ja_buildernewfilter2 = en_buildernewfilter2;

/** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */
const ko_buildernewfilter2 = en_buildernewfilter2;

/** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */
const zh_hant1_buildernewfilter2 = zh_buildernewfilter2;

/** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */
const de_buildernewfilter2 = en_buildernewfilter2;

/** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */
const fr_buildernewfilter2 = en_buildernewfilter2;

/** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */
const uk_buildernewfilter2 = en_buildernewfilter2;

/**
* | output |
* | --- |
* | "New in this release" |
*
* @param {Buildernewfilter2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewfilter2 = /** @type {((inputs?: Buildernewfilter2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewfilter2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernewfilter2(inputs)
	if (locale === "es") return es_buildernewfilter2(inputs)
	if (locale === "zh") return zh_buildernewfilter2(inputs)
	if (locale === "ja") return ja_buildernewfilter2(inputs)
	if (locale === "ko") return ko_buildernewfilter2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernewfilter2(inputs)
	if (locale === "de") return de_buildernewfilter2(inputs)
	if (locale === "fr") return fr_buildernewfilter2(inputs)
	return uk_buildernewfilter2(inputs)
});
export { buildernewfilter2 as "builderNewFilter" }