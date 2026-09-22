/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaiskepticgloss3Inputs */

const en_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(because of AI)`)
};

const es_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(por la IA)`)
};

const zh_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`（因为 AI）`)
};

const ja_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`（AI のために）`)
};

const ko_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(AI 때문에)`)
};

const zh_hant1_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`（因為 AI）`)
};

const de_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(wegen KI)`)
};

const fr_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(à cause de l'IA)`)
};

const uk_homeaiskepticgloss3 = /** @type {(inputs: Homeaiskepticgloss3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(через ШІ)`)
};

/**
* | output |
* | --- |
* | "(because of AI)" |
*
* @param {Homeaiskepticgloss3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaiskepticgloss3 = /** @type {((inputs?: Homeaiskepticgloss3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaiskepticgloss3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaiskepticgloss3(inputs)
	if (locale === "zh") return zh_homeaiskepticgloss3(inputs)
	if (locale === "ja") return ja_homeaiskepticgloss3(inputs)
	if (locale === "ko") return ko_homeaiskepticgloss3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaiskepticgloss3(inputs)
	if (locale === "de") return de_homeaiskepticgloss3(inputs)
	if (locale === "fr") return fr_homeaiskepticgloss3(inputs)
	if (locale === "uk") return uk_homeaiskepticgloss3(inputs)
	return en_homeaiskepticgloss3(inputs)
});
export { homeaiskepticgloss3 as "homeAiSkepticGloss" }