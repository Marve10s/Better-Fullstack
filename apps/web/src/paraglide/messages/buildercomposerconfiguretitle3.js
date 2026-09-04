/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconfiguretitle3Inputs */

const en_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const es_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const zh_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const ja_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const ko_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const zh_hant1_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const de_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const fr_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const uk_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

/**
* | output |
* | --- |
* | "Make each application yours" |
*
* @param {Buildercomposerconfiguretitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconfiguretitle3 = /** @type {((inputs?: Buildercomposerconfiguretitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconfiguretitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconfiguretitle3(inputs)
	if (locale === "zh") return zh_buildercomposerconfiguretitle3(inputs)
	if (locale === "ja") return ja_buildercomposerconfiguretitle3(inputs)
	if (locale === "ko") return ko_buildercomposerconfiguretitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconfiguretitle3(inputs)
	if (locale === "de") return de_buildercomposerconfiguretitle3(inputs)
	if (locale === "fr") return fr_buildercomposerconfiguretitle3(inputs)
	if (locale === "uk") return uk_buildercomposerconfiguretitle3(inputs)
	return en_buildercomposerconfiguretitle3(inputs)
});
export { buildercomposerconfiguretitle3 as "builderComposerConfigureTitle" }