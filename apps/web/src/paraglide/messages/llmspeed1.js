/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmspeed1Inputs */

const en_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Speed`)
};

const es_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Velocidad`)
};

const zh_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`速度`)
};

const ja_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スピード`)
};

const ko_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`속도`)
};

const zh_hant1_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`速度`)
};

const de_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Geschwindigkeit`)
};

const fr_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vitesse`)
};

/**
* | output |
* | --- |
* | "Speed" |
*
* @param {Llmspeed1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmspeed1 = /** @type {((inputs?: Llmspeed1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmspeed1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmspeed1(inputs)
	if (locale === "es") return es_llmspeed1(inputs)
	if (locale === "zh") return zh_llmspeed1(inputs)
	if (locale === "ja") return ja_llmspeed1(inputs)
	if (locale === "ko") return ko_llmspeed1(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmspeed1(inputs)
	if (locale === "de") return de_llmspeed1(inputs)
	return fr_llmspeed1(inputs)
});
export { llmspeed1 as "llmSpeed" }