/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdocs1Inputs */

const en_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const es_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const zh_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

const ja_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメント`)
};

const ko_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서`)
};

const zh_hant1_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件`)
};

const de_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumente`)
};

const fr_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documents`)
};

/**
* | output |
* | --- |
* | "Docs" |
*
* @param {Builderdocs1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderdocs1 = /** @type {((inputs?: Builderdocs1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdocs1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdocs1(inputs)
	if (locale === "es") return es_builderdocs1(inputs)
	if (locale === "zh") return zh_builderdocs1(inputs)
	if (locale === "ja") return ja_builderdocs1(inputs)
	if (locale === "ko") return ko_builderdocs1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderdocs1(inputs)
	if (locale === "de") return de_builderdocs1(inputs)
	return fr_builderdocs1(inputs)
});
export { builderdocs1 as "builderDocs" }