/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Saveddelete1Inputs */



/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Saveddelete1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const saveddelete1 = /** @type {((inputs?: Saveddelete1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddelete1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Eliminar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("删除")
	if (locale === "ja") return /** @type {LocalizedString} */ ("削除")
	if (locale === "ko") return /** @type {LocalizedString} */ ("삭제")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("刪除")
	if (locale === "de") return /** @type {LocalizedString} */ ("Löschen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Supprimer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Видалити")
	return /** @type {LocalizedString} */ ("Delete")
});
export { saveddelete1 as "savedDelete" }