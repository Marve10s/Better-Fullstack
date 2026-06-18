/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareheading1Inputs */

const en_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How does Better Fullstack compare?`)
};

const es_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Cómo se compara Better Fullstack?`)
};

const zh_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack 有什么不同？`)
};

const ja_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack との比較はどうですか?`)
};

const ko_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack은(는) 어떻게 비교되나요?`)
};

const zh_hant1_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack 有什麼不同？`)
};

const de_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wie schneidet Better Fullstack im Vergleich ab?`)
};

const fr_compareheading1 = /** @type {(inputs: Compareheading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comment Better Fullstack se compare-t-il ?`)
};

/**
* | output |
* | --- |
* | "How does Better Fullstack compare?" |
*
* @param {Compareheading1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareheading1 = /** @type {((inputs?: Compareheading1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareheading1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareheading1(inputs)
	if (locale === "es") return es_compareheading1(inputs)
	if (locale === "zh") return zh_compareheading1(inputs)
	if (locale === "ja") return ja_compareheading1(inputs)
	if (locale === "ko") return ko_compareheading1(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareheading1(inputs)
	if (locale === "de") return de_compareheading1(inputs)
	return fr_compareheading1(inputs)
});
export { compareheading1 as "compareHeading" }