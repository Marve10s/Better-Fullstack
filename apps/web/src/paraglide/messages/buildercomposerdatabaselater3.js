/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerdatabaselater3Inputs */

const en_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const es_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const zh_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const ja_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const ko_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const zh_hant1_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const de_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const fr_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const uk_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

/**
* | output |
* | --- |
* | "Databases are optional. Add one while configuring your applications." |
*
* @param {Buildercomposerdatabaselater3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerdatabaselater3 = /** @type {((inputs?: Buildercomposerdatabaselater3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerdatabaselater3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerdatabaselater3(inputs)
	if (locale === "zh") return zh_buildercomposerdatabaselater3(inputs)
	if (locale === "ja") return ja_buildercomposerdatabaselater3(inputs)
	if (locale === "ko") return ko_buildercomposerdatabaselater3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerdatabaselater3(inputs)
	if (locale === "de") return de_buildercomposerdatabaselater3(inputs)
	if (locale === "fr") return fr_buildercomposerdatabaselater3(inputs)
	if (locale === "uk") return uk_buildercomposerdatabaselater3(inputs)
	return en_buildercomposerdatabaselater3(inputs)
});
export { buildercomposerdatabaselater3 as "builderComposerDatabaseLater" }