/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconfiguretitle3Inputs */

const en_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Make each application yours`)
};

const es_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Personaliza cada aplicación`)
};

const zh_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自定义每个应用`)
};

const ja_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`各アプリケーションをカスタマイズ`)
};

const ko_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`각 애플리케이션 맞춤 설정`)
};

const zh_hant1_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自訂每個應用程式`)
};

const de_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Passe jede Anwendung an`)
};

const fr_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Personnalisez chaque application`)
};

const uk_buildercomposerconfiguretitle3 = /** @type {(inputs: Buildercomposerconfiguretitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштуйте кожен застосунок`)
};

/**
* | output |
* | --- |
* | "Make each application yours" |
*
* @param {Buildercomposerconfiguretitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconfiguretitle3 = /** @type {((inputs?: Buildercomposerconfiguretitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconfiguretitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconfiguretitle3(inputs)
	if (locale === "zh") return zh_buildercomposerconfiguretitle3(inputs)
	if (locale === "ja") return ja_buildercomposerconfiguretitle3(inputs)
	if (locale === "ko") return ko_buildercomposerconfiguretitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconfiguretitle3(inputs)
	if (locale === "de") return de_buildercomposerconfiguretitle3(inputs)
	if (locale === "fr") return fr_buildercomposerconfiguretitle3(inputs)
	if (locale === "uk") return uk_buildercomposerconfiguretitle3(inputs)
	return en_buildercomposerconfiguretitle3(inputs)
});
export { buildercomposerconfiguretitle3 as "builderComposerConfigureTitle" }