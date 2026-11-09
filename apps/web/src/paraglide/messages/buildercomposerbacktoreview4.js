/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerbacktoreview4Inputs */



/**
* | output |
* | --- |
* | "Back to review" |
*
* @param {Buildercomposerbacktoreview4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerbacktoreview4 = /** @type {((inputs?: Buildercomposerbacktoreview4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerbacktoreview4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Volver a la revisión")
	if (locale === "zh") return /** @type {LocalizedString} */ ("返回审核")
	if (locale === "ja") return /** @type {LocalizedString} */ ("確認に戻る")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검토로 돌아가기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("返回檢閱")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zurück zur Übersicht")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Retour à la révision")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Назад до огляду")
	return /** @type {LocalizedString} */ ("Back to review")
});
export { buildercomposerbacktoreview4 as "builderComposerBackToReview" }