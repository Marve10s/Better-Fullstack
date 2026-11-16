/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabsaved2Inputs */



/**
* | output |
* | --- |
* | "Saved" |
*
* @param {Buildertabsaved2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildertabsaved2 = /** @type {((inputs?: Buildertabsaved2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabsaved2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guardados")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已保存")
	if (locale === "ja") return /** @type {LocalizedString} */ ("保存されました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("저장됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已儲存")
	if (locale === "de") return /** @type {LocalizedString} */ ("Gespeichert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Enregistré")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Збережено")
	return /** @type {LocalizedString} */ ("Saved")
});
export { buildertabsaved2 as "builderTabSaved" }