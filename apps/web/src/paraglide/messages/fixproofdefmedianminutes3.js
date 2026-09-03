/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefmedianminutes3Inputs */

const en_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap.`)
};

const es_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mediana de minutos reales que el agente trabajó antes de parar o de llegar al límite de 30 minutos.`)
};

const zh_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理在停止或触及 30 分钟上限之前实际工作时长的中位数（分钟）。`)
};

const ja_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントが停止するか 30 分の上限に達するまでに作業した実時間の中央値 (分) です。`)
};

const ko_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트가 멈추거나 30분 제한에 도달할 때까지 작업한 실제 시간의 중앙값입니다.`)
};

const zh_hant1_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式在停止或觸及 30 分鐘上限之前實際工作時長的中位數（分鐘）。`)
};

const de_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median der tatsächlich verstrichenen Minuten, die der Agent gearbeitet hat, bevor er gestoppt hat oder das Limit von 30 Minuten erreicht war.`)
};

const fr_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Médiane des minutes réelles travaillées par l'agent avant qu'il s'arrête ou atteigne la limite de 30 minutes.`)
};

const uk_fixproofdefmedianminutes3 = /** @type {(inputs: Fixproofdefmedianminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Медіана реального часу в хвилинах, який агент працював, доки не зупинився або не досяг ліміту в 30 хвилин.`)
};

/**
* | output |
* | --- |
* | "Median wall-clock minutes the agent worked before it stopped or hit the 30 minute cap." |
*
* @param {Fixproofdefmedianminutes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefmedianminutes3 = /** @type {((inputs?: Fixproofdefmedianminutes3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefmedianminutes3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefmedianminutes3(inputs)
	if (locale === "zh") return zh_fixproofdefmedianminutes3(inputs)
	if (locale === "ja") return ja_fixproofdefmedianminutes3(inputs)
	if (locale === "ko") return ko_fixproofdefmedianminutes3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefmedianminutes3(inputs)
	if (locale === "de") return de_fixproofdefmedianminutes3(inputs)
	if (locale === "fr") return fr_fixproofdefmedianminutes3(inputs)
	if (locale === "uk") return uk_fixproofdefmedianminutes3(inputs)
	return en_fixproofdefmedianminutes3(inputs)
});
export { fixproofdefmedianminutes3 as "fixproofDefMedianMinutes" }