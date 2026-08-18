/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartershapebackend3Inputs */

const en_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend only`)
};

const es_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo backend`)
};

const zh_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅后端`)
};

const ja_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バックエンドのみ`)
};

const ko_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백엔드만`)
};

const zh_hant1_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`僅後端`)
};

const de_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nur Backend`)
};

const fr_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend uniquement`)
};

const uk_homestartershapebackend3 = /** @type {(inputs: Homestartershapebackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Лише бекенд`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homestartershapebackend3(inputs)
	if (locale === "zh") return zh_homestartershapebackend3(inputs)
	if (locale === "ja") return ja_homestartershapebackend3(inputs)
	if (locale === "ko") return ko_homestartershapebackend3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestartershapebackend3(inputs)
	if (locale === "de") return de_homestartershapebackend3(inputs)
	if (locale === "fr") return fr_homestartershapebackend3(inputs)
	if (locale === "uk") return uk_homestartershapebackend3(inputs)
	return en_homestartershapebackend3(inputs)
});
export { homestartershapebackend3 as "homeStarterShapeBackend" }