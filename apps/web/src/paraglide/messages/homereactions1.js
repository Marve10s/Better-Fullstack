/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homereactions1Inputs */

const en_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ reactions`)
};

const es_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ reacciones`)
};

const zh_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ 条互动`)
};

const ja_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ リアクション`)
};

const ko_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ 반응`)
};

const zh_hant1_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ 條互動`)
};

const de_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ Reaktionen`)
};

const fr_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ réactions`)
};

/**
* | output |
* | --- |
* | "+ reactions" |
*
* @param {Homereactions1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homereactions1 = /** @type {((inputs?: Homereactions1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homereactions1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homereactions1(inputs)
	if (locale === "es") return es_homereactions1(inputs)
	if (locale === "zh") return zh_homereactions1(inputs)
	if (locale === "ja") return ja_homereactions1(inputs)
	if (locale === "ko") return ko_homereactions1(inputs)
	if (locale === "zh-Hant") return zh_hant1_homereactions1(inputs)
	if (locale === "de") return de_homereactions1(inputs)
	return fr_homereactions1(inputs)
});
export { homereactions1 as "homeReactions" }