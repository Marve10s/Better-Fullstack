/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetopenmenu2Inputs */

const en_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open preset menu`)
};

const es_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir menú de plantillas`)
};

const zh_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开预设菜单`)
};

const ja_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセットメニューを開く`)
};

const ko_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정 메뉴 열기`)
};

const zh_hant1_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟預設選單`)
};

const de_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreingestelltes Menü öffnen`)
};

const fr_presetopenmenu2 = /** @type {(inputs: Presetopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir le menu prédéfini`)
};

/**
* | output |
* | --- |
* | "Open preset menu" |
*
* @param {Presetopenmenu2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presetopenmenu2 = /** @type {((inputs?: Presetopenmenu2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetopenmenu2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetopenmenu2(inputs)
	if (locale === "es") return es_presetopenmenu2(inputs)
	if (locale === "zh") return zh_presetopenmenu2(inputs)
	if (locale === "ja") return ja_presetopenmenu2(inputs)
	if (locale === "ko") return ko_presetopenmenu2(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetopenmenu2(inputs)
	if (locale === "de") return de_presetopenmenu2(inputs)
	return fr_presetopenmenu2(inputs)
});
export { presetopenmenu2 as "presetOpenMenu" }