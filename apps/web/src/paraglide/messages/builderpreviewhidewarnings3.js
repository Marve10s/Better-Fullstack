/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewhidewarnings3Inputs */

const en_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`hide`)
};

const es_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ocultar`)
};

const zh_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隐藏`)
};

const ja_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隠れる`)
};

const ko_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`숨다`)
};

const zh_hant1_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隱藏`)
};

const de_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`verstecken`)
};

const fr_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`cacher`)
};

/**
* | output |
* | --- |
* | "hide" |
*
* @param {Builderpreviewhidewarnings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewhidewarnings3 = /** @type {((inputs?: Builderpreviewhidewarnings3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewhidewarnings3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewhidewarnings3(inputs)
	if (locale === "es") return es_builderpreviewhidewarnings3(inputs)
	if (locale === "zh") return zh_builderpreviewhidewarnings3(inputs)
	if (locale === "ja") return ja_builderpreviewhidewarnings3(inputs)
	if (locale === "ko") return ko_builderpreviewhidewarnings3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewhidewarnings3(inputs)
	if (locale === "de") return de_builderpreviewhidewarnings3(inputs)
	return fr_builderpreviewhidewarnings3(inputs)
});
export { builderpreviewhidewarnings3 as "builderPreviewHideWarnings" }