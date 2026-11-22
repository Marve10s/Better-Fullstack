/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaimoreworking3Inputs */



/**
* | output |
* | --- |
* | "more projects that actually run" |
*
* @param {Homeaimoreworking3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaimoreworking3 = /** @type {((inputs?: Homeaimoreworking3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaimoreworking3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("más proyectos que de verdad funcionan")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更多真正能跑起来的项目")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実際に動くプロジェクトが増える")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실제로 돌아가는 프로젝트가 더 많이")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更多真正能跑起來的專案")
	if (locale === "de") return /** @type {LocalizedString} */ ("mehr Projekte, die wirklich laufen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("plus de projets qui fonctionnent vraiment")
	if (locale === "uk") return /** @type {LocalizedString} */ ("більше проєктів, які справді працюють")
	return /** @type {LocalizedString} */ ("more projects that actually run")
});
export { homeaimoreworking3 as "homeAiMoreWorking" }