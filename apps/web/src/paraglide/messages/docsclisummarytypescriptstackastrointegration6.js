/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackastrointegration6Inputs */



/**
* | output |
* | --- |
* | "Astro UI framework integration (Astro frontends)." |
*
* @param {Docsclisummarytypescriptstackastrointegration6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackastrointegration6 = /** @type {((inputs?: Docsclisummarytypescriptstackastrointegration6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackastrointegration6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Integración de un framework de interfaz en Astro (frontends Astro).")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Astro UI 框架集成（适用于 Astro 前端）。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Astro の UI フレームワーク統合 (Astro フロントエンド向け)。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Astro UI 프레임워크 통합(Astro 프런트엔드용).")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Astro UI 框架整合（適用於 Astro 前端）。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Integration eines UI-Frameworks in Astro (Astro-Frontends).")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Intégration d’un framework d’interface dans Astro (frontends Astro).")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інтеграція UI-фреймворку в Astro (фронтенди Astro).")
	return /** @type {LocalizedString} */ ("Astro UI framework integration (Astro frontends).")
});
export { docsclisummarytypescriptstackastrointegration6 as "docsCliSummaryTypescriptStackAstroIntegration" }