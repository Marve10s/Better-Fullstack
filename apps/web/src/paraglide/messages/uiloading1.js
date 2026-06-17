/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uiloading1Inputs */

const en_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading`)
};

const es_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargando`)
};

const zh_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载中`)
};

const ja_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`読み込み中`)
};

const ko_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`로드 중`)
};

const zh_hant1_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`載入中`)
};

const de_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Laden`)
};

const fr_uiloading1 = /** @type {(inputs: Uiloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chargement`)
};

/**
* | output |
* | --- |
* | "Loading" |
*
* @param {Uiloading1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const uiloading1 = /** @type {((inputs?: Uiloading1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uiloading1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_uiloading1(inputs)
	if (locale === "es") return es_uiloading1(inputs)
	if (locale === "zh") return zh_uiloading1(inputs)
	if (locale === "ja") return ja_uiloading1(inputs)
	if (locale === "ko") return ko_uiloading1(inputs)
	if (locale === "zh-Hant") return zh_hant1_uiloading1(inputs)
	if (locale === "de") return de_uiloading1(inputs)
	return fr_uiloading1(inputs)
});
export { uiloading1 as "uiLoading" }