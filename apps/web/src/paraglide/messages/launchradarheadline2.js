/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Launchradarheadline2Inputs */



/**
* | output |
* | --- |
* | "{count} new stack choices, now in the builder." |
*
* @param {Launchradarheadline2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarheadline2 = /** @type {((inputs: Launchradarheadline2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarheadline2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} nuevas opciones de stack, ya en el builder.`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个全新的技术栈选项，现已加入构建器。`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} 件の新しいスタック選択肢がビルダーに登場。`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`새로운 스택 선택지 ${i?.count}개가 빌더에 추가되었습니다.`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個全新的技術棧選項，現已加入建構器。`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} neue Stack-Optionen, jetzt im Builder.`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} nouveaux choix de stack, désormais dans le builder.`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} нових варіантів стека - вже в білдері.`)
	return /** @type {LocalizedString} */ (`${i?.count} new stack choices, now in the builder.`)
});
export { launchradarheadline2 as "launchRadarHeadline" }