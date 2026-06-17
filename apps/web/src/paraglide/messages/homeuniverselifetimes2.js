/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeuniverselifetimes2Inputs */

const en_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`universe lifetimes`)
};

const es_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`vidas del universo`)
};

const zh_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`个宇宙寿命`)
};

const ja_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`宇宙の生涯`)
};

const ko_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`우주 수명`)
};

const zh_hant1_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`個宇宙壽命`)
};

const de_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Universumslebensdauern`)
};

const fr_homeuniverselifetimes2 = /** @type {(inputs: Homeuniverselifetimes2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`durées de vie de l'univers`)
};

/**
* | output |
* | --- |
* | "universe lifetimes" |
*
* @param {Homeuniverselifetimes2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homeuniverselifetimes2 = /** @type {((inputs?: Homeuniverselifetimes2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeuniverselifetimes2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeuniverselifetimes2(inputs)
	if (locale === "es") return es_homeuniverselifetimes2(inputs)
	if (locale === "zh") return zh_homeuniverselifetimes2(inputs)
	if (locale === "ja") return ja_homeuniverselifetimes2(inputs)
	if (locale === "ko") return ko_homeuniverselifetimes2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeuniverselifetimes2(inputs)
	if (locale === "de") return de_homeuniverselifetimes2(inputs)
	return fr_homeuniverselifetimes2(inputs)
});
export { homeuniverselifetimes2 as "homeUniverseLifetimes" }