/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefmedianminutes3Inputs */

const en_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const es_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const zh_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const ja_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const ko_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const zh_hant1_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const de_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const fr_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const uk_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

/**
* | output |
* | --- |
* | "Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap." |
*
* @param {Fixproofdefmedianminutes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefmedianminutes3 = /** @type {((inputs?: Fixproofdefmedianminutes3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefmedianminutes3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefmedianminutes3(inputs)
	if (locale === "zh") return zh_fixproofdefmedianminutes3(inputs)
	if (locale === "ja") return ja_fixproofdefmedianminutes3(inputs)
	if (locale === "ko") return ko_fixproofdefmedianminutes3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefmedianminutes3(inputs)
	if (locale === "de") return de_fixproofdefmedianminutes3(inputs)
	if (locale === "fr") return fr_fixproofdefmedianminutes3(inputs)
	if (locale === "uk") return uk_fixproofdefmedianminutes3(inputs)
	return en_fixproofdefmedianminutes3(inputs)
});
export { fixproofdefmedianminutes3 as "fixproofDefMedianMinutes" }