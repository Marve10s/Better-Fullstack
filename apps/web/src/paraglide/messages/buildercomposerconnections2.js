/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconnections2Inputs */

const en_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const es_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const zh_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const ja_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const ko_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const zh_hant1_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const de_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const fr_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const uk_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

/**
* | output |
* | --- |
* | "Backend connections" |
*
* @param {Buildercomposerconnections2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconnections2 = /** @type {((inputs?: Buildercomposerconnections2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconnections2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconnections2(inputs)
	if (locale === "zh") return zh_buildercomposerconnections2(inputs)
	if (locale === "ja") return ja_buildercomposerconnections2(inputs)
	if (locale === "ko") return ko_buildercomposerconnections2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconnections2(inputs)
	if (locale === "de") return de_buildercomposerconnections2(inputs)
	if (locale === "fr") return fr_buildercomposerconnections2(inputs)
	if (locale === "uk") return uk_buildercomposerconnections2(inputs)
	return en_buildercomposerconnections2(inputs)
});
export { buildercomposerconnections2 as "builderComposerConnections" }