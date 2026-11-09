/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ section: NonNullable<unknown> }} Docsopennavigation2Inputs */



/**
* | output |
* | --- |
* | "Open {section} navigation" |
*
* @param {Docsopennavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsopennavigation2 = /** @type {((inputs: Docsopennavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsopennavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Abrir navegación de ${i?.section}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`打开${i?.section}导航`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.section}のナビゲーションを開く`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.section} 탐색 열기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`開啟${i?.section}導覽`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.section}-Navigation öffnen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Ouvrir la navigation ${i?.section}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Відкрити навігацію: ${i?.section}`)
	return /** @type {LocalizedString} */ (`Open ${i?.section} navigation`)
});
export { docsopennavigation2 as "docsOpenNavigation" }