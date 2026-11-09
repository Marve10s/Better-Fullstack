/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001imagealt3Inputs */



/**
* | output |
* | --- |
* | "Solid, Effect, and TanStack logos on a soft neutral background" |
*
* @param {Changelogrelease20261001imagealt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001imagealt3 = /** @type {((inputs?: Changelogrelease20261001imagealt3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001imagealt3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Logotipos de Solid, Effect y TanStack sobre un fondo neutro suave")
	if (locale === "zh") return /** @type {LocalizedString} */ ("柔和中性背景上的 Solid、Effect 和 TanStack 标志")
	if (locale === "ja") return /** @type {LocalizedString} */ ("淡いニュートラルな背景に Solid、Effect、TanStack のロゴ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("부드러운 중립 배경 위의 Solid, Effect, TanStack 로고")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("柔和中性背景上的 Solid、Effect 與 TanStack 標誌")
	if (locale === "de") return /** @type {LocalizedString} */ ("Logos von Solid, Effect und TanStack auf hellem, neutralem Hintergrund")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Logos de Solid, Effect et TanStack sur un fond neutre et doux")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Логотипи Solid, Effect і TanStack на м'якому нейтральному тлі")
	return /** @type {LocalizedString} */ ("Solid, Effect, and TanStack logos on a soft neutral background")
});
export { changelogrelease20261001imagealt3 as "changelogRelease20261001ImageAlt" }