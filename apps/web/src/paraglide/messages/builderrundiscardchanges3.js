/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrundiscardchanges3Inputs */



/**
* | output |
* | --- |
* | "Discard edits" |
*
* @param {Builderrundiscardchanges3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrundiscardchanges3 = /** @type {((inputs?: Builderrundiscardchanges3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrundiscardchanges3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Descartar cambios")
	if (locale === "zh") return /** @type {LocalizedString} */ ("放弃编辑")
	if (locale === "ja") return /** @type {LocalizedString} */ ("編集を破棄")
	if (locale === "ko") return /** @type {LocalizedString} */ ("편집 취소")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("捨棄編輯")
	if (locale === "de") return /** @type {LocalizedString} */ ("Änderungen verwerfen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Annuler les modifications")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкинути зміни")
	return /** @type {LocalizedString} */ ("Discard edits")
});
export { builderrundiscardchanges3 as "builderRunDiscardChanges" }