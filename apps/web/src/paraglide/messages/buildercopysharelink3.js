/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercopysharelink3Inputs */



/**
* | output |
* | --- |
* | "Copy Share Link" |
*
* @param {Buildercopysharelink3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercopysharelink3 = /** @type {((inputs?: Buildercopysharelink3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercopysharelink3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar enlace para compartir")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制分享链接")
	if (locale === "ja") return /** @type {LocalizedString} */ ("共有リンクをコピー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공유 링크 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製分享連結")
	if (locale === "de") return /** @type {LocalizedString} */ ("Teilen-Link kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier le lien de partage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Копіювати посилання для спільного доступу")
	return /** @type {LocalizedString} */ ("Copy Share Link")
});
export { buildercopysharelink3 as "builderCopyShareLink" }