/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001cta2Inputs */

const en_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open Future Stack`)
};

const es_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir Future Stack`)
};

const zh_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开 Future Stack`)
};

const ja_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Future Stack を開く`)
};

const ko_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Future Stack 열기`)
};

const zh_hant1_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟 Future Stack`)
};

const de_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Future Stack öffnen`)
};

const fr_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir Future Stack`)
};

const uk_changelogrelease20261001cta2 = /** @type {(inputs: Changelogrelease20261001cta2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкрити Future Stack`)
};

/**
* | output |
* | --- |
* | "Open Future Stack" |
*
* @param {Changelogrelease20261001cta2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001cta2 = /** @type {((inputs?: Changelogrelease20261001cta2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001cta2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001cta2(inputs)
	if (locale === "zh") return zh_changelogrelease20261001cta2(inputs)
	if (locale === "ja") return ja_changelogrelease20261001cta2(inputs)
	if (locale === "ko") return ko_changelogrelease20261001cta2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001cta2(inputs)
	if (locale === "de") return de_changelogrelease20261001cta2(inputs)
	if (locale === "fr") return fr_changelogrelease20261001cta2(inputs)
	if (locale === "uk") return uk_changelogrelease20261001cta2(inputs)
	return en_changelogrelease20261001cta2(inputs)
});
export { changelogrelease20261001cta2 as "changelogRelease20261001Cta" }