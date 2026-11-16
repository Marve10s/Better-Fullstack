/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonyes4Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aceptar los valores predeterminados. Es incompatible con los flags principales del stack.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("接受默认值。与核心技术栈参数冲突。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("デフォルトを受け入れます。コアスタックのフラグとは併用できません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기본값을 수락합니다. 핵심 스택 플래그와 함께 쓸 수 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("接受預設值。無法與核心技術堆疊旗標併用。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Standardwerte übernehmen. Nicht mit den zentralen Stack-Flags kombinierbar.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Accepter les valeurs par défaut. Incompatible avec les options principales du stack.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Прийняти типові значення. Несумісний з основними прапорцями стеку.")
	return /** @type {LocalizedString} */ ("Accept defaults. Conflicts with core stack flags.")
});
export { docsclisummarycommonyes4 as "docsCliSummaryCommonYes" }