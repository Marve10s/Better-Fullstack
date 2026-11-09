/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersharelinkfailed3Inputs */



/**
* | output |
* | --- |
* | "Failed to copy link" |
*
* @param {Buildersharelinkfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersharelinkfailed3 = /** @type {((inputs?: Buildersharelinkfailed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersharelinkfailed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se pudo copiar el enlace")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制链接失败")
	if (locale === "ja") return /** @type {LocalizedString} */ ("リンクのコピーに失敗しました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("링크를 복사하지 못했습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製連結失敗")
	if (locale === "de") return /** @type {LocalizedString} */ ("Link konnte nicht kopiert werden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Échec de la copie du lien")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не вдалося скопіювати посилання")
	return /** @type {LocalizedString} */ ("Failed to copy link")
});
export { buildersharelinkfailed3 as "builderShareLinkFailed" }