/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homereaddocs2Inputs */

const en_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read the docs`)
};

const es_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer la documentación`)
};

const zh_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读文档`)
};

const ja_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメントを読む`)
};

const ko_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서 읽기`)
};

const zh_hant1_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閱讀文件`)
};

const de_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lesen Sie die Dokumente`)
};

const fr_homereaddocs2 = /** @type {(inputs: Homereaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lire la documentation`)
};

/**
* | output |
* | --- |
* | "Read the docs" |
*
* @param {Homereaddocs2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homereaddocs2 = /** @type {((inputs?: Homereaddocs2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homereaddocs2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homereaddocs2(inputs)
	if (locale === "es") return es_homereaddocs2(inputs)
	if (locale === "zh") return zh_homereaddocs2(inputs)
	if (locale === "ja") return ja_homereaddocs2(inputs)
	if (locale === "ko") return ko_homereaddocs2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homereaddocs2(inputs)
	if (locale === "de") return de_homereaddocs2(inputs)
	return fr_homereaddocs2(inputs)
});
export { homereaddocs2 as "homeReadDocs" }