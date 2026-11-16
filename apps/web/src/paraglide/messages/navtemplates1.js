/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navtemplates1Inputs */



/**
* | output |
* | --- |
* | "Templates" |
*
* @param {Navtemplates1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navtemplates1 = /** @type {((inputs?: Navtemplates1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navtemplates1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Plantillas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("模板")
	if (locale === "ja") return /** @type {LocalizedString} */ ("テンプレート")
	if (locale === "ko") return /** @type {LocalizedString} */ ("템플릿")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("範本")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorlagen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Modèles")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шаблони")
	return /** @type {LocalizedString} */ ("Templates")
});
export { navtemplates1 as "navTemplates" }