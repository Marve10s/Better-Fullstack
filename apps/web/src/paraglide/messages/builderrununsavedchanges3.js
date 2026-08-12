/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderrununsavedchanges3Inputs */

const en_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} unsaved`)
};

const es_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} sin guardar`)
};

const zh_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 项未保存`)
};

const ja_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`未保存 ${i?.count} 件`)
};

const ko_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`저장 안 됨 ${i?.count}개`)
};

const zh_hant1_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 項未儲存`)
};

const de_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} ungespeichert`)
};

const fr_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} non enregistré(s)`)
};

const uk_builderrununsavedchanges3 = /** @type {(inputs: Builderrununsavedchanges3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Не збережено: ${i?.count}`)
};

/**
* | output |
* | --- |
* | "{count} unsaved" |
*
* @param {Builderrununsavedchanges3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrununsavedchanges3 = /** @type {((inputs: Builderrununsavedchanges3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrununsavedchanges3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrununsavedchanges3(inputs)
	if (locale === "zh") return zh_builderrununsavedchanges3(inputs)
	if (locale === "ja") return ja_builderrununsavedchanges3(inputs)
	if (locale === "ko") return ko_builderrununsavedchanges3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrununsavedchanges3(inputs)
	if (locale === "de") return de_builderrununsavedchanges3(inputs)
	if (locale === "fr") return fr_builderrununsavedchanges3(inputs)
	if (locale === "uk") return uk_builderrununsavedchanges3(inputs)
	return en_builderrununsavedchanges3(inputs)
});
export { builderrununsavedchanges3 as "builderRunUnsavedChanges" }