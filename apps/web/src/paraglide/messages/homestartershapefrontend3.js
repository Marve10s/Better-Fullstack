/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartershapefrontend3Inputs */

const en_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend only`)
};

const es_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo frontend`)
};

const zh_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅前端`)
};

const ja_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フロントエンドのみ`)
};

const ko_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프런트엔드만`)
};

const zh_hant1_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`僅前端`)
};

const de_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nur Frontend`)
};

const fr_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend uniquement`)
};

const uk_homestartershapefrontend3 = /** @type {(inputs: Homestartershapefrontend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Лише фронтенд`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homestartershapefrontend3(inputs)
	if (locale === "zh") return zh_homestartershapefrontend3(inputs)
	if (locale === "ja") return ja_homestartershapefrontend3(inputs)
	if (locale === "ko") return ko_homestartershapefrontend3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestartershapefrontend3(inputs)
	if (locale === "de") return de_homestartershapefrontend3(inputs)
	if (locale === "fr") return fr_homestartershapefrontend3(inputs)
	if (locale === "uk") return uk_homestartershapefrontend3(inputs)
	return en_homestartershapefrontend3(inputs)
});
export { homestartershapefrontend3 as "homeStarterShapeFrontend" }