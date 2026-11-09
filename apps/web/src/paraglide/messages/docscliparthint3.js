/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscliparthint3Inputs */



/**
* | output |
* | --- |
* | "role:ecosystem:tool (e.g. frontend:typescript:next)" |
*
* @param {Docscliparthint3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docscliparthint3 = /** @type {((inputs?: Docscliparthint3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docscliparthint3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("role:ecosystem:tool (p. ej. frontend:typescript:next)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("role:ecosystem:tool（例如 frontend:typescript:next）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("role:ecosystem:tool (例: frontend:typescript:next)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("role:ecosystem:tool (예: frontend:typescript:next)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("role:ecosystem:tool（例如 frontend:typescript:next）")
	if (locale === "de") return /** @type {LocalizedString} */ ("role:ecosystem:tool (z. B. frontend:typescript:next)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("role:ecosystem:tool (p. ex. frontend:typescript:next)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("role:ecosystem:tool (наприклад, frontend:typescript:next)")
	return /** @type {LocalizedString} */ ("role:ecosystem:tool (e.g. frontend:typescript:next)")
});
export { docscliparthint3 as "docsCliPartHint" }