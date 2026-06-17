/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homethatis2Inputs */

const en_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`that's`)
};

const es_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`eso es`)
};

const zh_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`也就是`)
};

const ja_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`それは`)
};

const ko_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`그건`)
};

const zh_hant1_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`也就是`)
};

const de_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`das ist`)
};

const fr_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`c'est`)
};

/**
* | output |
* | --- |
* | "that's" |
*
* @param {Homethatis2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homethatis2 = /** @type {((inputs?: Homethatis2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homethatis2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homethatis2(inputs)
	if (locale === "es") return es_homethatis2(inputs)
	if (locale === "zh") return zh_homethatis2(inputs)
	if (locale === "ja") return ja_homethatis2(inputs)
	if (locale === "ko") return ko_homethatis2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homethatis2(inputs)
	if (locale === "de") return de_homethatis2(inputs)
	return fr_homethatis2(inputs)
});
export { homethatis2 as "homeThatIs" }