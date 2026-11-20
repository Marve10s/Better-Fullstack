/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourcegettingstarteddescription4Inputs */



/**
* | output |
* | --- |
* | "Quick-start recipes per ecosystem" |
*
* @param {Mcpresourcegettingstarteddescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpresourcegettingstarteddescription4 = /** @type {((inputs?: Mcpresourcegettingstarteddescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresourcegettingstarteddescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Recetas de inicio rápido por ecosistema")
	if (locale === "zh") return /** @type {LocalizedString} */ ("按生态划分的快速上手指南")
	if (locale === "ja") return /** @type {LocalizedString} */ ("エコシステムごとのクイックスタート レシピ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생태계별 빠른 시작 레시피")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("按生態劃分的快速上手指南")
	if (locale === "de") return /** @type {LocalizedString} */ ("Schnellstartrezepte pro Ökosystem")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Recettes rapides par écosystème")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Швидкі рецепти для кожної екосистеми")
	return /** @type {LocalizedString} */ ("Quick-start recipes per ecosystem")
});
export { mcpresourcegettingstarteddescription4 as "mcpResourceGettingStartedDescription" }