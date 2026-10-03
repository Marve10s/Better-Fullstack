/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001title2Inputs */

const en_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Future Stack preset`)
};

const es_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nueva plantilla: Future Stack`)
};

const zh_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全新预设：Future Stack`)
};

const ja_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新しいプリセット: Future Stack`)
};

const ko_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`새 사전 설정: Future Stack`)
};

const zh_hant1_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全新預設：Future Stack`)
};

const de_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neue Voreinstellung: Future Stack`)
};

const fr_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nouveau préréglage : Future Stack`)
};

const uk_changelogrelease20261001title2 = /** @type {(inputs: Changelogrelease20261001title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Новий пресет: Future Stack`)
};

/**
* | output |
* | --- |
* | "Future Stack preset" |
*
* @param {Changelogrelease20261001title2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001title2 = /** @type {((inputs?: Changelogrelease20261001title2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001title2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001title2(inputs)
	if (locale === "zh") return zh_changelogrelease20261001title2(inputs)
	if (locale === "ja") return ja_changelogrelease20261001title2(inputs)
	if (locale === "ko") return ko_changelogrelease20261001title2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001title2(inputs)
	if (locale === "de") return de_changelogrelease20261001title2(inputs)
	if (locale === "fr") return fr_changelogrelease20261001title2(inputs)
	if (locale === "uk") return uk_changelogrelease20261001title2(inputs)
	return en_changelogrelease20261001title2(inputs)
});
export { changelogrelease20261001title2 as "changelogRelease20261001Title" }