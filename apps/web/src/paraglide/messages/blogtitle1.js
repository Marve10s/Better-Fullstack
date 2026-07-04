/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogtitle1Inputs */

const en_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notes from the workshop.`)
};

const es_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notas desde el taller.`)
};

const zh_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来自工作台的笔记。`)
};

const ja_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ワークショップのメモ。`)
};

const ko_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`워크숍에서 얻은 메모입니다.`)
};

const zh_hant1_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`來自工作台的筆記。`)
};

const de_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notizen aus dem Workshop.`)
};

const fr_blogtitle1 = /** @type {(inputs: Blogtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notes de l'atelier.`)
};

/**
* | output |
* | --- |
* | "Notes from the workshop." |
*
* @param {Blogtitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const blogtitle1 = /** @type {((inputs?: Blogtitle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogtitle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogtitle1(inputs)
	if (locale === "es") return es_blogtitle1(inputs)
	if (locale === "zh") return zh_blogtitle1(inputs)
	if (locale === "ja") return ja_blogtitle1(inputs)
	if (locale === "ko") return ko_blogtitle1(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogtitle1(inputs)
	if (locale === "de") return de_blogtitle1(inputs)
	return fr_blogtitle1(inputs)
});
export { blogtitle1 as "blogTitle" }