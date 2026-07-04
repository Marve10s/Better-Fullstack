/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navopenmenu2Inputs */

const en_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open menu`)
};

const es_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir menú`)
};

const zh_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开菜单`)
};

const ja_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`メニューを開く`)
};

const ko_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`메뉴 열기`)
};

const zh_hant1_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟選單`)
};

const de_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menü öffnen`)
};

const fr_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir le menu`)
};

/**
* | output |
* | --- |
* | "Open menu" |
*
* @param {Navopenmenu2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navopenmenu2 = /** @type {((inputs?: Navopenmenu2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navopenmenu2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navopenmenu2(inputs)
	if (locale === "es") return es_navopenmenu2(inputs)
	if (locale === "zh") return zh_navopenmenu2(inputs)
	if (locale === "ja") return ja_navopenmenu2(inputs)
	if (locale === "ko") return ko_navopenmenu2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navopenmenu2(inputs)
	if (locale === "de") return de_navopenmenu2(inputs)
	return fr_navopenmenu2(inputs)
});
export { navopenmenu2 as "navOpenMenu" }