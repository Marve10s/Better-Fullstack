/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaifasterdone3Inputs */

const en_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`faster to a finished project`)
};

const es_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`más rápido hasta un proyecto terminado`)
};

const zh_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更快得到完成的项目`)
};

const ja_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完成までが速くなる`)
};

const ko_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`완성까지 더 빠르게`)
};

const zh_hant1_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更快得到完成的專案`)
};

const de_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`schneller zum fertigen Projekt`)
};

const fr_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`plus vite jusqu'au projet terminé`)
};

const uk_homeaifasterdone3 = /** @type {(inputs: Homeaifasterdone3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`швидше до готового проєкту`)
};

/**
* | output |
* | --- |
* | "faster to a finished project" |
*
* @param {Homeaifasterdone3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaifasterdone3 = /** @type {((inputs?: Homeaifasterdone3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaifasterdone3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaifasterdone3(inputs)
	if (locale === "zh") return zh_homeaifasterdone3(inputs)
	if (locale === "ja") return ja_homeaifasterdone3(inputs)
	if (locale === "ko") return ko_homeaifasterdone3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaifasterdone3(inputs)
	if (locale === "de") return de_homeaifasterdone3(inputs)
	if (locale === "fr") return fr_homeaifasterdone3(inputs)
	if (locale === "uk") return uk_homeaifasterdone3(inputs)
	return en_homeaifasterdone3(inputs)
});
export { homeaifasterdone3 as "homeAiFasterDone" }