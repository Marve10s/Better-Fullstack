/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertogglesectionnavigation3Inputs */



/**
* | output |
* | --- |
* | "Toggle section navigation" |
*
* @param {Buildertogglesectionnavigation3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildertogglesectionnavigation3 = /** @type {((inputs?: Buildertogglesectionnavigation3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertogglesectionnavigation3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Alternar navegación de secciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("切换分区导航")
	if (locale === "ja") return /** @type {LocalizedString} */ ("セクションのナビゲーションを切り替えます")
	if (locale === "ko") return /** @type {LocalizedString} */ ("섹션 탐색 전환")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("切換分區導航")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abschnittsnavigation umschalten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Basculer la navigation dans les sections")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перемкнути навігацію розділами")
	return /** @type {LocalizedString} */ ("Toggle section navigation")
});
export { buildertogglesectionnavigation3 as "builderToggleSectionNavigation" }