/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerinspiredby2Inputs */

const en_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Originally inspired by`)
};

const es_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inspirado originalmente por`)
};

const zh_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最初灵感来自`)
};

const ja_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`もともとインスピレーションを得たのは、`)
};

const ko_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`원래 영감을 받아`)
};

const zh_hant1_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最初靈感來自`)
};

const de_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ursprünglich inspiriert von`)
};

const fr_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inspiré à l'origine par`)
};

/**
* | output |
* | --- |
* | "Originally inspired by" |
*
* @param {Footerinspiredby2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const footerinspiredby2 = /** @type {((inputs?: Footerinspiredby2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerinspiredby2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footerinspiredby2(inputs)
	if (locale === "es") return es_footerinspiredby2(inputs)
	if (locale === "zh") return zh_footerinspiredby2(inputs)
	if (locale === "ja") return ja_footerinspiredby2(inputs)
	if (locale === "ko") return ko_footerinspiredby2(inputs)
	if (locale === "zh-Hant") return zh_hant1_footerinspiredby2(inputs)
	if (locale === "de") return de_footerinspiredby2(inputs)
	return fr_footerinspiredby2(inputs)
});
export { footerinspiredby2 as "footerInspiredBy" }