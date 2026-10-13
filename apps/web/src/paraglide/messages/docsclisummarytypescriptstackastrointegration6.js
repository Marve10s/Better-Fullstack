/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackastrointegration6Inputs */

const en_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro UI framework integration (Astro frontends).`)
};

const es_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integración de un framework de interfaz en Astro (frontends Astro).`)
};

const zh_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro UI 框架集成（适用于 Astro 前端）。`)
};

const ja_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro の UI フレームワーク統合 (Astro フロントエンド向け)。`)
};

const ko_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro UI 프레임워크 통합(Astro 프런트엔드용).`)
};

const zh_hant1_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro UI 框架整合（適用於 Astro 前端）。`)
};

const de_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integration eines UI-Frameworks in Astro (Astro-Frontends).`)
};

const fr_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Intégration d’un framework d’interface dans Astro (frontends Astro).`)
};

const uk_docsclisummarytypescriptstackastrointegration6 = /** @type {(inputs: Docsclisummarytypescriptstackastrointegration6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інтеграція UI-фреймворку в Astro (фронтенди Astro).`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackastrointegration6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackastrointegration6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackastrointegration6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackastrointegration6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackastrointegration6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackastrointegration6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackastrointegration6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackastrointegration6(inputs)
	return en_docsclisummarytypescriptstackastrointegration6(inputs)
});
export { docsclisummarytypescriptstackastrointegration6 as "docsCliSummaryTypescriptStackAstroIntegration" }