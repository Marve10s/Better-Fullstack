/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharebuttoncopytitle3Inputs */



/**
* | output |
* | --- |
* | "Copy share link" |
*
* @param {Sharebuttoncopytitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const sharebuttoncopytitle3 = /** @type {((inputs?: Sharebuttoncopytitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharebuttoncopytitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar enlace para compartir")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制分享链接")
	if (locale === "ja") return /** @type {LocalizedString} */ ("共有リンクをコピーする")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공유 링크 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製分享連結")
	if (locale === "de") return /** @type {LocalizedString} */ ("Teilen-Link kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier le lien de partage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Копіювати посилання")
	return /** @type {LocalizedString} */ ("Copy share link")
});
export { sharebuttoncopytitle3 as "shareButtonCopyTitle" }