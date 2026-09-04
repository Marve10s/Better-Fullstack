/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerwebdescription3Inputs */

const en_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const es_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const zh_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const ja_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const ko_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const zh_hant1_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const de_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const fr_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const uk_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

/**
* | output |
* | --- |
* | "A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported." |
*
* @param {Buildercomposerwebdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerwebdescription3 = /** @type {((inputs?: Buildercomposerwebdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerwebdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerwebdescription3(inputs)
	if (locale === "zh") return zh_buildercomposerwebdescription3(inputs)
	if (locale === "ja") return ja_buildercomposerwebdescription3(inputs)
	if (locale === "ko") return ko_buildercomposerwebdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerwebdescription3(inputs)
	if (locale === "de") return de_buildercomposerwebdescription3(inputs)
	if (locale === "fr") return fr_buildercomposerwebdescription3(inputs)
	if (locale === "uk") return uk_buildercomposerwebdescription3(inputs)
	return en_buildercomposerwebdescription3(inputs)
});
export { buildercomposerwebdescription3 as "builderComposerWebDescription" }