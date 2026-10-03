/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlightframework3Inputs */

const en_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick SolidStart or TanStack Start`)
};

const es_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elige SolidStart o TanStack Start`)
};

const zh_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择 SolidStart 或 TanStack Start`)
};

const ja_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart か TanStack Start を選択`)
};

const ko_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart 또는 TanStack Start 선택`)
};

const zh_hant1_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選擇 SolidStart 或 TanStack Start`)
};

const de_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SolidStart oder TanStack Start wählen`)
};

const fr_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choisissez SolidStart ou TanStack Start`)
};

const uk_changelogrelease20261001highlightframework3 = /** @type {(inputs: Changelogrelease20261001highlightframework3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Оберіть SolidStart або TanStack Start`)
};

/**
* | output |
* | --- |
* | "Pick SolidStart or TanStack Start" |
*
* @param {Changelogrelease20261001highlightframework3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlightframework3 = /** @type {((inputs?: Changelogrelease20261001highlightframework3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlightframework3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001highlightframework3(inputs)
	if (locale === "zh") return zh_changelogrelease20261001highlightframework3(inputs)
	if (locale === "ja") return ja_changelogrelease20261001highlightframework3(inputs)
	if (locale === "ko") return ko_changelogrelease20261001highlightframework3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001highlightframework3(inputs)
	if (locale === "de") return de_changelogrelease20261001highlightframework3(inputs)
	if (locale === "fr") return fr_changelogrelease20261001highlightframework3(inputs)
	if (locale === "uk") return uk_changelogrelease20261001highlightframework3(inputs)
	return en_changelogrelease20261001highlightframework3(inputs)
});
export { changelogrelease20261001highlightframework3 as "changelogRelease20261001HighlightFramework" }