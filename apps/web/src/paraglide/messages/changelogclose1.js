/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogclose1Inputs */

const en_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close changelog`)
};

const es_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar changelog`)
};

const zh_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭更新日志`)
};

const ja_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`変更ログを閉じる`)
};

const ko_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`변경 로그 닫기`)
};

const zh_hant1_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`關閉更新日誌`)
};

const de_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Änderungsprotokoll schließen`)
};

const fr_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fermer le journal des modifications`)
};

/**
* | output |
* | --- |
* | "Close changelog" |
*
* @param {Changelogclose1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogclose1 = /** @type {((inputs?: Changelogclose1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogclose1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogclose1(inputs)
	if (locale === "es") return es_changelogclose1(inputs)
	if (locale === "zh") return zh_changelogclose1(inputs)
	if (locale === "ja") return ja_changelogclose1(inputs)
	if (locale === "ko") return ko_changelogclose1(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogclose1(inputs)
	if (locale === "de") return de_changelogclose1(inputs)
	return fr_changelogclose1(inputs)
});
export { changelogclose1 as "changelogClose" }