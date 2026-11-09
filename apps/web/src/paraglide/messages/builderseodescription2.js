/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderseodescription2Inputs */



/**
* | output |
* | --- |
* | "Build and share custom fullstack combinations with the Better Fullstack visual stack builder." |
*
* @param {Builderseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderseodescription2 = /** @type {((inputs?: Builderseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderseodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Crea y comparte combinaciones fullstack personalizadas con el constructor visual de Better Fullstack.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用 Better Fullstack 可视化 stack 构建器创建并分享自定义全栈组合。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Better Fullstack ビジュアル スタック ビルダーを使用してカスタム フルスタックの組み合わせを構築し、共有します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Better Fullstack 비주얼 스택 빌더를 사용하여 사용자 정의 풀 스택 조합을 구축하고 공유하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用 Better Fullstack 視覺化 stack 建構器建立並分享自訂全端組合。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erstellen und teilen Sie benutzerdefinierte Fullstack-Kombinationen mit dem visuellen Stack Builder Better Fullstack.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Créez et partagez des combinaisons fullstack personnalisées avec le générateur de pile visuelle Better Fullstack.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Збирайте й поширюйте власні фулстек-комбінації у візуальному конструкторі Better Fullstack.")
	return /** @type {LocalizedString} */ ("Build and share custom fullstack combinations with the Better Fullstack visual stack builder.")
});
export { builderseodescription2 as "builderSeoDescription" }