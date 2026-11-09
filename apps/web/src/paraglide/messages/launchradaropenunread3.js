/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Launchradaropenunread3Inputs */



/**
* | output |
* | --- |
* | "Explore {count} new stack choices" |
*
* @param {Launchradaropenunread3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradaropenunread3 = /** @type {((inputs: Launchradaropenunread3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradaropenunread3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Explorar ${i?.count} nuevas opciones de stack`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`浏览 ${i?.count} 个新的技术栈选项`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} 件の新しいスタック選択肢を見る`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`새로운 스택 선택지 ${i?.count}개 살펴보기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`瀏覽 ${i?.count} 個新的技術棧選項`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} neue Stack-Optionen entdecken`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Explorer ${i?.count} nouveaux choix de stack`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Переглянути ${i?.count} нових варіантів стека`)
	return /** @type {LocalizedString} */ (`Explore ${i?.count} new stack choices`)
});
export { launchradaropenunread3 as "launchRadarOpenUnread" }