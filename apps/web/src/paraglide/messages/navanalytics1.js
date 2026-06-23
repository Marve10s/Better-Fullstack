/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navanalytics1Inputs */

const en_navanalytics1 = /** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Analytics`)
};

/** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */
const es_navanalytics1 = en_navanalytics1;

/** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */
const zh_navanalytics1 = en_navanalytics1;

/** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */
const ja_navanalytics1 = en_navanalytics1;

/** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */
const ko_navanalytics1 = en_navanalytics1;

/** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */
const zh_hant1_navanalytics1 = zh_navanalytics1;

/** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */
const de_navanalytics1 = en_navanalytics1;

/** @type {(inputs: Navanalytics1Inputs) => LocalizedString} */
const fr_navanalytics1 = en_navanalytics1;

/**
* | output |
* | --- |
* | "Analytics" |
*
* @param {Navanalytics1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navanalytics1 = /** @type {((inputs?: Navanalytics1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navanalytics1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navanalytics1(inputs)
	if (locale === "es") return es_navanalytics1(inputs)
	if (locale === "zh") return zh_navanalytics1(inputs)
	if (locale === "ja") return ja_navanalytics1(inputs)
	if (locale === "ko") return ko_navanalytics1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navanalytics1(inputs)
	if (locale === "de") return de_navanalytics1(inputs)
	return fr_navanalytics1(inputs)
});
export { navanalytics1 as "navAnalytics" }