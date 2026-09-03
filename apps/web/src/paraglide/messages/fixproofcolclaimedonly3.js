/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolclaimedonly3Inputs */

const en_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Claimed, not done`)
};

const es_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Declarado, no hecho`)
};

const zh_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只是声称，并未完成`)
};

const ja_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`主張のみ、未実施`)
};

const ko_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`주장만 하고 안 함`)
};

const zh_hant1_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只是聲稱，並未完成`)
};

const de_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Behauptet, nicht erledigt`)
};

const fr_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Annoncé, pas fait`)
};

const uk_fixproofcolclaimedonly3 = /** @type {(inputs: Fixproofcolclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Заявлено, не зроблено`)
};

/**
* | output |
* | --- |
* | "Claimed, not done" |
*
* @param {Fixproofcolclaimedonly3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolclaimedonly3 = /** @type {((inputs?: Fixproofcolclaimedonly3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolclaimedonly3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolclaimedonly3(inputs)
	if (locale === "zh") return zh_fixproofcolclaimedonly3(inputs)
	if (locale === "ja") return ja_fixproofcolclaimedonly3(inputs)
	if (locale === "ko") return ko_fixproofcolclaimedonly3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolclaimedonly3(inputs)
	if (locale === "de") return de_fixproofcolclaimedonly3(inputs)
	if (locale === "fr") return fr_fixproofcolclaimedonly3(inputs)
	if (locale === "uk") return uk_fixproofcolclaimedonly3(inputs)
	return en_fixproofcolclaimedonly3(inputs)
});
export { fixproofcolclaimedonly3 as "fixproofColClaimedOnly" }