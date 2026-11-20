/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationrecipe2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Receta")
	if (locale === "zh") return /** @type {LocalizedString} */ ("配方")
	if (locale === "ja") return /** @type {LocalizedString} */ ("レシピ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("레시피")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("配方")
	if (locale === "de") return /** @type {LocalizedString} */ ("Rezept")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Recette")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Рецепт")
	return /** @type {LocalizedString} */ ("Recipe")
});
export { docsverificationrecipe2 as "docsVerificationRecipe" }