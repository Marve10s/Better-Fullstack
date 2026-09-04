/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposersetupcommands3Inputs */

const en_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const es_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const zh_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const ja_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const ko_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const zh_hant1_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const de_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const fr_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const uk_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

/**
* | output |
* | --- |
* | "Prepare dependencies" |
*
* @param {Buildercomposersetupcommands3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposersetupcommands3 = /** @type {((inputs?: Buildercomposersetupcommands3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposersetupcommands3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposersetupcommands3(inputs)
	if (locale === "zh") return zh_buildercomposersetupcommands3(inputs)
	if (locale === "ja") return ja_buildercomposersetupcommands3(inputs)
	if (locale === "ko") return ko_buildercomposersetupcommands3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposersetupcommands3(inputs)
	if (locale === "de") return de_buildercomposersetupcommands3(inputs)
	if (locale === "fr") return fr_buildercomposersetupcommands3(inputs)
	if (locale === "uk") return uk_buildercomposersetupcommands3(inputs)
	return en_buildercomposersetupcommands3(inputs)
});
export { buildercomposersetupcommands3 as "builderComposerSetupCommands" }