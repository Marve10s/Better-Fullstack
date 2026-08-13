/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runctaleaderboard2Inputs */

const en_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View the leaderboard`)
};

const es_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ver la tabla de clasificación`)
};

const zh_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看排行榜`)
};

const ja_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リーダーボードを見る`)
};

const ko_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`순위표를 확인하세요`)
};

const zh_hant1_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`看排行榜`)
};

const de_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rangliste ansehen`)
};

const fr_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Consultez le classement`)
};

const uk_runctaleaderboard2 = /** @type {(inputs: Runctaleaderboard2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Переглянути leaderboard`)
};

/**
* | output |
* | --- |
* | "View the leaderboard" |
*
* @param {Runctaleaderboard2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runctaleaderboard2 = /** @type {((inputs?: Runctaleaderboard2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runctaleaderboard2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runctaleaderboard2(inputs)
	if (locale === "zh") return zh_runctaleaderboard2(inputs)
	if (locale === "ja") return ja_runctaleaderboard2(inputs)
	if (locale === "ko") return ko_runctaleaderboard2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runctaleaderboard2(inputs)
	if (locale === "de") return de_runctaleaderboard2(inputs)
	if (locale === "fr") return fr_runctaleaderboard2(inputs)
	if (locale === "uk") return uk_runctaleaderboard2(inputs)
	return en_runctaleaderboard2(inputs)
});
export { runctaleaderboard2 as "runCtaLeaderboard" }