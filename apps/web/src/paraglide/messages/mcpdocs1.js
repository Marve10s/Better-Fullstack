/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpdocs1Inputs */

const en_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const es_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const zh_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

const ja_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメント`)
};

const ko_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서`)
};

const zh_hant1_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件`)
};

const de_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumente`)
};

const fr_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documents`)
};

/**
* | output |
* | --- |
* | "Docs" |
*
* @param {Mcpdocs1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpdocs1 = /** @type {((inputs?: Mcpdocs1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpdocs1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpdocs1(inputs)
	if (locale === "es") return es_mcpdocs1(inputs)
	if (locale === "zh") return zh_mcpdocs1(inputs)
	if (locale === "ja") return ja_mcpdocs1(inputs)
	if (locale === "ko") return ko_mcpdocs1(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpdocs1(inputs)
	if (locale === "de") return de_mcpdocs1(inputs)
	return fr_mcpdocs1(inputs)
});
export { mcpdocs1 as "mcpDocs" }