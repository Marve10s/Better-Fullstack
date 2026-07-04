/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeinfinite1Inputs */

const en_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Infinite`)
};

const es_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Posibilidades`)
};

const zh_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无限`)
};

const ja_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無限`)
};

const ko_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`무한`)
};

const zh_hant1_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無限`)
};

const de_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unendlich`)
};

const fr_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Infini`)
};

/**
* | output |
* | --- |
* | "Infinite" |
*
* @param {Homeinfinite1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homeinfinite1 = /** @type {((inputs?: Homeinfinite1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeinfinite1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeinfinite1(inputs)
	if (locale === "es") return es_homeinfinite1(inputs)
	if (locale === "zh") return zh_homeinfinite1(inputs)
	if (locale === "ja") return ja_homeinfinite1(inputs)
	if (locale === "ko") return ko_homeinfinite1(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeinfinite1(inputs)
	if (locale === "de") return de_homeinfinite1(inputs)
	return fr_homeinfinite1(inputs)
});
export { homeinfinite1 as "homeInfinite" }