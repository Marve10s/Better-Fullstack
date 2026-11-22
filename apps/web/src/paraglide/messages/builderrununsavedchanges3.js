/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderrununsavedchanges3Inputs */



/**
* | output |
* | --- |
* | "{count} unsaved" |
*
* @param {Builderrununsavedchanges3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrununsavedchanges3 = /** @type {((inputs: Builderrununsavedchanges3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrununsavedchanges3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} sin guardar`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 项未保存`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`未保存 ${i?.count} 件`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`저장 안 됨 ${i?.count}개`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 項未儲存`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} ungespeichert`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} non enregistré(s)`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Не збережено: ${i?.count}`)
	return /** @type {LocalizedString} */ (`${i?.count} unsaved`)
});
export { builderrununsavedchanges3 as "builderRunUnsavedChanges" }