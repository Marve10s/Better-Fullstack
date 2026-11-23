/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Homestageallpresets3Inputs */



/**
* | output |
* | --- |
* | "See all {count} presets" |
*
* @param {Homestageallpresets3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestageallpresets3 = /** @type {((inputs: Homestageallpresets3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestageallpresets3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Ver los ${i?.count} presets`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`查看全部 ${i?.count} 个预设`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} 個のプリセットをすべて見る`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`프리셋 ${i?.count}개 모두 보기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`查看全部 ${i?.count} 個預設`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Alle ${i?.count} Presets ansehen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Voir les ${i?.count} presets`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Переглянути всі пресети (${i?.count})`)
	return /** @type {LocalizedString} */ (`See all ${i?.count} presets`)
});
export { homestageallpresets3 as "homeStageAllPresets" }