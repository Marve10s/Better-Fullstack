/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunpreview2Inputs */

const en_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live preview`)
};

const es_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vista previa en vivo`)
};

const zh_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实时预览`)
};

const ja_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ライブプレビュー`)
};

const ko_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`라이브 미리보기`)
};

const zh_hant1_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`即時預覽`)
};

const de_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live-Vorschau`)
};

const fr_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aperçu en direct`)
};

const uk_builderrunpreview2 = /** @type {(inputs: Builderrunpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Живий перегляд`)
};

/**
* | output |
* | --- |
* | "Live preview" |
*
* @param {Builderrunpreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunpreview2 = /** @type {((inputs?: Builderrunpreview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunpreview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunpreview2(inputs)
	if (locale === "zh") return zh_builderrunpreview2(inputs)
	if (locale === "ja") return ja_builderrunpreview2(inputs)
	if (locale === "ko") return ko_builderrunpreview2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunpreview2(inputs)
	if (locale === "de") return de_builderrunpreview2(inputs)
	if (locale === "fr") return fr_builderrunpreview2(inputs)
	if (locale === "uk") return uk_builderrunpreview2(inputs)
	return en_builderrunpreview2(inputs)
});
export { builderrunpreview2 as "builderRunPreview" }