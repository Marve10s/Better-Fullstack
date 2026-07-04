/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navopendocsmenu3Inputs */

const en_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open documentation menu`)
};

const es_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir menú de documentación`)
};

const zh_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开文档菜单`)
};

const ja_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメントメニューを開く`)
};

const ko_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서 메뉴 열기`)
};

const zh_hant1_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟文件選單`)
};

const de_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumentationsmenü öffnen`)
};

const fr_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir le menu Documentation`)
};

/**
* | output |
* | --- |
* | "Open documentation menu" |
*
* @param {Navopendocsmenu3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navopendocsmenu3 = /** @type {((inputs?: Navopendocsmenu3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navopendocsmenu3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navopendocsmenu3(inputs)
	if (locale === "es") return es_navopendocsmenu3(inputs)
	if (locale === "zh") return zh_navopendocsmenu3(inputs)
	if (locale === "ja") return ja_navopendocsmenu3(inputs)
	if (locale === "ko") return ko_navopendocsmenu3(inputs)
	if (locale === "zh-Hant") return zh_hant1_navopendocsmenu3(inputs)
	if (locale === "de") return de_navopendocsmenu3(inputs)
	return fr_navopendocsmenu3(inputs)
});
export { navopendocsmenu3 as "navOpenDocsMenu" }