/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposermobiledescription3Inputs */

const en_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native, Kotlin, Swift, or Flutter. Choose your mobile framework in the next step.`)
};

const es_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native, Kotlin, Swift o Flutter. Elige tu framework móvil en el siguiente paso.`)
};

const zh_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native、Kotlin、Swift 或 Flutter。请在下一步选择移动端框架。`)
};

const ja_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native、Kotlin、Swift、または Flutter。次のステップでモバイルフレームワークを選択します。`)
};

const ko_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native, Kotlin, Swift 또는 Flutter를 사용합니다. 다음 단계에서 모바일 프레임워크를 선택하세요.`)
};

const zh_hant1_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native、Kotlin、Swift 或 Flutter。請在下一步選擇行動裝置框架。`)
};

const de_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native, Kotlin, Swift oder Flutter. Wähle dein mobiles Framework im nächsten Schritt.`)
};

const fr_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native, Kotlin, Swift ou Flutter. Choisissez votre framework mobile à l’étape suivante.`)
};

const uk_buildercomposermobiledescription3 = /** @type {(inputs: Buildercomposermobiledescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`React Native, Kotlin, Swift або Flutter. Виберіть мобільний фреймворк на наступному кроці.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposermobiledescription3(inputs)
	if (locale === "zh") return zh_buildercomposermobiledescription3(inputs)
	if (locale === "ja") return ja_buildercomposermobiledescription3(inputs)
	if (locale === "ko") return ko_buildercomposermobiledescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposermobiledescription3(inputs)
	if (locale === "de") return de_buildercomposermobiledescription3(inputs)
	if (locale === "fr") return fr_buildercomposermobiledescription3(inputs)
	if (locale === "uk") return uk_buildercomposermobiledescription3(inputs)
	return en_buildercomposermobiledescription3(inputs)
});
export { buildercomposermobiledescription3 as "builderComposerMobileDescription" }