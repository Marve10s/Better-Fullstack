/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodhiddenheading3Inputs */

const en_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What the agent cannot see`)
};

const es_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lo que el agente no puede ver`)
};

const zh_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理看不到什么`)
};

const ja_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントに見えないもの`)
};

const ko_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트가 볼 수 없는 것`)
};

const zh_hant1_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式看不到什麼`)
};

const de_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Was der Agent nicht sehen kann`)
};

const fr_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ce que l'agent ne peut pas voir`)
};

const uk_fixproofmethodhiddenheading3 = /** @type {(inputs: Fixproofmethodhiddenheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Чого агент не бачить`)
};

/**
* | output |
* | --- |
* | "What the agent cannot see" |
*
* @param {Fixproofmethodhiddenheading3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodhiddenheading3 = /** @type {((inputs?: Fixproofmethodhiddenheading3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodhiddenheading3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodhiddenheading3(inputs)
	if (locale === "zh") return zh_fixproofmethodhiddenheading3(inputs)
	if (locale === "ja") return ja_fixproofmethodhiddenheading3(inputs)
	if (locale === "ko") return ko_fixproofmethodhiddenheading3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodhiddenheading3(inputs)
	if (locale === "de") return de_fixproofmethodhiddenheading3(inputs)
	if (locale === "fr") return fr_fixproofmethodhiddenheading3(inputs)
	if (locale === "uk") return uk_fixproofmethodhiddenheading3(inputs)
	return en_fixproofmethodhiddenheading3(inputs)
});
export { fixproofmethodhiddenheading3 as "fixproofMethodHiddenHeading" }