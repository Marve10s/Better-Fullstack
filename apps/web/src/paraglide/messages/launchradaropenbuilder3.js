/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Launchradaropenbuilder3Inputs */



/**
* | output |
* | --- |
* | "Open {ecosystem} additions" |
*
* @param {Launchradaropenbuilder3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradaropenbuilder3 = /** @type {((inputs: Launchradaropenbuilder3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradaropenbuilder3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Abrir las novedades de ${i?.ecosystem}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`打开 ${i?.ecosystem} 的新增内容`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} の追加項目を開く`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem} 추가 항목 열기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`開啟 ${i?.ecosystem} 的新內容`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Neuerungen für ${i?.ecosystem} öffnen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Ouvrir les nouveautés ${i?.ecosystem}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Відкрити новинки ${i?.ecosystem}`)
	return /** @type {LocalizedString} */ (`Open ${i?.ecosystem} additions`)
});
export { launchradaropenbuilder3 as "launchRadarOpenBuilder" }