/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestacktanstackstart5Inputs */

const en_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start on Solid, with TanStack Router end to end`)
};

const es_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start sobre Solid, con TanStack Router de principio a fin`)
};

const zh_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基于 Solid 的 TanStack Start，全程使用 TanStack Router`)
};

const ja_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid 上の TanStack Start、TanStack Router で一貫`)
};

const ko_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid 기반 TanStack Start, 처음부터 끝까지 TanStack Router`)
};

const zh_hant1_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基於 Solid 的 TanStack Start，全程使用 TanStack Router`)
};

const de_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start auf Solid, durchgehend mit TanStack Router`)
};

const fr_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start sur Solid, avec TanStack Router de bout en bout`)
};

const uk_presetfuturestacktanstackstart5 = /** @type {(inputs: Presetfuturestacktanstackstart5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start на Solid із TanStack Router від початку до кінця`)
};

/**
* | output |
* | --- |
* | "TanStack Start on Solid, with TanStack Router end to end" |
*
* @param {Presetfuturestacktanstackstart5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestacktanstackstart5 = /** @type {((inputs?: Presetfuturestacktanstackstart5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestacktanstackstart5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_presetfuturestacktanstackstart5(inputs)
	if (locale === "zh") return zh_presetfuturestacktanstackstart5(inputs)
	if (locale === "ja") return ja_presetfuturestacktanstackstart5(inputs)
	if (locale === "ko") return ko_presetfuturestacktanstackstart5(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetfuturestacktanstackstart5(inputs)
	if (locale === "de") return de_presetfuturestacktanstackstart5(inputs)
	if (locale === "fr") return fr_presetfuturestacktanstackstart5(inputs)
	if (locale === "uk") return uk_presetfuturestacktanstackstart5(inputs)
	return en_presetfuturestacktanstackstart5(inputs)
});
export { presetfuturestacktanstackstart5 as "presetFutureStackTanStackStart" }