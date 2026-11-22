/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernotcompatiblecurrentstack4Inputs */



/**
* | output |
* | --- |
* | "Not compatible with current stack" |
*
* @param {Buildernotcompatiblecurrentstack4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernotcompatiblecurrentstack4 = /** @type {((inputs?: Buildernotcompatiblecurrentstack4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernotcompatiblecurrentstack4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No compatible con el stack actual")
	if (locale === "zh") return /** @type {LocalizedString} */ ("与当前 stack 不兼容")
	if (locale === "ja") return /** @type {LocalizedString} */ ("現在のスタックと互換性がありません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("현재 스택과 호환되지 않음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("與當前 stack 不相容")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nicht kompatibel mit dem aktuellen Stack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Non compatible avec la pile actuelle")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Несумісний із поточним стеком")
	return /** @type {LocalizedString} */ ("Not compatible with current stack")
});
export { buildernotcompatiblecurrentstack4 as "builderNotCompatibleCurrentStack" }