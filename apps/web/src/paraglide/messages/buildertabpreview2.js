/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabpreview2Inputs */

const en_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview`)
};

const es_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vista previa`)
};

const zh_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预览`)
};

const ja_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プレビュー`)
};

const ko_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시사`)
};

const zh_hant1_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預覽`)
};

const de_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorschau`)
};

const fr_buildertabpreview2 = /** @type {(inputs: Buildertabpreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aperçu`)
};

/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Buildertabpreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildertabpreview2 = /** @type {((inputs?: Buildertabpreview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabpreview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertabpreview2(inputs)
	if (locale === "es") return es_buildertabpreview2(inputs)
	if (locale === "zh") return zh_buildertabpreview2(inputs)
	if (locale === "ja") return ja_buildertabpreview2(inputs)
	if (locale === "ko") return ko_buildertabpreview2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildertabpreview2(inputs)
	if (locale === "de") return de_buildertabpreview2(inputs)
	return fr_buildertabpreview2(inputs)
});
export { buildertabpreview2 as "builderTabPreview" }