/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandom1Inputs */

const en_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Random`)
};

const es_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aleatorio`)
};

const zh_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`随机`)
};

const ja_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランダム`)
};

const ko_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`무작위의`)
};

const zh_hant1_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隨機`)
};

const de_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zufällig`)
};

const fr_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aléatoire`)
};

/**
* | output |
* | --- |
* | "Random" |
*
* @param {Builderrandom1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderrandom1 = /** @type {((inputs?: Builderrandom1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandom1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrandom1(inputs)
	if (locale === "es") return es_builderrandom1(inputs)
	if (locale === "zh") return zh_builderrandom1(inputs)
	if (locale === "ja") return ja_builderrandom1(inputs)
	if (locale === "ko") return ko_builderrandom1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrandom1(inputs)
	if (locale === "de") return de_builderrandom1(inputs)
	return fr_builderrandom1(inputs)
});
export { builderrandom1 as "builderRandom" }