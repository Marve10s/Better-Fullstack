/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandomtitle2Inputs */

const en_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate a random stack`)
};

const es_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generar un stack aleatorio`)
};

const zh_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成随机 stack`)
};

const ja_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランダムなスタックを生成する`)
};

const ko_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`무작위 스택 생성`)
};

const zh_hant1_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`產生隨機 stack`)
};

const de_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erzeuge einen zufälligen Stapel`)
};

const fr_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Générer une pile aléatoire`)
};

/**
* | output |
* | --- |
* | "Generate a random stack" |
*
* @param {Builderrandomtitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderrandomtitle2 = /** @type {((inputs?: Builderrandomtitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandomtitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrandomtitle2(inputs)
	if (locale === "es") return es_builderrandomtitle2(inputs)
	if (locale === "zh") return zh_builderrandomtitle2(inputs)
	if (locale === "ja") return ja_builderrandomtitle2(inputs)
	if (locale === "ko") return ko_builderrandomtitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrandomtitle2(inputs)
	if (locale === "de") return de_builderrandomtitle2(inputs)
	return fr_builderrandomtitle2(inputs)
});
export { builderrandomtitle2 as "builderRandomTitle" }