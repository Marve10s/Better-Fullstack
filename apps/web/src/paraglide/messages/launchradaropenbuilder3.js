/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Launchradaropenbuilder3Inputs */

const en_launchradaropenbuilder3 = /** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Open ${i?.ecosystem} additions`)
};

/** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */
const es_launchradaropenbuilder3 = en_launchradaropenbuilder3;

/** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */
const zh_launchradaropenbuilder3 = en_launchradaropenbuilder3;

/** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */
const ja_launchradaropenbuilder3 = en_launchradaropenbuilder3;

/** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */
const ko_launchradaropenbuilder3 = en_launchradaropenbuilder3;

/** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */
const zh_hant1_launchradaropenbuilder3 = zh_launchradaropenbuilder3;

/** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */
const de_launchradaropenbuilder3 = en_launchradaropenbuilder3;

/** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */
const fr_launchradaropenbuilder3 = en_launchradaropenbuilder3;

/** @type {(inputs: Launchradaropenbuilder3Inputs) => LocalizedString} */
const uk_launchradaropenbuilder3 = en_launchradaropenbuilder3;

/**
* | output |
* | --- |
* | "Open {ecosystem} additions" |
*
* @param {Launchradaropenbuilder3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradaropenbuilder3 = /** @type {((inputs: Launchradaropenbuilder3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradaropenbuilder3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_launchradaropenbuilder3(inputs)
	if (locale === "es") return es_launchradaropenbuilder3(inputs)
	if (locale === "zh") return zh_launchradaropenbuilder3(inputs)
	if (locale === "ja") return ja_launchradaropenbuilder3(inputs)
	if (locale === "ko") return ko_launchradaropenbuilder3(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradaropenbuilder3(inputs)
	if (locale === "de") return de_launchradaropenbuilder3(inputs)
	if (locale === "fr") return fr_launchradaropenbuilder3(inputs)
	return uk_launchradaropenbuilder3(inputs)
});
export { launchradaropenbuilder3 as "launchRadarOpenBuilder" }