/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackdependencies1Inputs */

const en_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dependencies`)
};

const es_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dependencias`)
};

const zh_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依赖`)
};

const ja_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依存関係`)
};

const ko_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`종속성`)
};

const zh_hant1_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依賴`)
};

const de_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abhängigkeiten`)
};

const fr_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dépendances`)
};

const uk_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Залежності`)
};

/**
* | output |
* | --- |
* | "Dependencies" |
*
* @param {Stackdependencies1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackdependencies1 = /** @type {((inputs?: Stackdependencies1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackdependencies1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackdependencies1(inputs)
	if (locale === "es") return es_stackdependencies1(inputs)
	if (locale === "zh") return zh_stackdependencies1(inputs)
	if (locale === "ja") return ja_stackdependencies1(inputs)
	if (locale === "ko") return ko_stackdependencies1(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackdependencies1(inputs)
	if (locale === "de") return de_stackdependencies1(inputs)
	if (locale === "fr") return fr_stackdependencies1(inputs)
	return uk_stackdependencies1(inputs)
});
export { stackdependencies1 as "stackDependencies" }