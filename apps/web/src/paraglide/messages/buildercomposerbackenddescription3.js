/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerbackenddescription3Inputs */

const en_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

const es_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

const zh_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

const ja_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

const ko_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

const zh_hant1_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

const de_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

const fr_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

const uk_buildercomposerbackenddescription3 = /** @type {(inputs: Buildercomposerbackenddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.`)
};

/**
* | output |
* | --- |
* | "An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET." |
*
* @param {Buildercomposerbackenddescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerbackenddescription3 = /** @type {((inputs?: Buildercomposerbackenddescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerbackenddescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerbackenddescription3(inputs)
	if (locale === "zh") return zh_buildercomposerbackenddescription3(inputs)
	if (locale === "ja") return ja_buildercomposerbackenddescription3(inputs)
	if (locale === "ko") return ko_buildercomposerbackenddescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerbackenddescription3(inputs)
	if (locale === "de") return de_buildercomposerbackenddescription3(inputs)
	if (locale === "fr") return fr_buildercomposerbackenddescription3(inputs)
	if (locale === "uk") return uk_buildercomposerbackenddescription3(inputs)
	return en_buildercomposerbackenddescription3(inputs)
});
export { buildercomposerbackenddescription3 as "builderComposerBackendDescription" }