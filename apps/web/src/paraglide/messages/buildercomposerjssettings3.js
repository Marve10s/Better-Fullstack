/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerjssettings3Inputs */

const en_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const es_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los ajustes del gestor de paquetes de JavaScript y del espacio de trabajo se aplican a tus aplicaciones de TypeScript y React Native. Las demás aplicaciones usan sus herramientas nativas.`)
};

const zh_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript 包管理器和工作区设置适用于 TypeScript 和 React Native 应用。其他应用使用各自的原生工具链。`)
};

const ja_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript パッケージマネージャーとワークスペースの設定は、TypeScript と React Native のアプリケーションに適用されます。他のアプリケーションは各言語の開発ツールを使用します。`)
};

const ko_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript 패키지 관리자와 워크스페이스 설정은 TypeScript 및 React Native 애플리케이션에 적용됩니다. 다른 애플리케이션은 해당 언어의 개발 도구를 사용합니다.`)
};

const zh_hant1_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript 套件管理器和工作區設定適用於 TypeScript 和 React Native 應用程式。其他應用程式使用各自的原生工具鏈。`)
};

const de_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die Einstellungen für den JavaScript-Paketmanager und den Workspace gelten für deine TypeScript- und React-Native-Anwendungen. Andere Anwendungen verwenden ihre nativen Entwicklungswerkzeuge.`)
};

const fr_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les paramètres du gestionnaire de paquets JavaScript et de l’espace de travail s’appliquent à vos applications TypeScript et React Native. Les autres applications utilisent leurs outils natifs.`)
};

const uk_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Параметри менеджера пакетів JavaScript і робочого простору застосовуються до застосунків на TypeScript і React Native. Інші застосунки використовують інструменти своєї платформи.`)
};

/**
* | output |
* | --- |
* | "JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains." |
*
* @param {Buildercomposerjssettings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerjssettings3 = /** @type {((inputs?: Buildercomposerjssettings3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerjssettings3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerjssettings3(inputs)
	if (locale === "zh") return zh_buildercomposerjssettings3(inputs)
	if (locale === "ja") return ja_buildercomposerjssettings3(inputs)
	if (locale === "ko") return ko_buildercomposerjssettings3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerjssettings3(inputs)
	if (locale === "de") return de_buildercomposerjssettings3(inputs)
	if (locale === "fr") return fr_buildercomposerjssettings3(inputs)
	if (locale === "uk") return uk_buildercomposerjssettings3(inputs)
	return en_buildercomposerjssettings3(inputs)
});
export { buildercomposerjssettings3 as "builderComposerJsSettings" }