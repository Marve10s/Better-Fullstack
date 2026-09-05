/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconfiguredescription3Inputs */

const en_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform.`)
};

const es_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambia entre tus aplicaciones para elegir frameworks y funciones compatibles. Puedes volver a Aplicaciones para añadir o eliminar una plataforma.`)
};

const zh_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换应用以选择框架和兼容功能。你可以返回“应用”步骤来添加或移除平台。`)
};

const ja_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アプリケーションを切り替えて、フレームワークや互換性のある機能を選択します。「アプリケーション」に戻るとプラットフォームを追加・削除できます。`)
};

const ko_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`애플리케이션을 전환하며 프레임워크와 호환 기능을 선택하세요. 애플리케이션 단계로 돌아가 플랫폼을 추가하거나 제거할 수 있습니다.`)
};

const zh_hant1_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切換應用程式以選擇框架和相容功能。你可以返回「應用程式」步驟來新增或移除平台。`)
};

const de_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wechsle zwischen deinen Anwendungen, um Frameworks und kompatible Funktionen auszuwählen. Unter „Anwendungen“ kannst du Plattformen hinzufügen oder entfernen.`)
};

const fr_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Passez d’une application à l’autre pour choisir les frameworks et les fonctionnalités compatibles. Revenez à Applications pour ajouter ou supprimer une plateforme.`)
};

const uk_buildercomposerconfiguredescription3 = /** @type {(inputs: Buildercomposerconfiguredescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перемикайтеся між застосунками, щоб вибрати фреймворки та сумісні можливості. Поверніться до кроку «Застосунки», щоб додати або видалити платформу.`)
};

/**
* | output |
* | --- |
* | "Switch between your applications to choose frameworks and compatible capabilities. You can return to Applications to add or remove a platform." |
*
* @param {Buildercomposerconfiguredescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconfiguredescription3 = /** @type {((inputs?: Buildercomposerconfiguredescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconfiguredescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconfiguredescription3(inputs)
	if (locale === "zh") return zh_buildercomposerconfiguredescription3(inputs)
	if (locale === "ja") return ja_buildercomposerconfiguredescription3(inputs)
	if (locale === "ko") return ko_buildercomposerconfiguredescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconfiguredescription3(inputs)
	if (locale === "de") return de_buildercomposerconfiguredescription3(inputs)
	if (locale === "fr") return fr_buildercomposerconfiguredescription3(inputs)
	if (locale === "uk") return uk_buildercomposerconfiguredescription3(inputs)
	return en_buildercomposerconfiguredescription3(inputs)
});
export { buildercomposerconfiguredescription3 as "builderComposerConfigureDescription" }