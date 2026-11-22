/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersectionnavigation2Inputs */



/**
* | output |
* | --- |
* | "Section navigation" |
*
* @param {Buildersectionnavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersectionnavigation2 = /** @type {((inputs?: Buildersectionnavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersectionnavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Navegación de secciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("分区导航")
	if (locale === "ja") return /** @type {LocalizedString} */ ("セクションのナビゲーション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("섹션 탐색")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("分區導航")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abschnittsnavigation")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Navigation dans les sections")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Навігація по розділах")
	return /** @type {LocalizedString} */ ("Section navigation")
});
export { buildersectionnavigation2 as "builderSectionNavigation" }