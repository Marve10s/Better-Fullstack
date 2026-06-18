/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharedstackseotitle3Inputs */

const en_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Shared Stack | Better Fullstack`)
};

const es_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack compartido | Better Fullstack`)
};

const zh_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共享 Stack | Better Fullstack`)
};

const ja_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共有スタック | Better Fullstack`)
};

const ko_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공유 스택 | Better Fullstack`)
};

const zh_hant1_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共享 Stack | Better Fullstack`)
};

const de_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Geteilter Stapel | Better Fullstack`)
};

const fr_sharedstackseotitle3 = /** @type {(inputs: Sharedstackseotitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pile partagée | Better Fullstack`)
};

/**
* | output |
* | --- |
* | "Shared Stack \| Better Fullstack" |
*
* @param {Sharedstackseotitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const sharedstackseotitle3 = /** @type {((inputs?: Sharedstackseotitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharedstackseotitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharedstackseotitle3(inputs)
	if (locale === "es") return es_sharedstackseotitle3(inputs)
	if (locale === "zh") return zh_sharedstackseotitle3(inputs)
	if (locale === "ja") return ja_sharedstackseotitle3(inputs)
	if (locale === "ko") return ko_sharedstackseotitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_sharedstackseotitle3(inputs)
	if (locale === "de") return de_sharedstackseotitle3(inputs)
	return fr_sharedstackseotitle3(inputs)
});
export { sharedstackseotitle3 as "sharedStackSeoTitle" }