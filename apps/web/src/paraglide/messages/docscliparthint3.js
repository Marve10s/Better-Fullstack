/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscliparthint3Inputs */

const en_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool (e.g. frontend:typescript:next)`)
};

const es_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool (p. ej. frontend:typescript:next)`)
};

const zh_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool（例如 frontend:typescript:next）`)
};

const ja_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool (例: frontend:typescript:next)`)
};

const ko_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool (예: frontend:typescript:next)`)
};

const zh_hant1_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool（例如 frontend:typescript:next）`)
};

const de_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool (z. B. frontend:typescript:next)`)
};

const fr_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool (p. ex. frontend:typescript:next)`)
};

const uk_docscliparthint3 = /** @type {(inputs: Docscliparthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`role:ecosystem:tool (наприклад, frontend:typescript:next)`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docscliparthint3(inputs)
	if (locale === "zh") return zh_docscliparthint3(inputs)
	if (locale === "ja") return ja_docscliparthint3(inputs)
	if (locale === "ko") return ko_docscliparthint3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docscliparthint3(inputs)
	if (locale === "de") return de_docscliparthint3(inputs)
	if (locale === "fr") return fr_docscliparthint3(inputs)
	if (locale === "uk") return uk_docscliparthint3(inputs)
	return en_docscliparthint3(inputs)
});
export { docscliparthint3 as "docsCliPartHint" }