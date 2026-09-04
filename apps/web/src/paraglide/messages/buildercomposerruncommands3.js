/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerruncommands3Inputs */

const en_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

const es_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

const zh_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

const ja_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

const ko_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

const zh_hant1_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

const de_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

const fr_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

const uk_buildercomposerruncommands3 = /** @type {(inputs: Buildercomposerruncommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start web applications and services`)
};

/**
* | output |
* | --- |
* | "Start web applications and services" |
*
* @param {Buildercomposerruncommands3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerruncommands3 = /** @type {((inputs?: Buildercomposerruncommands3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerruncommands3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerruncommands3(inputs)
	if (locale === "zh") return zh_buildercomposerruncommands3(inputs)
	if (locale === "ja") return ja_buildercomposerruncommands3(inputs)
	if (locale === "ko") return ko_buildercomposerruncommands3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerruncommands3(inputs)
	if (locale === "de") return de_buildercomposerruncommands3(inputs)
	if (locale === "fr") return fr_buildercomposerruncommands3(inputs)
	if (locale === "uk") return uk_buildercomposerruncommands3(inputs)
	return en_buildercomposerruncommands3(inputs)
});
export { buildercomposerruncommands3 as "builderComposerRunCommands" }