/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcometimeoutnote3Inputs */

const en_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const es_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const zh_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const ja_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const ko_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const zh_hant1_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const de_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const fr_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const uk_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

/**
* | output |
* | --- |
* | "The agent hit the 30 minute cap. Counted as a failure." |
*
* @param {Fixproofoutcometimeoutnote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcometimeoutnote3 = /** @type {((inputs?: Fixproofoutcometimeoutnote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcometimeoutnote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcometimeoutnote3(inputs)
	if (locale === "zh") return zh_fixproofoutcometimeoutnote3(inputs)
	if (locale === "ja") return ja_fixproofoutcometimeoutnote3(inputs)
	if (locale === "ko") return ko_fixproofoutcometimeoutnote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcometimeoutnote3(inputs)
	if (locale === "de") return de_fixproofoutcometimeoutnote3(inputs)
	if (locale === "fr") return fr_fixproofoutcometimeoutnote3(inputs)
	if (locale === "uk") return uk_fixproofoutcometimeoutnote3(inputs)
	return en_fixproofoutcometimeoutnote3(inputs)
});
export { fixproofoutcometimeoutnote3 as "fixproofOutcomeTimeoutNote" }