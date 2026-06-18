/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsolo1Inputs */

const en_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo`)
};

const es_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo`)
};

const zh_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`单项目`)
};

const ja_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ソロ`)
};

const ko_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`독주`)
};

const zh_hant1_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`單項目`)
};

const de_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo`)
};

const fr_navsolo1 = /** @type {(inputs: Navsolo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo`)
};

/**
* | output |
* | --- |
* | "Solo" |
*
* @param {Navsolo1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navsolo1 = /** @type {((inputs?: Navsolo1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsolo1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navsolo1(inputs)
	if (locale === "es") return es_navsolo1(inputs)
	if (locale === "zh") return zh_navsolo1(inputs)
	if (locale === "ja") return ja_navsolo1(inputs)
	if (locale === "ko") return ko_navsolo1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navsolo1(inputs)
	if (locale === "de") return de_navsolo1(inputs)
	return fr_navsolo1(inputs)
});
export { navsolo1 as "navSolo" }