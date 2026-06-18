/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navshowcase1Inputs */

const en_navshowcase1 = /** @type {(inputs: Navshowcase1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Showcase`)
};

/** @type {(inputs: Navshowcase1Inputs) => LocalizedString} */
const es_navshowcase1 = en_navshowcase1;

/** @type {(inputs: Navshowcase1Inputs) => LocalizedString} */
const zh_navshowcase1 = en_navshowcase1;

/** @type {(inputs: Navshowcase1Inputs) => LocalizedString} */
const ja_navshowcase1 = en_navshowcase1;

/** @type {(inputs: Navshowcase1Inputs) => LocalizedString} */
const ko_navshowcase1 = en_navshowcase1;

/** @type {(inputs: Navshowcase1Inputs) => LocalizedString} */
const zh_hant1_navshowcase1 = zh_navshowcase1;

/** @type {(inputs: Navshowcase1Inputs) => LocalizedString} */
const de_navshowcase1 = en_navshowcase1;

/** @type {(inputs: Navshowcase1Inputs) => LocalizedString} */
const fr_navshowcase1 = en_navshowcase1;

/**
* | output |
* | --- |
* | "Showcase" |
*
* @param {Navshowcase1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navshowcase1 = /** @type {((inputs?: Navshowcase1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navshowcase1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navshowcase1(inputs)
	if (locale === "es") return es_navshowcase1(inputs)
	if (locale === "zh") return zh_navshowcase1(inputs)
	if (locale === "ja") return ja_navshowcase1(inputs)
	if (locale === "ko") return ko_navshowcase1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navshowcase1(inputs)
	if (locale === "de") return de_navshowcase1(inputs)
	return fr_navshowcase1(inputs)
});
export { navshowcase1 as "navShowcase" }