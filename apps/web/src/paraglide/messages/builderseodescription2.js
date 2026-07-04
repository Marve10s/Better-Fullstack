/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderseodescription2Inputs */

const en_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build and share custom fullstack combinations with the Better Fullstack visual stack builder.`)
};

const es_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crea y comparte combinaciones fullstack personalizadas con el constructor visual de Better Fullstack.`)
};

const zh_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 Better Fullstack 可视化 stack 构建器创建并分享自定义全栈组合。`)
};

const ja_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack ビジュアル スタック ビルダーを使用してカスタム フルスタックの組み合わせを構築し、共有します。`)
};

const ko_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack 비주얼 스택 빌더를 사용하여 사용자 정의 풀 스택 조합을 구축하고 공유하세요.`)
};

const zh_hant1_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 Better Fullstack 視覺化 stack 建構器建立並分享自訂全端組合。`)
};

const de_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erstellen und teilen Sie benutzerdefinierte Fullstack-Kombinationen mit dem visuellen Stack Builder Better Fullstack.`)
};

const fr_builderseodescription2 = /** @type {(inputs: Builderseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Créez et partagez des combinaisons fullstack personnalisées avec le générateur de pile visuelle Better Fullstack.`)
};

/**
* | output |
* | --- |
* | "Build and share custom fullstack combinations with the Better Fullstack visual stack builder." |
*
* @param {Builderseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderseodescription2 = /** @type {((inputs?: Builderseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderseodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderseodescription2(inputs)
	if (locale === "es") return es_builderseodescription2(inputs)
	if (locale === "zh") return zh_builderseodescription2(inputs)
	if (locale === "ja") return ja_builderseodescription2(inputs)
	if (locale === "ko") return ko_builderseodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderseodescription2(inputs)
	if (locale === "de") return de_builderseodescription2(inputs)
	return fr_builderseodescription2(inputs)
});
export { builderseodescription2 as "builderSeoDescription" }