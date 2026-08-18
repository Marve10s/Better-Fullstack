/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartershapemobile3Inputs */

const en_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile app`)
};

const es_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App móvil`)
};

const zh_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动应用`)
};

const ja_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モバイルアプリ`)
};

const ko_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모바일 앱`)
};

const zh_hant1_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`行動應用`)
};

const de_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App`)
};

const fr_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Application mobile`)
};

const uk_homestartershapemobile3 = /** @type {(inputs: Homestartershapemobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Мобільний застосунок`)
};

/**
* | output |
* | --- |
* | "Mobile app" |
*
* @param {Homestartershapemobile3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartershapemobile3 = /** @type {((inputs?: Homestartershapemobile3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartershapemobile3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homestartershapemobile3(inputs)
	if (locale === "zh") return zh_homestartershapemobile3(inputs)
	if (locale === "ja") return ja_homestartershapemobile3(inputs)
	if (locale === "ko") return ko_homestartershapemobile3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestartershapemobile3(inputs)
	if (locale === "de") return de_homestartershapemobile3(inputs)
	if (locale === "fr") return fr_homestartershapemobile3(inputs)
	if (locale === "uk") return uk_homestartershapemobile3(inputs)
	return en_homestartershapemobile3(inputs)
});
export { homestartershapemobile3 as "homeStarterShapeMobile" }