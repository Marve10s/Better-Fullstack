/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Launchradaropenunread3Inputs */

const en_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Explore ${i?.count} new stack choices`)
};

const es_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Explorar ${i?.count} nuevas opciones de stack`)
};

const zh_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`浏览 ${i?.count} 个新的技术栈选项`)
};

const ja_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 件の新しいスタック選択肢を見る`)
};

const ko_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`새로운 스택 선택지 ${i?.count}개 살펴보기`)
};

const zh_hant1_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`瀏覽 ${i?.count} 個新的技術棧選項`)
};

const de_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} neue Stack-Optionen entdecken`)
};

const fr_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Explorer ${i?.count} nouveaux choix de stack`)
};

const uk_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Переглянути ${i?.count} нових варіантів стека`)
};

/**
* | output |
* | --- |
* | "Explore {count} new stack choices" |
*
* @param {Launchradaropenunread3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradaropenunread3 = /** @type {((inputs: Launchradaropenunread3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradaropenunread3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_launchradaropenunread3(inputs)
	if (locale === "zh") return zh_launchradaropenunread3(inputs)
	if (locale === "ja") return ja_launchradaropenunread3(inputs)
	if (locale === "ko") return ko_launchradaropenunread3(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradaropenunread3(inputs)
	if (locale === "de") return de_launchradaropenunread3(inputs)
	if (locale === "fr") return fr_launchradaropenunread3(inputs)
	if (locale === "uk") return uk_launchradaropenunread3(inputs)
	return en_launchradaropenunread3(inputs)
});
export { launchradaropenunread3 as "launchRadarOpenUnread" }