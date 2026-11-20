/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlegacytooltip2Inputs */



/**
* | output |
* | --- |
* | "No longer actively maintained" |
*
* @param {Builderlegacytooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlegacytooltip2 = /** @type {((inputs?: Builderlegacytooltip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlegacytooltip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ya no se mantiene activamente")
	if (locale === "zh") return /** @type {LocalizedString} */ ("不再积极维护")
	if (locale === "ja") return /** @type {LocalizedString} */ ("アクティブにメンテナンスされなくなりました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("더 이상 적극적으로 유지관리되지 않음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("不再積極維護")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wird nicht mehr aktiv gepflegt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("N'est plus activement maintenu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Більше не підтримується")
	return /** @type {LocalizedString} */ ("No longer actively maintained")
});
export { builderlegacytooltip2 as "builderLegacyTooltip" }