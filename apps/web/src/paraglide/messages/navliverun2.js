/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navliverun2Inputs */

const en_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live Run`)
};

const es_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecución en vivo`)
};

const zh_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在线运行`)
};

const ja_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ライブ実行`)
};

const ko_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`라이브 실행`)
};

const zh_hant1_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`線上執行`)
};

const de_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live-Run`)
};

const fr_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécution en direct`)
};

const uk_navliverun2 = /** @type {(inputs: Navliverun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Живий запуск`)
};

/**
* | output |
* | --- |
* | "Live Run" |
*
* @param {Navliverun2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navliverun2 = /** @type {((inputs?: Navliverun2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navliverun2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navliverun2(inputs)
	if (locale === "es") return es_navliverun2(inputs)
	if (locale === "zh") return zh_navliverun2(inputs)
	if (locale === "ja") return ja_navliverun2(inputs)
	if (locale === "ko") return ko_navliverun2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navliverun2(inputs)
	if (locale === "de") return de_navliverun2(inputs)
	if (locale === "fr") return fr_navliverun2(inputs)
	return uk_navliverun2(inputs)
});
export { navliverun2 as "navLiveRun" }