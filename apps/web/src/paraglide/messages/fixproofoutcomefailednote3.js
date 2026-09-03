/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomefailednote3Inputs */

const en_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const es_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const zh_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const ja_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const ko_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const zh_hant1_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const de_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const fr_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const uk_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

/**
* | output |
* | --- |
* | "The agent finished inside the cap and no requirement moved." |
*
* @param {Fixproofoutcomefailednote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomefailednote3 = /** @type {((inputs?: Fixproofoutcomefailednote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomefailednote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomefailednote3(inputs)
	if (locale === "zh") return zh_fixproofoutcomefailednote3(inputs)
	if (locale === "ja") return ja_fixproofoutcomefailednote3(inputs)
	if (locale === "ko") return ko_fixproofoutcomefailednote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomefailednote3(inputs)
	if (locale === "de") return de_fixproofoutcomefailednote3(inputs)
	if (locale === "fr") return fr_fixproofoutcomefailednote3(inputs)
	if (locale === "uk") return uk_fixproofoutcomefailednote3(inputs)
	return en_fixproofoutcomefailednote3(inputs)
});
export { fixproofoutcomefailednote3 as "fixproofOutcomeFailedNote" }