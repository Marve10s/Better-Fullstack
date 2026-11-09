/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderyolomode2Inputs */



/**
* | output |
* | --- |
* | "YOLO Mode" |
*
* @param {Builderyolomode2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderyolomode2 = /** @type {((inputs?: Builderyolomode2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderyolomode2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Modo YOLO")
	if (locale === "zh") return /** @type {LocalizedString} */ ("YOLO 模式")
	if (locale === "ja") return /** @type {LocalizedString} */ ("YOLOモード")
	if (locale === "ko") return /** @type {LocalizedString} */ ("YOLO 모드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("YOLO 模式")
	if (locale === "de") return /** @type {LocalizedString} */ ("YOLO-Modus")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mode YOLO")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Режим YOLO")
	return /** @type {LocalizedString} */ ("YOLO Mode")
});
export { builderyolomode2 as "builderYoloMode" }