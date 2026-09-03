/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep22Inputs */

const en_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent works unattended for up to 30 minutes with the symptom statement and the code.`)
};

const es_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El agente trabaja sin supervisión hasta 30 minutos con la descripción del síntoma y el código.`)
};

const zh_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理带着现象描述和代码，无人值守地工作最多 30 分钟。`)
};

const ja_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントは症状の説明とコードだけを手がかりに、最大 30 分間、無人で作業します。`)
};

const ko_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트는 증상 설명과 코드만 가지고 최대 30분 동안 무인으로 작업합니다.`)
};

const zh_hant1_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式帶著現象描述和程式碼，無人值守地工作最多 30 分鐘。`)
};

const de_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Agent arbeitet bis zu 30 Minuten unbeaufsichtigt mit der Symptombeschreibung und dem Code.`)
};

const fr_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`L'agent travaille sans surveillance pendant 30 minutes au maximum, avec l'énoncé du symptôme et le code.`)
};

const uk_fixproofprovenancestep22 = /** @type {(inputs: Fixproofprovenancestep22Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Агент працює без нагляду до 30 хвилин, маючи опис симптому й код.`)
};

/**
* | output |
* | --- |
* | "The agent works unattended for up to 30 minutes with the symptom statement and the code." |
*
* @param {Fixproofprovenancestep22Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep22 = /** @type {((inputs?: Fixproofprovenancestep22Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep22Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep22(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep22(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep22(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep22(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep22(inputs)
	if (locale === "de") return de_fixproofprovenancestep22(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep22(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep22(inputs)
	return en_fixproofprovenancestep22(inputs)
});
export { fixproofprovenancestep22 as "fixproofProvenanceStep2" }