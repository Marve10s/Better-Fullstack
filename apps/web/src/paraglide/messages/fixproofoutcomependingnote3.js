/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomependingnote3Inputs */

const en_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

const es_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

const zh_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

const ja_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

const ko_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

const zh_hant1_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

const de_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

const fr_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

const uk_fixproofoutcomependingnote3 = /** @type {(inputs: Fixproofoutcomependingnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run yet.`)
};

/**
* | output |
* | --- |
* | "Not run yet." |
*
* @param {Fixproofoutcomependingnote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomependingnote3 = /** @type {((inputs?: Fixproofoutcomependingnote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomependingnote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomependingnote3(inputs)
	if (locale === "zh") return zh_fixproofoutcomependingnote3(inputs)
	if (locale === "ja") return ja_fixproofoutcomependingnote3(inputs)
	if (locale === "ko") return ko_fixproofoutcomependingnote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomependingnote3(inputs)
	if (locale === "de") return de_fixproofoutcomependingnote3(inputs)
	if (locale === "fr") return fr_fixproofoutcomependingnote3(inputs)
	if (locale === "uk") return uk_fixproofoutcomependingnote3(inputs)
	return en_fixproofoutcomependingnote3(inputs)
});
export { fixproofoutcomependingnote3 as "fixproofOutcomePendingNote" }