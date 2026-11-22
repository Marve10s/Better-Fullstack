/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderruninstalling2Inputs */



/**
* | output |
* | --- |
* | "Installing dependencies" |
*
* @param {Builderruninstalling2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderruninstalling2 = /** @type {((inputs?: Builderruninstalling2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderruninstalling2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Instalando dependencias")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在安装依赖")
	if (locale === "ja") return /** @type {LocalizedString} */ ("依存関係をインストール中")
	if (locale === "ko") return /** @type {LocalizedString} */ ("의존성 설치 중")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在安裝相依套件")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abhängigkeiten werden installiert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Installation des dépendances")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Встановлення залежностей")
	return /** @type {LocalizedString} */ ("Installing dependencies")
});
export { builderruninstalling2 as "builderRunInstalling" }