/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runcolagent2Inputs */

const en_runcolagent2 = /** @type {(inputs: Runcolagent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent`)
};

const es_runcolagent2 = /** @type {(inputs: Runcolagent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agente`)
};

const zh_runcolagent2 = /** @type {(inputs: Runcolagent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理人`)
};

const ja_runcolagent2 = /** @type {(inputs: Runcolagent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェント`)
};

const ko_runcolagent2 = /** @type {(inputs: Runcolagent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`대리인`)
};

const zh_hant1_runcolagent2 = /** @type {(inputs: Runcolagent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理人`)
};

const de_runcolagent2 = /** @type {(inputs: Runcolagent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent`)
};

const fr_runcolagent2 = /** @type {(inputs: Runcolagent2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent`)
};

/**
* | output |
* | --- |
* | "Agent" |
*
* @param {Runcolagent2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runcolagent2 = /** @type {((inputs?: Runcolagent2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runcolagent2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runcolagent2(inputs)
	if (locale === "es") return es_runcolagent2(inputs)
	if (locale === "zh") return zh_runcolagent2(inputs)
	if (locale === "ja") return ja_runcolagent2(inputs)
	if (locale === "ko") return ko_runcolagent2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runcolagent2(inputs)
	if (locale === "de") return de_runcolagent2(inputs)
	return fr_runcolagent2(inputs)
});
export { runcolagent2 as "runColAgent" }