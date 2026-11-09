/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderclosesectionnavigation3Inputs */



/**
* | output |
* | --- |
* | "Close section navigation" |
*
* @param {Builderclosesectionnavigation3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderclosesectionnavigation3 = /** @type {((inputs?: Builderclosesectionnavigation3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderclosesectionnavigation3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cerrar navegación de secciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("关闭分区导航")
	if (locale === "ja") return /** @type {LocalizedString} */ ("セクションのナビゲーションを閉じる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("섹션 탐색 닫기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("關閉分區導航")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abschnittsnavigation schließen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fermer la navigation dans la section")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Закрити навігацію розділами")
	return /** @type {LocalizedString} */ ("Close section navigation")
});
export { builderclosesectionnavigation3 as "builderCloseSectionNavigation" }