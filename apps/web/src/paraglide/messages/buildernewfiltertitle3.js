/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, ecosystem: NonNullable<unknown> }} Buildernewfiltertitle3Inputs */

const en_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Show ${i?.count} new options available in ${i?.ecosystem}`)
};

/** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */
const es_buildernewfiltertitle3 = en_buildernewfiltertitle3;

/** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */
const zh_buildernewfiltertitle3 = en_buildernewfiltertitle3;

/** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */
const ja_buildernewfiltertitle3 = en_buildernewfiltertitle3;

/** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */
const ko_buildernewfiltertitle3 = en_buildernewfiltertitle3;

/** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */
const zh_hant1_buildernewfiltertitle3 = zh_buildernewfiltertitle3;

/** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */
const de_buildernewfiltertitle3 = en_buildernewfiltertitle3;

/** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */
const fr_buildernewfiltertitle3 = en_buildernewfiltertitle3;

/** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */
const uk_buildernewfiltertitle3 = en_buildernewfiltertitle3;

/**
* | output |
* | --- |
* | "Show {count} new options available in {ecosystem}" |
*
* @param {Buildernewfiltertitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewfiltertitle3 = /** @type {((inputs: Buildernewfiltertitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewfiltertitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernewfiltertitle3(inputs)
	if (locale === "es") return es_buildernewfiltertitle3(inputs)
	if (locale === "zh") return zh_buildernewfiltertitle3(inputs)
	if (locale === "ja") return ja_buildernewfiltertitle3(inputs)
	if (locale === "ko") return ko_buildernewfiltertitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernewfiltertitle3(inputs)
	if (locale === "de") return de_buildernewfiltertitle3(inputs)
	if (locale === "fr") return fr_buildernewfiltertitle3(inputs)
	return uk_buildernewfiltertitle3(inputs)
});
export { buildernewfiltertitle3 as "builderNewFilterTitle" }