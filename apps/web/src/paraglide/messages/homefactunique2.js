/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homefactunique2Inputs */

const en_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compatibility rules keep generated stacks internally consistent`)
};

const es_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las reglas de compatibilidad mantienen coherencia interna en los stacks generados`)
};

const zh_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`兼容性规则让生成的 stack 保持内部一致`)
};

const ja_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`互換性ルールにより、生成されるスタックの内部整合性を維持`)
};

const ko_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`호환성 규칙이 생성된 스택의 내부 일관성을 유지합니다`)
};

const zh_hant1_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`相容性規則讓生成的 stack 保持內部一致`)
};

const de_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kompatibilitätsregeln halten generierte Stacks intern konsistent`)
};

const fr_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les règles de compatibilité assurent la cohérence interne des piles générées`)
};

const uk_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Правила сумісності підтримують внутрішню узгодженість згенерованих стеків`)
};

/**
* | output |
* | --- |
* | "Compatibility rules keep generated stacks internally consistent" |
*
* @param {Homefactunique2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homefactunique2 = /** @type {((inputs?: Homefactunique2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactunique2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactunique2(inputs)
	if (locale === "es") return es_homefactunique2(inputs)
	if (locale === "zh") return zh_homefactunique2(inputs)
	if (locale === "ja") return ja_homefactunique2(inputs)
	if (locale === "ko") return ko_homefactunique2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefactunique2(inputs)
	if (locale === "de") return de_homefactunique2(inputs)
	if (locale === "fr") return fr_homefactunique2(inputs)
	return uk_homefactunique2(inputs)
});
export { homefactunique2 as "homeFactUnique" }