/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationrecipe2Inputs */

const en_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipe`)
};

const es_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Receta`)
};

const zh_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`配方`)
};

const ja_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`レシピ`)
};

const ko_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`레시피`)
};

const zh_hant1_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`配方`)
};

const de_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rezept`)
};

const fr_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recette`)
};

const uk_docsverificationrecipe2 = /** @type {(inputs: Docsverificationrecipe2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Рецепт`)
};

/**
* | output |
* | --- |
* | "Recipe" |
*
* @param {Docsverificationrecipe2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationrecipe2 = /** @type {((inputs?: Docsverificationrecipe2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationrecipe2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationrecipe2(inputs)
	if (locale === "zh") return zh_docsverificationrecipe2(inputs)
	if (locale === "ja") return ja_docsverificationrecipe2(inputs)
	if (locale === "ko") return ko_docsverificationrecipe2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationrecipe2(inputs)
	if (locale === "de") return de_docsverificationrecipe2(inputs)
	if (locale === "fr") return fr_docsverificationrecipe2(inputs)
	if (locale === "uk") return uk_docsverificationrecipe2(inputs)
	return en_docsverificationrecipe2(inputs)
});
export { docsverificationrecipe2 as "docsVerificationRecipe" }