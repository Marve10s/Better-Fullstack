/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homefactyolo2Inputs */

const en_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO mode doubles every single one of them`)
};

const es_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El modo YOLO duplica cada una de ellas`)
};

const zh_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO 模式会让每个组合再翻倍`)
};

const ja_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO モードはそれらをすべて 2 倍にします`)
};

const ko_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO 모드는 모든 것을 두 배로 늘립니다.`)
};

const zh_hant1_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`YOLO 模式會讓每個組合再翻倍`)
};

const de_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der YOLO-Modus verdoppelt jeden einzelnen davon`)
};

const fr_homefactyolo2 = /** @type {(inputs: Homefactyolo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le mode YOLO double chacun d'entre eux`)
};

/**
* | output |
* | --- |
* | "YOLO mode doubles every single one of them" |
*
* @param {Homefactyolo2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homefactyolo2 = /** @type {((inputs?: Homefactyolo2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactyolo2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactyolo2(inputs)
	if (locale === "es") return es_homefactyolo2(inputs)
	if (locale === "zh") return zh_homefactyolo2(inputs)
	if (locale === "ja") return ja_homefactyolo2(inputs)
	if (locale === "ko") return ko_homefactyolo2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefactyolo2(inputs)
	if (locale === "de") return de_homefactyolo2(inputs)
	return fr_homefactyolo2(inputs)
});
export { homefactyolo2 as "homeFactYolo" }