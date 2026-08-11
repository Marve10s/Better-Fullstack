/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignlocalonly2Inputs */

const en_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs locally in your browser`)
};

const es_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se ejecuta localmente en tu navegador`)
};

const zh_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在你的浏览器中本地运行`)
};

const ja_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブラウザ内でローカルに実行`)
};

const ko_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`브라우저에서 로컬로 실행`)
};

const zh_hant1_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在你的瀏覽器中本機執行`)
};

const de_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Läuft lokal in deinem Browser`)
};

const fr_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`S'exécute localement dans votre navigateur`)
};

const uk_campaignlocalonly2 = /** @type {(inputs: Campaignlocalonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Працює локально у вашому браузері`)
};

/**
* | output |
* | --- |
* | "Runs locally in your browser" |
*
* @param {Campaignlocalonly2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignlocalonly2 = /** @type {((inputs?: Campaignlocalonly2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignlocalonly2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignlocalonly2(inputs)
	if (locale === "zh") return zh_campaignlocalonly2(inputs)
	if (locale === "ja") return ja_campaignlocalonly2(inputs)
	if (locale === "ko") return ko_campaignlocalonly2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignlocalonly2(inputs)
	if (locale === "de") return de_campaignlocalonly2(inputs)
	if (locale === "fr") return fr_campaignlocalonly2(inputs)
	if (locale === "uk") return uk_campaignlocalonly2(inputs)
	return en_campaignlocalonly2(inputs)
});
export { campaignlocalonly2 as "campaignLocalOnly" }