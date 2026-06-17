/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderopendocumentation2Inputs */

const en_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open documentation`)
};

const es_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir documentación`)
};

const zh_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开文档`)
};

const ja_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`オープンドキュメント`)
};

const ko_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서 열기`)
};

const zh_hant1_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟文件`)
};

const de_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumentation öffnen`)
};

const fr_builderopendocumentation2 = /** @type {(inputs: Builderopendocumentation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir la documentation`)
};

/**
* | output |
* | --- |
* | "Open documentation" |
*
* @param {Builderopendocumentation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderopendocumentation2 = /** @type {((inputs?: Builderopendocumentation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderopendocumentation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderopendocumentation2(inputs)
	if (locale === "es") return es_builderopendocumentation2(inputs)
	if (locale === "zh") return zh_builderopendocumentation2(inputs)
	if (locale === "ja") return ja_builderopendocumentation2(inputs)
	if (locale === "ko") return ko_builderopendocumentation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderopendocumentation2(inputs)
	if (locale === "de") return de_builderopendocumentation2(inputs)
	return fr_builderopendocumentation2(inputs)
});
export { builderopendocumentation2 as "builderOpenDocumentation" }