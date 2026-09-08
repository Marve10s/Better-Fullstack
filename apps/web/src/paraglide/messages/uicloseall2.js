/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uicloseall2Inputs */

const en_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close all`)
};

const es_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar todo`)
};

const zh_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部关闭`)
};

const ja_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべて閉じる`)
};

const ko_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모두 닫기`)
};

const zh_hant1_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部關閉`)
};

const de_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alle schließen`)
};

const fr_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tout fermer`)
};

const uk_uicloseall2 = /** @type {(inputs: Uicloseall2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Закрити всі`)
};

/**
* | output |
* | --- |
* | "Close all" |
*
* @param {Uicloseall2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const uicloseall2 = /** @type {((inputs?: Uicloseall2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uicloseall2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_uicloseall2(inputs)
	if (locale === "zh") return zh_uicloseall2(inputs)
	if (locale === "ja") return ja_uicloseall2(inputs)
	if (locale === "ko") return ko_uicloseall2(inputs)
	if (locale === "zh-Hant") return zh_hant1_uicloseall2(inputs)
	if (locale === "de") return de_uicloseall2(inputs)
	if (locale === "fr") return fr_uicloseall2(inputs)
	if (locale === "uk") return uk_uicloseall2(inputs)
	return en_uicloseall2(inputs)
});
export { uicloseall2 as "uiCloseAll" }