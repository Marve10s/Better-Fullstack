/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Shareqralt2Inputs */

const en_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`QR code for stack configuration`)
};

const es_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Código QR para la configuración del stack`)
};

const zh_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 配置二维码`)
};

const ja_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタック構成用の QR コード`)
};

const ko_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택 구성을 위한 QR 코드`)
};

const zh_hant1_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 設定的 QR code`)
};

const de_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`QR-Code zur Stack-Konfiguration`)
};

const fr_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Code QR pour la configuration de la pile`)
};

const uk_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`QR-код для конфігурації стеку`)
};

/**
* | output |
* | --- |
* | "QR code for stack configuration" |
*
* @param {Shareqralt2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const shareqralt2 = /** @type {((inputs?: Shareqralt2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Shareqralt2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_shareqralt2(inputs)
	if (locale === "zh") return zh_shareqralt2(inputs)
	if (locale === "ja") return ja_shareqralt2(inputs)
	if (locale === "ko") return ko_shareqralt2(inputs)
	if (locale === "zh-Hant") return zh_hant1_shareqralt2(inputs)
	if (locale === "de") return de_shareqralt2(inputs)
	if (locale === "fr") return fr_shareqralt2(inputs)
	if (locale === "uk") return uk_shareqralt2(inputs)
	return en_shareqralt2(inputs)
});
export { shareqralt2 as "shareQrAlt" }