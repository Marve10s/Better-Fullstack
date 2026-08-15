/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartershapefullstack3Inputs */

const en_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Full stack`)
};

const es_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Full stack`)
};

const zh_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全栈`)
};

const ja_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フルスタック`)
};

const ko_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`풀스택`)
};

const zh_hant1_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全端`)
};

const de_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Full Stack`)
};

const fr_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Full stack`)
};

const uk_homestartershapefullstack3 = /** @type {(inputs: Homestartershapefullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Full stack`)
};

/**
* | output |
* | --- |
* | "Full stack" |
*
* @param {Homestartershapefullstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartershapefullstack3 = /** @type {((inputs?: Homestartershapefullstack3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartershapefullstack3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homestartershapefullstack3(inputs)
	if (locale === "zh") return zh_homestartershapefullstack3(inputs)
	if (locale === "ja") return ja_homestartershapefullstack3(inputs)
	if (locale === "ko") return ko_homestartershapefullstack3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestartershapefullstack3(inputs)
	if (locale === "de") return de_homestartershapefullstack3(inputs)
	if (locale === "fr") return fr_homestartershapefullstack3(inputs)
	if (locale === "uk") return uk_homestartershapefullstack3(inputs)
	return en_homestartershapefullstack3(inputs)
});
export { homestartershapefullstack3 as "homeStarterShapeFullstack" }