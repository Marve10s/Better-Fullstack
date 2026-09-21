/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaibuilder2Inputs */

const en_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`And the builder is still a fun way to find new tools.`)
};

const es_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Y el builder sigue siendo una forma divertida de descubrir herramientas.`)
};

const zh_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`而且构建器依然是发现新工具的有趣方式。`)
};

const ja_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`それに、ビルダーは新しいツールを見つける楽しい方法でもあります。`)
};

const ko_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`그리고 빌더는 여전히 새 도구를 발견하는 즐거운 방법입니다.`)
};

const zh_hant1_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`而且建構器依然是發現新工具的有趣方式。`)
};

const de_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Und der Builder bleibt ein guter Weg, neue Tools zu entdecken.`)
};

const fr_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Et le builder reste une façon sympa de découvrir de nouveaux outils.`)
};

const uk_homeaibuilder2 = /** @type {(inputs: Homeaibuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`А білдер і далі лишається приємним способом знаходити нові інструменти.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaibuilder2(inputs)
	if (locale === "zh") return zh_homeaibuilder2(inputs)
	if (locale === "ja") return ja_homeaibuilder2(inputs)
	if (locale === "ko") return ko_homeaibuilder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaibuilder2(inputs)
	if (locale === "de") return de_homeaibuilder2(inputs)
	if (locale === "fr") return fr_homeaibuilder2(inputs)
	if (locale === "uk") return uk_homeaibuilder2(inputs)
	return en_homeaibuilder2(inputs)
});
export { homeaibuilder2 as "homeAiBuilder" }