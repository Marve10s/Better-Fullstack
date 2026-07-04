/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagseyebrow2Inputs */

const en_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flags`)
};

const es_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Banderas`)
};

const zh_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`旗帜`)
};

const ja_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`旗`)
};

const ko_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`깃발`)
};

const zh_hant1_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`旗幟`)
};

const de_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flaggen`)
};

const fr_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`drapeaux`)
};

/**
* | output |
* | --- |
* | "Flags" |
*
* @param {Runflagseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runflagseyebrow2 = /** @type {((inputs?: Runflagseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagseyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runflagseyebrow2(inputs)
	if (locale === "es") return es_runflagseyebrow2(inputs)
	if (locale === "zh") return zh_runflagseyebrow2(inputs)
	if (locale === "ja") return ja_runflagseyebrow2(inputs)
	if (locale === "ko") return ko_runflagseyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagseyebrow2(inputs)
	if (locale === "de") return de_runflagseyebrow2(inputs)
	return fr_runflagseyebrow2(inputs)
});
export { runflagseyebrow2 as "runFlagsEyebrow" }