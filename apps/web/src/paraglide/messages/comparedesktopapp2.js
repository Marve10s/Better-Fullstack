/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedesktopapp2Inputs */

const en_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desktop app (Tauri)`)
};

const es_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App de escritorio (Tauri)`)
};

const zh_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`桌面应用（Tauri）`)
};

const ja_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`デスクトップ アプリ (Tauri)`)
};

const ko_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`데스크톱 앱(Tauri)`)
};

const zh_hant1_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`桌面應用（Tauri）`)
};

const de_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desktop-App (Tauri)`)
};

const fr_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Application de bureau (Tauri)`)
};

/**
* | output |
* | --- |
* | "Desktop app (Tauri)" |
*
* @param {Comparedesktopapp2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparedesktopapp2 = /** @type {((inputs?: Comparedesktopapp2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedesktopapp2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparedesktopapp2(inputs)
	if (locale === "es") return es_comparedesktopapp2(inputs)
	if (locale === "zh") return zh_comparedesktopapp2(inputs)
	if (locale === "ja") return ja_comparedesktopapp2(inputs)
	if (locale === "ko") return ko_comparedesktopapp2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparedesktopapp2(inputs)
	if (locale === "de") return de_comparedesktopapp2(inputs)
	return fr_comparedesktopapp2(inputs)
});
export { comparedesktopapp2 as "compareDesktopApp" }