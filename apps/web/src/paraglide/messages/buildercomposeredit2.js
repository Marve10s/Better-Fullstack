/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposeredit2Inputs */

const en_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const es_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const zh_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const ja_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const ko_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const zh_hant1_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const de_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const fr_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const uk_buildercomposeredit2 = /** @type {(inputs: Buildercomposeredit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Buildercomposeredit2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposeredit2 = /** @type {((inputs?: Buildercomposeredit2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposeredit2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposeredit2(inputs)
	if (locale === "zh") return zh_buildercomposeredit2(inputs)
	if (locale === "ja") return ja_buildercomposeredit2(inputs)
	if (locale === "ko") return ko_buildercomposeredit2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposeredit2(inputs)
	if (locale === "de") return de_buildercomposeredit2(inputs)
	if (locale === "fr") return fr_buildercomposeredit2(inputs)
	if (locale === "uk") return uk_buildercomposeredit2(inputs)
	return en_buildercomposeredit2(inputs)
});
export { buildercomposeredit2 as "builderComposerEdit" }