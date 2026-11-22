/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartershapebackend3Inputs */



/**
* | output |
* | --- |
* | "Backend only" |
*
* @param {Homestartershapebackend3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartershapebackend3 = /** @type {((inputs?: Homestartershapebackend3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartershapebackend3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Solo backend")
	if (locale === "zh") return /** @type {LocalizedString} */ ("仅后端")
	if (locale === "ja") return /** @type {LocalizedString} */ ("バックエンドのみ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("백엔드만")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("僅後端")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nur Backend")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Backend uniquement")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Лише бекенд")
	return /** @type {LocalizedString} */ ("Backend only")
});
export { homestartershapebackend3 as "homeStarterShapeBackend" }