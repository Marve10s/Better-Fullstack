/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposernativerun3Inputs */

const en_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const es_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const zh_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const ja_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const ko_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const zh_hant1_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const de_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const fr_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const uk_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

/**
* | output |
* | --- |
* | "Run native mobile apps separately to choose a simulator or device. The generated README includes their commands." |
*
* @param {Buildercomposernativerun3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposernativerun3 = /** @type {((inputs?: Buildercomposernativerun3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposernativerun3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposernativerun3(inputs)
	if (locale === "zh") return zh_buildercomposernativerun3(inputs)
	if (locale === "ja") return ja_buildercomposernativerun3(inputs)
	if (locale === "ko") return ko_buildercomposernativerun3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposernativerun3(inputs)
	if (locale === "de") return de_buildercomposernativerun3(inputs)
	if (locale === "fr") return fr_buildercomposernativerun3(inputs)
	if (locale === "uk") return uk_buildercomposernativerun3(inputs)
	return en_buildercomposernativerun3(inputs)
});
export { buildercomposernativerun3 as "builderComposerNativeRun" }