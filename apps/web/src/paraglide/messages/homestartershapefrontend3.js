/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartershapefrontend3Inputs */



/**
* | output |
* | --- |
* | "Frontend only" |
*
* @param {Homestartershapefrontend3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartershapefrontend3 = /** @type {((inputs?: Homestartershapefrontend3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartershapefrontend3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Solo frontend")
	if (locale === "zh") return /** @type {LocalizedString} */ ("仅前端")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フロントエンドのみ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프런트엔드만")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("僅前端")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nur Frontend")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Frontend uniquement")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Лише фронтенд")
	return /** @type {LocalizedString} */ ("Frontend only")
});
export { homestartershapefrontend3 as "homeStarterShapeFrontend" }