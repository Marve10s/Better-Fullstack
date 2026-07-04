/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runlabelexportkey3Inputs */

const en_runlabelexportkey3 = /** @type {(inputs: Runlabelexportkey3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`export a provider key`)
};

const es_runlabelexportkey3 = /** @type {(inputs: Runlabelexportkey3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`exportar una clave de proveedor`)
};

const zh_runlabelexportkey3 = /** @type {(inputs: Runlabelexportkey3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导出提供程序密钥`)
};

const ja_runlabelexportkey3 = /** @type {(inputs: Runlabelexportkey3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロバイダーキーをエクスポートする`)
};

const ko_runlabelexportkey3 = /** @type {(inputs: Runlabelexportkey3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공급자 키를 내보내기`)
};

const zh_hant1_runlabelexportkey3 = /** @type {(inputs: Runlabelexportkey3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`導出提供者金鑰`)
};

const de_runlabelexportkey3 = /** @type {(inputs: Runlabelexportkey3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`einen Anbieterschlüssel exportieren`)
};

const fr_runlabelexportkey3 = /** @type {(inputs: Runlabelexportkey3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`exporter une clé de fournisseur`)
};

/**
* | output |
* | --- |
* | "export a provider key" |
*
* @param {Runlabelexportkey3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runlabelexportkey3 = /** @type {((inputs?: Runlabelexportkey3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runlabelexportkey3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runlabelexportkey3(inputs)
	if (locale === "es") return es_runlabelexportkey3(inputs)
	if (locale === "zh") return zh_runlabelexportkey3(inputs)
	if (locale === "ja") return ja_runlabelexportkey3(inputs)
	if (locale === "ko") return ko_runlabelexportkey3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runlabelexportkey3(inputs)
	if (locale === "de") return de_runlabelexportkey3(inputs)
	return fr_runlabelexportkey3(inputs)
});
export { runlabelexportkey3 as "runLabelExportKey" }