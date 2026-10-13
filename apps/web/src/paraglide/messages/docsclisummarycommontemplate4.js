/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommontemplate4Inputs */

const en_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start from a curated stack preset instead of individual flags.`)
};

const es_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Partir de una configuración de stack seleccionada en lugar de flags individuales.`)
};

const zh_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`从精选的技术栈预设开始，而不是逐个指定参数。`)
};

const ja_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`個別のフラグではなく、厳選されたスタックのプリセットから始めます。`)
};

const ko_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`개별 플래그 대신 선별된 스택 사전 설정으로 시작합니다.`)
};

const zh_hant1_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`從精選的技術堆疊預設開始，而非逐一指定旗標。`)
};

const de_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mit einer kuratierten Stack-Voreinstellung statt mit einzelnen Flags beginnen.`)
};

const fr_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Partir d’un préréglage de stack sélectionné plutôt que d’options individuelles.`)
};

const uk_docsclisummarycommontemplate4 = /** @type {(inputs: Docsclisummarycommontemplate4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Почати з підібраної конфігурації стеку замість окремих прапорців.`)
};

/**
* | output |
* | --- |
* | "Start from a curated stack preset instead of individual flags." |
*
* @param {Docsclisummarycommontemplate4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommontemplate4 = /** @type {((inputs?: Docsclisummarycommontemplate4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommontemplate4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommontemplate4(inputs)
	if (locale === "zh") return zh_docsclisummarycommontemplate4(inputs)
	if (locale === "ja") return ja_docsclisummarycommontemplate4(inputs)
	if (locale === "ko") return ko_docsclisummarycommontemplate4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommontemplate4(inputs)
	if (locale === "de") return de_docsclisummarycommontemplate4(inputs)
	if (locale === "fr") return fr_docsclisummarycommontemplate4(inputs)
	if (locale === "uk") return uk_docsclisummarycommontemplate4(inputs)
	return en_docsclisummarycommontemplate4(inputs)
});
export { docsclisummarycommontemplate4 as "docsCliSummaryCommonTemplate" }