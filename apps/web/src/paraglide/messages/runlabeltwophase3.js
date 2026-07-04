/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runlabeltwophase3Inputs */

const en_runlabeltwophase3 = /** @type {(inputs: Runlabeltwophase3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`two-phase`)
};

const es_runlabeltwophase3 = /** @type {(inputs: Runlabeltwophase3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`bifásico`)
};

const zh_runlabeltwophase3 = /** @type {(inputs: Runlabeltwophase3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`两相`)
};

const ja_runlabeltwophase3 = /** @type {(inputs: Runlabeltwophase3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2相`)
};

const ko_runlabeltwophase3 = /** @type {(inputs: Runlabeltwophase3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2상`)
};

const zh_hant1_runlabeltwophase3 = /** @type {(inputs: Runlabeltwophase3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`兩相`)
};

const de_runlabeltwophase3 = /** @type {(inputs: Runlabeltwophase3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`zweiphasig`)
};

const fr_runlabeltwophase3 = /** @type {(inputs: Runlabeltwophase3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`biphasé`)
};

/**
* | output |
* | --- |
* | "two-phase" |
*
* @param {Runlabeltwophase3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runlabeltwophase3 = /** @type {((inputs?: Runlabeltwophase3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runlabeltwophase3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runlabeltwophase3(inputs)
	if (locale === "es") return es_runlabeltwophase3(inputs)
	if (locale === "zh") return zh_runlabeltwophase3(inputs)
	if (locale === "ja") return ja_runlabeltwophase3(inputs)
	if (locale === "ko") return ko_runlabeltwophase3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runlabeltwophase3(inputs)
	if (locale === "de") return de_runlabeltwophase3(inputs)
	return fr_runlabeltwophase3(inputs)
});
export { runlabeltwophase3 as "runLabelTwoPhase" }