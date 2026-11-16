/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersharelinkcopied3Inputs */



/**
* | output |
* | --- |
* | "Share link copied!" |
*
* @param {Buildersharelinkcopied3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersharelinkcopied3 = /** @type {((inputs?: Buildersharelinkcopied3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersharelinkcopied3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Enlace copiado.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("分享链接已复制！")
	if (locale === "ja") return /** @type {LocalizedString} */ ("共有リンクがコピーされました!")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공유 링크가 복사되었습니다!")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("分享連結已複製！")
	if (locale === "de") return /** @type {LocalizedString} */ ("Teilen-Link kopiert!")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Lien de partage copié !")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Посилання для спільного доступу скопійовано!")
	return /** @type {LocalizedString} */ ("Share link copied!")
});
export { buildersharelinkcopied3 as "builderShareLinkCopied" }