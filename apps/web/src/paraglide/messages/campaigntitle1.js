/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigntitle1Inputs */

const en_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Don't trust a starter you can't run.`)
};

const es_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No confíes en un starter que no puedes ejecutar.`)
};

const zh_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不要相信一个你无法运行的模板。`)
};

const ja_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実行できないスターターを信用してはいけない。`)
};

const ko_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실행해 볼 수 없는 스타터는 믿지 마세요.`)
};

const zh_hant1_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不要相信一個你無法執行的範本。`)
};

const de_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trau keinem Starter, den du nicht ausführen kannst.`)
};

const fr_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ne faites pas confiance à un starter que vous ne pouvez pas exécuter.`)
};

const uk_campaigntitle1 = /** @type {(inputs: Campaigntitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не довіряйте стартеру, який не можете запустити.`)
};

/**
* | output |
* | --- |
* | "Don't trust a starter you can't run." |
*
* @param {Campaigntitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigntitle1 = /** @type {((inputs?: Campaigntitle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigntitle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaigntitle1(inputs)
	if (locale === "zh") return zh_campaigntitle1(inputs)
	if (locale === "ja") return ja_campaigntitle1(inputs)
	if (locale === "ko") return ko_campaigntitle1(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigntitle1(inputs)
	if (locale === "de") return de_campaigntitle1(inputs)
	if (locale === "fr") return fr_campaigntitle1(inputs)
	if (locale === "uk") return uk_campaigntitle1(inputs)
	return en_campaigntitle1(inputs)
});
export { campaigntitle1 as "campaignTitle" }