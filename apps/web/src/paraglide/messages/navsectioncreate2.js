/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsectioncreate2Inputs */



/**
* | output |
* | --- |
* | "Create" |
*
* @param {Navsectioncreate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navsectioncreate2 = /** @type {((inputs?: Navsectioncreate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsectioncreate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Crear")
	if (locale === "zh") return /** @type {LocalizedString} */ ("创建")
	if (locale === "ja") return /** @type {LocalizedString} */ ("作成")
	if (locale === "ko") return /** @type {LocalizedString} */ ("만들기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建立")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erstellen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Créer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створити")
	return /** @type {LocalizedString} */ ("Create")
});
export { navsectioncreate2 as "navSectionCreate" }