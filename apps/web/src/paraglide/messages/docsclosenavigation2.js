/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ section: NonNullable<unknown> }} Docsclosenavigation2Inputs */



/**
* | output |
* | --- |
* | "Close {section} navigation" |
*
* @param {Docsclosenavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclosenavigation2 = /** @type {((inputs: Docsclosenavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclosenavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Cerrar navegación de ${i?.section}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`关闭${i?.section}导航`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.section}のナビゲーションを閉じる`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.section} 탐색 닫기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`關閉${i?.section}導覽`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.section}-Navigation schließen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Fermer la navigation ${i?.section}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Закрити навігацію: ${i?.section}`)
	return /** @type {LocalizedString} */ (`Close ${i?.section} navigation`)
});
export { docsclosenavigation2 as "docsCloseNavigation" }