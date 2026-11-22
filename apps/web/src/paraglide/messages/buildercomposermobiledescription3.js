/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposermobiledescription3Inputs */



/**
* | output |
* | --- |
* | "React Native, Kotlin, Swift, or Flutter. Choose your mobile framework in the next step." |
*
* @param {Buildercomposermobiledescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposermobiledescription3 = /** @type {((inputs?: Buildercomposermobiledescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposermobiledescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("React Native, Kotlin, Swift o Flutter. Elige tu framework móvil en el siguiente paso.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("React Native、Kotlin、Swift 或 Flutter。请在下一步选择移动端框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("React Native、Kotlin、Swift、または Flutter。次のステップでモバイルフレームワークを選択します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("React Native, Kotlin, Swift 또는 Flutter를 사용합니다. 다음 단계에서 모바일 프레임워크를 선택하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("React Native、Kotlin、Swift 或 Flutter。請在下一步選擇行動裝置框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("React Native, Kotlin, Swift oder Flutter. Wähle dein mobiles Framework im nächsten Schritt.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("React Native, Kotlin, Swift ou Flutter. Choisissez votre framework mobile à l’étape suivante.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("React Native, Kotlin, Swift або Flutter. Виберіть мобільний фреймворк на наступному кроці.")
	return /** @type {LocalizedString} */ ("React Native, Kotlin, Swift, or Flutter. Choose your mobile framework in the next step.")
});
export { buildercomposermobiledescription3 as "builderComposerMobileDescription" }