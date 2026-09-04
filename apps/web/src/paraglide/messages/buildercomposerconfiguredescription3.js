/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconfiguredescription3Inputs */

const en_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const es_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const zh_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const ja_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const ko_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const zh_hant1_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const de_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const fr_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const uk_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

/**
* | output |
* | --- |
* | "Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform." |
*
* @param {Buildercomposerconfiguredescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconfiguredescription3 = /** @type {((inputs?: Buildercomposerconfiguredescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconfiguredescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconfiguredescription3(inputs)
	if (locale === "zh") return zh_buildercomposerconfiguredescription3(inputs)
	if (locale === "ja") return ja_buildercomposerconfiguredescription3(inputs)
	if (locale === "ko") return ko_buildercomposerconfiguredescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconfiguredescription3(inputs)
	if (locale === "de") return de_buildercomposerconfiguredescription3(inputs)
	if (locale === "fr") return fr_buildercomposerconfiguredescription3(inputs)
	if (locale === "uk") return uk_buildercomposerconfiguredescription3(inputs)
	return en_buildercomposerconfiguredescription3(inputs)
});
export { buildercomposerconfiguredescription3 as "builderComposerConfigureDescription" }