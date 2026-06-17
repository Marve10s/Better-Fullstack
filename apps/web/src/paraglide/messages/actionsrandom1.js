/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Actionsrandom1Inputs */

const en_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Random`)
};

const es_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aleatorio`)
};

const zh_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`随机`)
};

const ja_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランダム`)
};

const ko_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`무작위의`)
};

const zh_hant1_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隨機`)
};

const de_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zufällig`)
};

const fr_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aléatoire`)
};

/**
* | output |
* | --- |
* | "Random" |
*
* @param {Actionsrandom1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const actionsrandom1 = /** @type {((inputs?: Actionsrandom1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Actionsrandom1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_actionsrandom1(inputs)
	if (locale === "es") return es_actionsrandom1(inputs)
	if (locale === "zh") return zh_actionsrandom1(inputs)
	if (locale === "ja") return ja_actionsrandom1(inputs)
	if (locale === "ko") return ko_actionsrandom1(inputs)
	if (locale === "zh-Hant") return zh_hant1_actionsrandom1(inputs)
	if (locale === "de") return de_actionsrandom1(inputs)
	return fr_actionsrandom1(inputs)
});
export { actionsrandom1 as "actionsRandom" }