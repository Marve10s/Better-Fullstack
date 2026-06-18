/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogopen1Inputs */

const en_changelogopen1 = /** @type {(inputs: Changelogopen1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open changelog`)
};

const es_changelogopen1 = /** @type {(inputs: Changelogopen1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir changelog`)
};

const zh_changelogopen1 = /** @type {(inputs: Changelogopen1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开更新日志`)
};

const ja_changelogopen1 = /** @type {(inputs: Changelogopen1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`変更ログを開く`)
};

const ko_changelogopen1 = /** @type {(inputs: Changelogopen1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`변경 로그 열기`)
};

const zh_hant1_changelogopen1 = /** @type {(inputs: Changelogopen1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打開更新日誌`)
};

const de_changelogopen1 = /** @type {(inputs: Changelogopen1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Änderungsprotokoll öffnen`)
};

const fr_changelogopen1 = /** @type {(inputs: Changelogopen1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir le journal des modifications`)
};

/**
* | output |
* | --- |
* | "Open changelog" |
*
* @param {Changelogopen1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogopen1 = /** @type {((inputs?: Changelogopen1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogopen1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogopen1(inputs)
	if (locale === "es") return es_changelogopen1(inputs)
	if (locale === "zh") return zh_changelogopen1(inputs)
	if (locale === "ja") return ja_changelogopen1(inputs)
	if (locale === "ko") return ko_changelogopen1(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogopen1(inputs)
	if (locale === "de") return de_changelogopen1(inputs)
	return fr_changelogopen1(inputs)
});
export { changelogopen1 as "changelogOpen" }