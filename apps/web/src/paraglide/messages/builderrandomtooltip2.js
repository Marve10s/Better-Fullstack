/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandomtooltip2Inputs */

const en_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate a random stack configuration`)
};

const es_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generar una configuración de stack aleatoria`)
};

const zh_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成一个随机的 stack 配置`)
};

const ja_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランダムなスタック構成を生成する`)
};

const ko_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`무작위 스택 구성 생성`)
};

const zh_hant1_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`產生一個隨機的 stack 配置`)
};

const de_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generieren Sie eine zufällige Stapelkonfiguration`)
};

const fr_builderrandomtooltip2 = /** @type {(inputs: Builderrandomtooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Générer une configuration de pile aléatoire`)
};

/**
* | output |
* | --- |
* | "Generate a random stack configuration" |
*
* @param {Builderrandomtooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderrandomtooltip2 = /** @type {((inputs?: Builderrandomtooltip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandomtooltip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrandomtooltip2(inputs)
	if (locale === "es") return es_builderrandomtooltip2(inputs)
	if (locale === "zh") return zh_builderrandomtooltip2(inputs)
	if (locale === "ja") return ja_builderrandomtooltip2(inputs)
	if (locale === "ko") return ko_builderrandomtooltip2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrandomtooltip2(inputs)
	if (locale === "de") return de_builderrandomtooltip2(inputs)
	return fr_builderrandomtooltip2(inputs)
});
export { builderrandomtooltip2 as "builderRandomTooltip" }