/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navbuilder1Inputs */

const en_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder`)
};

const es_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor`)
};

const zh_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建器`)
};

const ja_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルダー`)
};

const ko_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌더`)
};

const zh_hant1_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建構器`)
};

const de_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Baumeister`)
};

const fr_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructeur`)
};

/**
* | output |
* | --- |
* | "Builder" |
*
* @param {Navbuilder1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navbuilder1 = /** @type {((inputs?: Navbuilder1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navbuilder1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navbuilder1(inputs)
	if (locale === "es") return es_navbuilder1(inputs)
	if (locale === "zh") return zh_navbuilder1(inputs)
	if (locale === "ja") return ja_navbuilder1(inputs)
	if (locale === "ko") return ko_navbuilder1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navbuilder1(inputs)
	if (locale === "de") return de_navbuilder1(inputs)
	return fr_navbuilder1(inputs)
});
export { navbuilder1 as "navBuilder" }