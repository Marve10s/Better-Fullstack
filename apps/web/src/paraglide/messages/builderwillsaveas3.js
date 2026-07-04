/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Builderwillsaveas3Inputs */

const en_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Will be saved as: ${i?.name}`)
};

const es_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Se guardará como: ${i?.name}`)
};

const zh_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`将保存为：${i?.name}`)
};

const ja_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} として保存されます。`)
};

const ko_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`다음 이름으로 저장됩니다: ${i?.name}`)
};

const zh_hant1_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`將儲存為：${i?.name}`)
};

const de_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Wird gespeichert als: ${i?.name}`)
};

const fr_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Sera enregistré sous : ${i?.name}`)
};

const uk_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Буде збережено як: ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Will be saved as: {name}" |
*
* @param {Builderwillsaveas3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderwillsaveas3 = /** @type {((inputs: Builderwillsaveas3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderwillsaveas3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderwillsaveas3(inputs)
	if (locale === "es") return es_builderwillsaveas3(inputs)
	if (locale === "zh") return zh_builderwillsaveas3(inputs)
	if (locale === "ja") return ja_builderwillsaveas3(inputs)
	if (locale === "ko") return ko_builderwillsaveas3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderwillsaveas3(inputs)
	if (locale === "de") return de_builderwillsaveas3(inputs)
	if (locale === "fr") return fr_builderwillsaveas3(inputs)
	return uk_builderwillsaveas3(inputs)
});
export { builderwillsaveas3 as "builderWillSaveAs" }