/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclosenavigation2Inputs */

const en_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close docs navigation`)
};

const es_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar navegación de docs`)
};

const zh_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭文档导航`)
};

const ja_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメントのナビゲーションを閉じる`)
};

const ko_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서 탐색 닫기`)
};

const zh_hant1_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`關閉文件導航`)
};

const de_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schließen Sie die Dokumentennavigation`)
};

const fr_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fermer la navigation dans les documents`)
};

/**
* | output |
* | --- |
* | "Close docs navigation" |
*
* @param {Docsclosenavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docsclosenavigation2 = /** @type {((inputs?: Docsclosenavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclosenavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsclosenavigation2(inputs)
	if (locale === "es") return es_docsclosenavigation2(inputs)
	if (locale === "zh") return zh_docsclosenavigation2(inputs)
	if (locale === "ja") return ja_docsclosenavigation2(inputs)
	if (locale === "ko") return ko_docsclosenavigation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclosenavigation2(inputs)
	if (locale === "de") return de_docsclosenavigation2(inputs)
	return fr_docsclosenavigation2(inputs)
});
export { docsclosenavigation2 as "docsCloseNavigation" }