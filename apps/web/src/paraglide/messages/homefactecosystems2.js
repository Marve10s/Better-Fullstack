/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homefactecosystems2Inputs */

const en_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Across TypeScript, React Native, Rust, Python, Go, Java, and Elixir`)
};

const es_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En TypeScript, React Native, Rust, Python, Go, Java y Elixir`)
};

const zh_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`覆盖 TypeScript、React Native、Rust、Python、Go、Java 和 Elixir`)
};

const ja_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript、React Native、Rust、Python、Go、Java、Elixir 全体`)
};

const ko_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript, React Native, Rust, Python, Go, Java 및 Elixir 전반에 걸쳐`)
};

const zh_hant1_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`覆蓋 TypeScript、React Native、Rust、Python、Go、Java 和 Elixir`)
};

const de_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Über TypeScript, React Native, Rust, Python, Go, Java und Elixir`)
};

const fr_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sur TypeScript, React Native, Rust, Python, Go, Java et Elixir`)
};

/**
* | output |
* | --- |
* | "Across TypeScript, React Native, Rust, Python, Go, Java, and Elixir" |
*
* @param {Homefactecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homefactecosystems2 = /** @type {((inputs?: Homefactecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactecosystems2(inputs)
	if (locale === "es") return es_homefactecosystems2(inputs)
	if (locale === "zh") return zh_homefactecosystems2(inputs)
	if (locale === "ja") return ja_homefactecosystems2(inputs)
	if (locale === "ko") return ko_homefactecosystems2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefactecosystems2(inputs)
	if (locale === "de") return de_homefactecosystems2(inputs)
	return fr_homefactecosystems2(inputs)
});
export { homefactecosystems2 as "homeFactEcosystems" }