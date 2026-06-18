/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderyolomode2Inputs */

const en_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO Mode`)
};

const es_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modo YOLO`)
};

const zh_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO 模式`)
};

const ja_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLOモード`)
};

const ko_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`욜로 모드`)
};

const zh_hant1_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO 模式`)
};

const de_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO-Modus`)
};

const fr_builderyolomode2 = /** @type {(inputs: Builderyolomode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mode YOLO`)
};

/**
* | output |
* | --- |
* | "YOLO Mode" |
*
* @param {Builderyolomode2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderyolomode2 = /** @type {((inputs?: Builderyolomode2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderyolomode2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderyolomode2(inputs)
	if (locale === "es") return es_builderyolomode2(inputs)
	if (locale === "zh") return zh_builderyolomode2(inputs)
	if (locale === "ja") return ja_builderyolomode2(inputs)
	if (locale === "ko") return ko_builderyolomode2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderyolomode2(inputs)
	if (locale === "de") return de_builderyolomode2(inputs)
	return fr_builderyolomode2(inputs)
});
export { builderyolomode2 as "builderYoloMode" }