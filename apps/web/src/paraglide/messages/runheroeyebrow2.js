/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runheroeyebrow2Inputs */

const en_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduce it`)
};

const es_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproducirlo`)
};

const zh_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重现此问题`)
};

const ja_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`それを再現する`)
};

const ko_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복제하세요`)
};

const zh_hant1_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重現此問題`)
};

const de_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduziere es`)
};

const fr_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduisez-le`)
};

/**
* | output |
* | --- |
* | "Reproduce it" |
*
* @param {Runheroeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runheroeyebrow2 = /** @type {((inputs?: Runheroeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runheroeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runheroeyebrow2(inputs)
	if (locale === "es") return es_runheroeyebrow2(inputs)
	if (locale === "zh") return zh_runheroeyebrow2(inputs)
	if (locale === "ja") return ja_runheroeyebrow2(inputs)
	if (locale === "ko") return ko_runheroeyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runheroeyebrow2(inputs)
	if (locale === "de") return de_runheroeyebrow2(inputs)
	return fr_runheroeyebrow2(inputs)
});
export { runheroeyebrow2 as "runHeroEyebrow" }