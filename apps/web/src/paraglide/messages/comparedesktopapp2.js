/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedesktopapp2Inputs */



/**
* | output |
* | --- |
* | "Desktop app (Tauri)" |
*
* @param {Comparedesktopapp2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparedesktopapp2 = /** @type {((inputs?: Comparedesktopapp2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedesktopapp2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("App de escritorio (Tauri)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("桌面应用（Tauri）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("デスクトップ アプリ (Tauri)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("데스크톱 앱(Tauri)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("桌面應用（Tauri）")
	if (locale === "de") return /** @type {LocalizedString} */ ("Desktop-App (Tauri)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Application de bureau (Tauri)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Десктопний застосунок (Tauri)")
	return /** @type {LocalizedString} */ ("Desktop app (Tauri)")
});
export { comparedesktopapp2 as "compareDesktopApp" }