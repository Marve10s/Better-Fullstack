/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Buildernewempty2Inputs */

const en_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`There are no additions from this release in ${i?.ecosystem}.`)
};

/** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */
const es_buildernewempty2 = en_buildernewempty2;

/** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */
const zh_buildernewempty2 = en_buildernewempty2;

/** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */
const ja_buildernewempty2 = en_buildernewempty2;

/** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */
const ko_buildernewempty2 = en_buildernewempty2;

/** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */
const zh_hant1_buildernewempty2 = zh_buildernewempty2;

/** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */
const de_buildernewempty2 = en_buildernewempty2;

/** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */
const fr_buildernewempty2 = en_buildernewempty2;

/** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */
const uk_buildernewempty2 = en_buildernewempty2;

/**
* | output |
* | --- |
* | "There are no additions from this release in {ecosystem}." |
*
* @param {Buildernewempty2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewempty2 = /** @type {((inputs: Buildernewempty2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewempty2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernewempty2(inputs)
	if (locale === "es") return es_buildernewempty2(inputs)
	if (locale === "zh") return zh_buildernewempty2(inputs)
	if (locale === "ja") return ja_buildernewempty2(inputs)
	if (locale === "ko") return ko_buildernewempty2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernewempty2(inputs)
	if (locale === "de") return de_buildernewempty2(inputs)
	if (locale === "fr") return fr_buildernewempty2(inputs)
	return uk_buildernewempty2(inputs)
});
export { buildernewempty2 as "builderNewEmpty" }