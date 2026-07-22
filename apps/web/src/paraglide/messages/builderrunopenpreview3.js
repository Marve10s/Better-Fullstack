/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunopenpreview3Inputs */

const en_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open preview`)
};

const es_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir vista previa`)
};

const zh_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开预览`)
};

const ja_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プレビューを開く`)
};

const ko_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`미리보기 열기`)
};

const zh_hant1_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟預覽`)
};

const de_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorschau öffnen`)
};

const fr_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir l’aperçu`)
};

const uk_builderrunopenpreview3 = /** @type {(inputs: Builderrunopenpreview3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкрити перегляд`)
};

/**
* | output |
* | --- |
* | "Open preview" |
*
* @param {Builderrunopenpreview3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunopenpreview3 = /** @type {((inputs?: Builderrunopenpreview3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunopenpreview3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunopenpreview3(inputs)
	if (locale === "es") return es_builderrunopenpreview3(inputs)
	if (locale === "zh") return zh_builderrunopenpreview3(inputs)
	if (locale === "ja") return ja_builderrunopenpreview3(inputs)
	if (locale === "ko") return ko_builderrunopenpreview3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunopenpreview3(inputs)
	if (locale === "de") return de_builderrunopenpreview3(inputs)
	if (locale === "fr") return fr_builderrunopenpreview3(inputs)
	return uk_builderrunopenpreview3(inputs)
});
export { builderrunopenpreview3 as "builderRunOpenPreview" }