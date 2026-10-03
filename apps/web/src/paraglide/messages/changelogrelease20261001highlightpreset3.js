/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlightpreset3Inputs */

const en_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect, and TanStack in one preset`)
};

const es_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect y TanStack en una sola plantilla`)
};

const zh_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid、Effect 和 TanStack 集于一个预设`)
};

const ja_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid、Effect、TanStack を1つのプリセットに`)
};

const ko_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect, TanStack을 하나의 사전 설정으로`)
};

const zh_hant1_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid、Effect 與 TanStack 集結於一個預設`)
};

const de_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect und TanStack in einer Voreinstellung`)
};

const fr_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect et TanStack dans un seul préréglage`)
};

const uk_changelogrelease20261001highlightpreset3 = /** @type {(inputs: Changelogrelease20261001highlightpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect і TanStack в одному пресеті`)
};

/**
* | output |
* | --- |
* | "Solid, Effect, and TanStack in one preset" |
*
* @param {Changelogrelease20261001highlightpreset3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlightpreset3 = /** @type {((inputs?: Changelogrelease20261001highlightpreset3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlightpreset3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001highlightpreset3(inputs)
	if (locale === "zh") return zh_changelogrelease20261001highlightpreset3(inputs)
	if (locale === "ja") return ja_changelogrelease20261001highlightpreset3(inputs)
	if (locale === "ko") return ko_changelogrelease20261001highlightpreset3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001highlightpreset3(inputs)
	if (locale === "de") return de_changelogrelease20261001highlightpreset3(inputs)
	if (locale === "fr") return fr_changelogrelease20261001highlightpreset3(inputs)
	if (locale === "uk") return uk_changelogrelease20261001highlightpreset3(inputs)
	return en_changelogrelease20261001highlightpreset3(inputs)
});
export { changelogrelease20261001highlightpreset3 as "changelogRelease20261001HighlightPreset" }