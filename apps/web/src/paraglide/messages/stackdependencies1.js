/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackdependencies1Inputs */



/**
* | output |
* | --- |
* | "Dependencies" |
*
* @param {Stackdependencies1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackdependencies1 = /** @type {((inputs?: Stackdependencies1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackdependencies1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Dependencias")
	if (locale === "zh") return /** @type {LocalizedString} */ ("依赖")
	if (locale === "ja") return /** @type {LocalizedString} */ ("依存関係")
	if (locale === "ko") return /** @type {LocalizedString} */ ("종속성")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("依賴")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abhängigkeiten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dépendances")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Залежності")
	return /** @type {LocalizedString} */ ("Dependencies")
});
export { stackdependencies1 as "stackDependencies" }