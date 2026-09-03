/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomefailednote3Inputs */

const en_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent finished inside the cap and no requirement moved.`)
};

const es_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El agente terminó dentro del límite y ningún requisito se movió.`)
};

const zh_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理在上限内结束，但没有任何需求发生变化。`)
};

const ja_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントは上限内で終了しましたが、要件は 1 つも動きませんでした。`)
};

const ko_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트가 제한 시간 안에 끝냈지만 움직인 요구사항은 없습니다.`)
};

const zh_hant1_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式在上限內結束，但沒有任何需求發生變化。`)
};

const de_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Agent war innerhalb des Limits fertig, und keine Anforderung hat sich bewegt.`)
};

const fr_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`L'agent a terminé dans la limite et aucune exigence n'a bougé.`)
};

const uk_fixproofoutcomefailednote3 = /** @type {(inputs: Fixproofoutcomefailednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Агент завершив роботу в межах ліміту, і жодна вимога не зрушила.`)
};

/**
* | output |
* | --- |
* | "The agent finished inside the cap and no requirement moved." |
*
* @param {Fixproofoutcomefailednote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomefailednote3 = /** @type {((inputs?: Fixproofoutcomefailednote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomefailednote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomefailednote3(inputs)
	if (locale === "zh") return zh_fixproofoutcomefailednote3(inputs)
	if (locale === "ja") return ja_fixproofoutcomefailednote3(inputs)
	if (locale === "ko") return ko_fixproofoutcomefailednote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomefailednote3(inputs)
	if (locale === "de") return de_fixproofoutcomefailednote3(inputs)
	if (locale === "fr") return fr_fixproofoutcomefailednote3(inputs)
	if (locale === "uk") return uk_fixproofoutcomefailednote3(inputs)
	return en_fixproofoutcomefailednote3(inputs)
});
export { fixproofoutcomefailednote3 as "fixproofOutcomeFailedNote" }