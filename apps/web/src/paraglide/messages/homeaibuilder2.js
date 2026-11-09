/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaibuilder2Inputs */



/**
* | output |
* | --- |
* | "And the builder is still a fun way to find new tools." |
*
* @param {Homeaibuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaibuilder2 = /** @type {((inputs?: Homeaibuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaibuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Y el builder sigue siendo una forma divertida de descubrir herramientas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("而且构建器依然是发现新工具的有趣方式。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("それに、ビルダーは新しいツールを見つける楽しい方法でもあります。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("그리고 빌더는 여전히 새 도구를 발견하는 즐거운 방법입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("而且建構器依然是發現新工具的有趣方式。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Und der Builder bleibt ein guter Weg, neue Tools zu entdecken.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Et le builder reste une façon sympa de découvrir de nouveaux outils.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("А білдер і далі лишається приємним способом знаходити нові інструменти.")
	return /** @type {LocalizedString} */ ("And the builder is still a fun way to find new tools.")
});
export { homeaibuilder2 as "homeAiBuilder" }