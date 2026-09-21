/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombostimequestion3Inputs */

const en_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How long to try them all?`)
};

const es_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Cuánto tardarías en probarlos todos?`)
};

const zh_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部试一遍要多久？`)
};

const ja_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部試すのにどれくらい？`)
};

const ko_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`전부 시도하려면 얼마나 걸릴까?`)
};

const zh_hant1_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部試一遍要多久？`)
};

const de_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wie lange, um alle zu testen?`)
};

const fr_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Combien de temps pour tous les essayer ?`)
};

const uk_homecombostimequestion3 = /** @type {(inputs: Homecombostimequestion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скільки часу, щоб спробувати всі?`)
};

/**
* | output |
* | --- |
* | "How long to try them all?" |
*
* @param {Homecombostimequestion3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombostimequestion3 = /** @type {((inputs?: Homecombostimequestion3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombostimequestion3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homecombostimequestion3(inputs)
	if (locale === "zh") return zh_homecombostimequestion3(inputs)
	if (locale === "ja") return ja_homecombostimequestion3(inputs)
	if (locale === "ko") return ko_homecombostimequestion3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecombostimequestion3(inputs)
	if (locale === "de") return de_homecombostimequestion3(inputs)
	if (locale === "fr") return fr_homecombostimequestion3(inputs)
	if (locale === "uk") return uk_homecombostimequestion3(inputs)
	return en_homecombostimequestion3(inputs)
});
export { homecombostimequestion3 as "homeCombosTimeQuestion" }