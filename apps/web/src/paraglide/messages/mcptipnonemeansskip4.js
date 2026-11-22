/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipnonemeansskip4Inputs */



/**
* | output |
* | --- |
* | "\"none\" means skip, not \"use the default\"" |
*
* @param {Mcptipnonemeansskip4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptipnonemeansskip4 = /** @type {((inputs?: Mcptipnonemeansskip4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipnonemeansskip4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("\"none\" significa omitir, no \"usar el predeterminado\"")
	if (locale === "zh") return /** @type {LocalizedString} */ ("\"none\" 表示跳过，不是“使用默认值”")
	if (locale === "ja") return /** @type {LocalizedString} */ ("「なし」は「デフォルトを使用する」ではなく、スキップすることを意味します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("\"none\"은 \"기본값 사용\"이 아니라 건너뛰기를 의미합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("\"none\" 表示跳過，不是“使用預設值”")
	if (locale === "de") return /** @type {LocalizedString} */ ("„keine“ bedeutet überspringen, nicht „Standard verwenden“")
	if (locale === "fr") return /** @type {LocalizedString} */ ("\"aucun\" signifie ignorer, et non \"utiliser la valeur par défaut\"")
	if (locale === "uk") return /** @type {LocalizedString} */ ("\"none\" означає пропустити, а не \"використовувати за замовчуванням\"")
	return /** @type {LocalizedString} */ ("\"none\" means skip, not \"use the default\"")
});
export { mcptipnonemeansskip4 as "mcpTipNoneMeansSkip" }