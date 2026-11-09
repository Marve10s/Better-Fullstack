/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercancel1Inputs */



/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Buildercancel1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercancel1 = /** @type {((inputs?: Buildercancel1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercancel1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cancelar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("取消")
	if (locale === "ja") return /** @type {LocalizedString} */ ("キャンセル")
	if (locale === "ko") return /** @type {LocalizedString} */ ("취소")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("取消")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abbrechen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Annuler")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Скасувати")
	return /** @type {LocalizedString} */ ("Cancel")
});
export { buildercancel1 as "builderCancel" }