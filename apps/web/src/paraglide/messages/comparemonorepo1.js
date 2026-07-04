/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparemonorepo1Inputs */

const en_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo (Turborepo)`)
};

const es_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo (Turborepo)`)
};

const zh_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo（Turborepo）`)
};

const ja_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モノレポ（ターボレポ）`)
};

const ko_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모노레포(터보레포)`)
};

const zh_hant1_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo（Turborepo）`)
};

const de_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo (Turborepo)`)
};

const fr_comparemonorepo1 = /** @type {(inputs: Comparemonorepo1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo (Turborepo)`)
};

/**
* | output |
* | --- |
* | "Monorepo (Turborepo)" |
*
* @param {Comparemonorepo1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparemonorepo1 = /** @type {((inputs?: Comparemonorepo1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparemonorepo1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparemonorepo1(inputs)
	if (locale === "es") return es_comparemonorepo1(inputs)
	if (locale === "zh") return zh_comparemonorepo1(inputs)
	if (locale === "ja") return ja_comparemonorepo1(inputs)
	if (locale === "ko") return ko_comparemonorepo1(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparemonorepo1(inputs)
	if (locale === "de") return de_comparemonorepo1(inputs)
	return fr_comparemonorepo1(inputs)
});
export { comparemonorepo1 as "compareMonorepo" }