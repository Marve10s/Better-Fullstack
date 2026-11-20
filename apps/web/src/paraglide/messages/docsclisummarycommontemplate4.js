/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommontemplate4Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Partir de una configuración de stack seleccionada en lugar de flags individuales.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("从精选的技术栈预设开始，而不是逐个指定参数。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("個別のフラグではなく、厳選されたスタックのプリセットから始めます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("개별 플래그 대신 선별된 스택 사전 설정으로 시작합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("從精選的技術堆疊預設開始，而非逐一指定旗標。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mit einer kuratierten Stack-Voreinstellung statt mit einzelnen Flags beginnen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Partir d’un préréglage de stack sélectionné plutôt que d’options individuelles.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Почати з підібраної конфігурації стеку замість окремих прапорців.")
	return /** @type {LocalizedString} */ ("Start from a curated stack preset instead of individual flags.")
});
export { docsclisummarycommontemplate4 as "docsCliSummaryCommonTemplate" }