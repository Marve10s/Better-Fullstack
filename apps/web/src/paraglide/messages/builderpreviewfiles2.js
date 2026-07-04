/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewfiles2Inputs */

const en_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Files`)
};

const es_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Archivos`)
};

const zh_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件`)
};

const ja_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ファイル`)
};

const ko_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`파일`)
};

const zh_hant1_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件`)
};

const de_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dateien`)
};

const fr_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fichiers`)
};

const uk_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Файли`)
};

/**
* | output |
* | --- |
* | "Files" |
*
* @param {Builderpreviewfiles2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewfiles2 = /** @type {((inputs?: Builderpreviewfiles2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfiles2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfiles2(inputs)
	if (locale === "es") return es_builderpreviewfiles2(inputs)
	if (locale === "zh") return zh_builderpreviewfiles2(inputs)
	if (locale === "ja") return ja_builderpreviewfiles2(inputs)
	if (locale === "ko") return ko_builderpreviewfiles2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewfiles2(inputs)
	if (locale === "de") return de_builderpreviewfiles2(inputs)
	if (locale === "fr") return fr_builderpreviewfiles2(inputs)
	return uk_builderpreviewfiles2(inputs)
});
export { builderpreviewfiles2 as "builderPreviewFiles" }