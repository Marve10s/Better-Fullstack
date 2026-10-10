/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonyes4Inputs */

const en_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Accept defaults. Conflicts with core stack flags.`)
};

const es_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aceptar los valores predeterminados. Es incompatible con los flags principales del stack.`)
};

const zh_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`接受默认值。与核心技术栈参数冲突。`)
};

const ja_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`デフォルトを受け入れます。コアスタックのフラグとは併用できません。`)
};

const ko_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기본값을 수락합니다. 핵심 스택 플래그와 함께 쓸 수 없습니다.`)
};

const zh_hant1_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`接受預設值。無法與核心技術堆疊旗標併用。`)
};

const de_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Standardwerte übernehmen. Nicht mit den zentralen Stack-Flags kombinierbar.`)
};

const fr_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Accepter les valeurs par défaut. Incompatible avec les options principales du stack.`)
};

const uk_docsclisummarycommonyes4 = /** @type {(inputs: Docsclisummarycommonyes4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Прийняти типові значення. Несумісний з основними прапорцями стеку.`)
};

/**
* | output |
* | --- |
* | "Accept defaults. Conflicts with core stack flags." |
*
* @param {Docsclisummarycommonyes4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonyes4 = /** @type {((inputs?: Docsclisummarycommonyes4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonyes4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonyes4(inputs)
	if (locale === "zh") return zh_docsclisummarycommonyes4(inputs)
	if (locale === "ja") return ja_docsclisummarycommonyes4(inputs)
	if (locale === "ko") return ko_docsclisummarycommonyes4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonyes4(inputs)
	if (locale === "de") return de_docsclisummarycommonyes4(inputs)
	if (locale === "fr") return fr_docsclisummarycommonyes4(inputs)
	if (locale === "uk") return uk_docsclisummarycommonyes4(inputs)
	return en_docsclisummarycommonyes4(inputs)
});
export { docsclisummarycommonyes4 as "docsCliSummaryCommonYes" }