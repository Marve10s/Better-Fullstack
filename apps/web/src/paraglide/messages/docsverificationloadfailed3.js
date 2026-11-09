/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationloadfailed3Inputs */



/**
* | output |
* | --- |
* | "The current release receipt could not be loaded." |
*
* @param {Docsverificationloadfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationloadfailed3 = /** @type {((inputs?: Docsverificationloadfailed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationloadfailed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se pudo cargar el comprobante de versión actual.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("无法加载当前的发布回执。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("現在のリリースレシートを読み込めませんでした。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("현재 릴리스 증빙을 불러오지 못했습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("無法載入目前的發行回執。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der aktuelle Release-Beleg konnte nicht geladen werden.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le reçu de version actuel n'a pas pu être chargé.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не вдалося завантажити актуальне підтвердження релізу.")
	return /** @type {LocalizedString} */ ("The current release receipt could not be loaded.")
});
export { docsverificationloadfailed3 as "docsVerificationLoadFailed" }