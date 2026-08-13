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
	return /** @type {LocalizedString} */ (`亲自重现`)
};

const ja_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`それを再現する`)
};

const ko_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복제하세요`)
};

const zh_hant1_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自行重現`)
};

const de_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduziere es`)
};

const fr_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduisez-le`)
};

const uk_runheroeyebrow2 = /** @type {(inputs: Runheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відтворіть самі`)
};

/**
* | output |
* | --- |
* | "Reproduce it" |
*
* @param {Runheroeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runheroeyebrow2 = /** @type {((inputs?: Runheroeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runheroeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runheroeyebrow2(inputs)
	if (locale === "zh") return zh_runheroeyebrow2(inputs)
	if (locale === "ja") return ja_runheroeyebrow2(inputs)
	if (locale === "ko") return ko_runheroeyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runheroeyebrow2(inputs)
	if (locale === "de") return de_runheroeyebrow2(inputs)
	if (locale === "fr") return fr_runheroeyebrow2(inputs)
	if (locale === "uk") return uk_runheroeyebrow2(inputs)
	return en_runheroeyebrow2(inputs)
});
export { runheroeyebrow2 as "runHeroEyebrow" }