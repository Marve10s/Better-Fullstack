/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerdescription2Inputs */

const en_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const es_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elige las aplicaciones que necesita tu proyecto. Cada aplicación puede usar su propio lenguaje y framework; los ajustes compartidos del proyecto se configuran al final.`)
};

const zh_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择项目需要的应用。每个应用都可以使用自己的语言和框架，最后再配置项目的共用设置。`)
};

const ja_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクトに必要なアプリケーションを選択してください。各アプリケーションで異なる言語とフレームワークを使用できます。共通のプロジェクト設定は最後に行います。`)
};

const ko_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트에 필요한 애플리케이션을 선택하세요. 각 애플리케이션은 고유한 언어와 프레임워크를 사용할 수 있으며, 공통 프로젝트 설정은 마지막에 진행합니다.`)
};

const zh_hant1_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選擇專案需要的應用程式。每個應用程式都可以使用自己的語言和框架，最後再設定專案的共用選項。`)
};

const de_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wähle die Anwendungen aus, die dein Projekt benötigt. Jede Anwendung kann ihre eigene Sprache und ihr eigenes Framework verwenden. Gemeinsame Projekteinstellungen folgen am Ende.`)
};

const fr_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choisissez les applications nécessaires à votre projet. Chaque application peut utiliser son propre langage et framework. Les paramètres communs du projet se configurent à la fin.`)
};

const uk_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Виберіть потрібні для проєкту застосунки. Кожен застосунок може використовувати власну мову та фреймворк, а спільні параметри проєкту налаштовуються наприкінці.`)
};

/**
* | output |
* | --- |
* | "Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end." |
*
* @param {Buildercomposerdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerdescription2 = /** @type {((inputs?: Buildercomposerdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerdescription2(inputs)
	if (locale === "zh") return zh_buildercomposerdescription2(inputs)
	if (locale === "ja") return ja_buildercomposerdescription2(inputs)
	if (locale === "ko") return ko_buildercomposerdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerdescription2(inputs)
	if (locale === "de") return de_buildercomposerdescription2(inputs)
	if (locale === "fr") return fr_buildercomposerdescription2(inputs)
	if (locale === "uk") return uk_buildercomposerdescription2(inputs)
	return en_buildercomposerdescription2(inputs)
});
export { buildercomposerdescription2 as "builderComposerDescription" }