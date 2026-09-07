/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerdev2Inputs */

const en_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dev`)
};

const es_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dev`)
};

const zh_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开发`)
};

const ja_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開発`)
};

const ko_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`개발`)
};

const zh_hant1_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開發`)
};

const de_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dev`)
};

const fr_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dev`)
};

const uk_buildercomposerdev2 = /** @type {(inputs: Buildercomposerdev2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Розробка`)
};

/**
* | output |
* | --- |
* | "Dev" |
*
* @param {Buildercomposerdev2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerdev2 = /** @type {((inputs?: Buildercomposerdev2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerdev2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerdev2(inputs)
	if (locale === "zh") return zh_buildercomposerdev2(inputs)
	if (locale === "ja") return ja_buildercomposerdev2(inputs)
	if (locale === "ko") return ko_buildercomposerdev2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerdev2(inputs)
	if (locale === "de") return de_buildercomposerdev2(inputs)
	if (locale === "fr") return fr_buildercomposerdev2(inputs)
	if (locale === "uk") return uk_buildercomposerdev2(inputs)
	return en_buildercomposerdev2(inputs)
});
export { buildercomposerdev2 as "builderComposerDev" }