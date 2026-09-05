/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposernativesettings3Inputs */

const en_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const es_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las aplicaciones seleccionadas usan herramientas nativas. El proyecto generado no requiere un gestor de paquetes de JavaScript.`)
};

const zh_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所选应用使用原生工具链。生成的项目不需要 JavaScript 包管理器。`)
};

const ja_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選択したアプリケーションは各言語の開発ツールを使用します。生成されるプロジェクトに JavaScript パッケージマネージャーは必要ありません。`)
};

const ko_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`선택한 애플리케이션은 해당 언어의 개발 도구를 사용합니다. 생성되는 프로젝트에는 JavaScript 패키지 관리자가 필요하지 않습니다.`)
};

const zh_hant1_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所選應用程式使用原生工具鏈。產生的專案不需要 JavaScript 套件管理器。`)
};

const de_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deine ausgewählten Anwendungen verwenden native Entwicklungswerkzeuge. Für das generierte Projekt ist kein JavaScript-Paketmanager erforderlich.`)
};

const fr_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les applications sélectionnées utilisent des outils natifs. Aucun gestionnaire de paquets JavaScript n’est requis pour le projet généré.`)
};

const uk_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вибрані застосунки використовують інструменти своєї платформи. Для згенерованого проєкту менеджер пакетів JavaScript не потрібен.`)
};

/**
* | output |
* | --- |
* | "Your selected applications use native toolchains. No JavaScript package manager is required for the generated project." |
*
* @param {Buildercomposernativesettings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposernativesettings3 = /** @type {((inputs?: Buildercomposernativesettings3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposernativesettings3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposernativesettings3(inputs)
	if (locale === "zh") return zh_buildercomposernativesettings3(inputs)
	if (locale === "ja") return ja_buildercomposernativesettings3(inputs)
	if (locale === "ko") return ko_buildercomposernativesettings3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposernativesettings3(inputs)
	if (locale === "de") return de_buildercomposernativesettings3(inputs)
	if (locale === "fr") return fr_buildercomposernativesettings3(inputs)
	if (locale === "uk") return uk_buildercomposernativesettings3(inputs)
	return en_buildercomposernativesettings3(inputs)
});
export { buildercomposernativesettings3 as "builderComposerNativeSettings" }