/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogaria1Inputs */

const en_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changelog`)
};

const es_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changelog`)
};

const zh_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新日志`)
};

const ja_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`変更履歴`)
};

const ko_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`변경 내역`)
};

const zh_hant1_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新日誌`)
};

const de_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Änderungsprotokoll`)
};

const fr_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Journal des modifications`)
};

/**
* | output |
* | --- |
* | "Changelog" |
*
* @param {Changelogaria1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogaria1 = /** @type {((inputs?: Changelogaria1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogaria1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogaria1(inputs)
	if (locale === "es") return es_changelogaria1(inputs)
	if (locale === "zh") return zh_changelogaria1(inputs)
	if (locale === "ja") return ja_changelogaria1(inputs)
	if (locale === "ko") return ko_changelogaria1(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogaria1(inputs)
	if (locale === "de") return de_changelogaria1(inputs)
	return fr_changelogaria1(inputs)
});
export { changelogaria1 as "changelogAria" }