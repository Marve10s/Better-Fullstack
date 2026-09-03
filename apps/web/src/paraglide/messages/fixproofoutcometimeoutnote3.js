/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcometimeoutnote3Inputs */

const en_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent hit the 30 minute cap. Counted as a failure.`)
};

const es_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El agente llegó al límite de 30 minutos. Cuenta como fallo.`)
};

const zh_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理触及 30 分钟上限。计为失败。`)
};

const ja_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントが 30 分の上限に達しました。失敗として数えます。`)
};

const ko_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트가 30분 제한에 도달했습니다. 실패로 셉니다.`)
};

const zh_hant1_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式觸及 30 分鐘上限。計為失敗。`)
};

const de_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Agent hat das Limit von 30 Minuten erreicht. Zählt als Fehlschlag.`)
};

const fr_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`L'agent a atteint la limite de 30 minutes. Compté comme un échec.`)
};

const uk_fixproofoutcometimeoutnote3 = /** @type {(inputs: Fixproofoutcometimeoutnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Агент досяг ліміту в 30 хвилин. Рахується як провал.`)
};

/**
* | output |
* | --- |
* | "The agent hit the 30 minute cap. Counted as a failure." |
*
* @param {Fixproofoutcometimeoutnote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcometimeoutnote3 = /** @type {((inputs?: Fixproofoutcometimeoutnote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcometimeoutnote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcometimeoutnote3(inputs)
	if (locale === "zh") return zh_fixproofoutcometimeoutnote3(inputs)
	if (locale === "ja") return ja_fixproofoutcometimeoutnote3(inputs)
	if (locale === "ko") return ko_fixproofoutcometimeoutnote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcometimeoutnote3(inputs)
	if (locale === "de") return de_fixproofoutcometimeoutnote3(inputs)
	if (locale === "fr") return fr_fixproofoutcometimeoutnote3(inputs)
	if (locale === "uk") return uk_fixproofoutcometimeoutnote3(inputs)
	return en_fixproofoutcometimeoutnote3(inputs)
});
export { fixproofoutcometimeoutnote3 as "fixproofOutcomeTimeoutNote" }