/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaltitle2Inputs */

const en_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`See how agents score on`)
};

const es_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mira cómo puntúan los agentes con`)
};

const zh_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在真实问题上`)
};

const ja_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントの成績が分かるのは`)
};

const ko_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트의 성적을 보여 주는 기준은`)
};

const zh_hant1_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在真實問題上`)
};

const de_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sehen Sie, wie Agenten abschneiden bei`)
};

const fr_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voyez comment les agents s'en sortent sur`)
};

const uk_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Подивіться, як агенти показують себе на`)
};

/**
* | output |
* | --- |
* | "See how agents score on" |
*
* @param {Mcpfinaltitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpfinaltitle2 = /** @type {((inputs?: Mcpfinaltitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaltitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_mcpfinaltitle2(inputs)
	if (locale === "zh") return zh_mcpfinaltitle2(inputs)
	if (locale === "ja") return ja_mcpfinaltitle2(inputs)
	if (locale === "ko") return ko_mcpfinaltitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpfinaltitle2(inputs)
	if (locale === "de") return de_mcpfinaltitle2(inputs)
	if (locale === "fr") return fr_mcpfinaltitle2(inputs)
	if (locale === "uk") return uk_mcpfinaltitle2(inputs)
	return en_mcpfinaltitle2(inputs)
});
export { mcpfinaltitle2 as "mcpFinalTitle" }