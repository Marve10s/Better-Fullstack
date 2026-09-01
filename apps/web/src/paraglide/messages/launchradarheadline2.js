/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Launchradarheadline2Inputs */

const en_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} new stack choices, now in the builder.`)
};

const es_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} nuevas opciones de stack, ya en el builder.`)
};

const zh_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个全新的技术栈选项，现已加入构建器。`)
};

const ja_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 件の新しいスタック選択肢がビルダーに登場。`)
};

const ko_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`새로운 스택 선택지 ${i?.count}개가 빌더에 추가되었습니다.`)
};

const zh_hant1_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個全新的技術棧選項，現已加入建構器。`)
};

const de_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} neue Stack-Optionen, jetzt im Builder.`)
};

const fr_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} nouveaux choix de stack, désormais dans le builder.`)
};

const uk_launchradarheadline2 = /** @type {(inputs: Launchradarheadline2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} нових варіантів стека - вже в білдері.`)
};

/**
* | output |
* | --- |
* | "{count} new stack choices, now in the builder." |
*
* @param {Launchradarheadline2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarheadline2 = /** @type {((inputs: Launchradarheadline2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarheadline2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_launchradarheadline2(inputs)
	if (locale === "zh") return zh_launchradarheadline2(inputs)
	if (locale === "ja") return ja_launchradarheadline2(inputs)
	if (locale === "ko") return ko_launchradarheadline2(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarheadline2(inputs)
	if (locale === "de") return de_launchradarheadline2(inputs)
	if (locale === "fr") return fr_launchradarheadline2(inputs)
	if (locale === "uk") return uk_launchradarheadline2(inputs)
	return en_launchradarheadline2(inputs)
});
export { launchradarheadline2 as "launchRadarHeadline" }