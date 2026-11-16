/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltoolintent4Inputs */



/**
* | output |
* | --- |
* | "Move fast with CRUD" |
*
* @param {Presettrackinternaltoolintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackinternaltoolintent4 = /** @type {((inputs?: Presettrackinternaltoolintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackinternaltoolintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Avanzar rápido con CRUD")
	if (locale === "zh") return /** @type {LocalizedString} */ ("快速构建 CRUD")
	if (locale === "ja") return /** @type {LocalizedString} */ ("CRUD で迅速に行動する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("CRUD로 빠르게 이동")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("快速建置 CRUD")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bewegen Sie sich schnell mit CRUD")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Avancez vite avec le CRUD")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Швидко зібрати CRUD")
	return /** @type {LocalizedString} */ ("Move fast with CRUD")
});
export { presettrackinternaltoolintent4 as "presetTrackInternalToolIntent" }