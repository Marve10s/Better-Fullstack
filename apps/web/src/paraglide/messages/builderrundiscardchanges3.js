/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrundiscardchanges3Inputs */

const en_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Discard edits`)
};

const es_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Descartar cambios`)
};

const zh_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`放弃编辑`)
};

const ja_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`編集を破棄`)
};

const ko_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`편집 취소`)
};

const zh_hant1_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`捨棄編輯`)
};

const de_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Änderungen verwerfen`)
};

const fr_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Annuler les modifications`)
};

const uk_builderrundiscardchanges3 = /** @type {(inputs: Builderrundiscardchanges3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкинути зміни`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrundiscardchanges3(inputs)
	if (locale === "zh") return zh_builderrundiscardchanges3(inputs)
	if (locale === "ja") return ja_builderrundiscardchanges3(inputs)
	if (locale === "ko") return ko_builderrundiscardchanges3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrundiscardchanges3(inputs)
	if (locale === "de") return de_builderrundiscardchanges3(inputs)
	if (locale === "fr") return fr_builderrundiscardchanges3(inputs)
	if (locale === "uk") return uk_builderrundiscardchanges3(inputs)
	return en_builderrundiscardchanges3(inputs)
});
export { builderrundiscardchanges3 as "builderRunDiscardChanges" }