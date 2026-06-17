/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerchangelog1Inputs */

const en_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changelog`)
};

const es_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changelog`)
};

const zh_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新日志`)
};

const ja_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`変更履歴`)
};

const ko_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`변경 내역`)
};

const zh_hant1_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新日誌`)
};

const de_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Änderungsprotokoll`)
};

const fr_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Journal des modifications`)
};

/**
* | output |
* | --- |
* | "Changelog" |
*
* @param {Footerchangelog1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const footerchangelog1 = /** @type {((inputs?: Footerchangelog1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerchangelog1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footerchangelog1(inputs)
	if (locale === "es") return es_footerchangelog1(inputs)
	if (locale === "zh") return zh_footerchangelog1(inputs)
	if (locale === "ja") return ja_footerchangelog1(inputs)
	if (locale === "ko") return ko_footerchangelog1(inputs)
	if (locale === "zh-Hant") return zh_hant1_footerchangelog1(inputs)
	if (locale === "de") return de_footerchangelog1(inputs)
	return fr_footerchangelog1(inputs)
});
export { footerchangelog1 as "footerChangelog" }