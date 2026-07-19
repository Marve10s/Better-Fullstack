/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunbrowserunsupportedtitle4Inputs */

const en_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This browser cannot start the runtime`)
};

const es_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Este navegador no puede iniciar el entorno`)
};

const zh_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此浏览器无法启动运行时`)
};

const ja_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このブラウザではランタイムを起動できません`)
};

const ko_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 브라우저에서 런타임을 시작할 수 없습니다`)
};

const zh_hant1_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此瀏覽器無法啟動執行階段`)
};

const de_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dieser Browser kann die Laufzeit nicht starten`)
};

const fr_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ce navigateur ne peut pas démarrer l’environnement`)
};

const uk_builderrunbrowserunsupportedtitle4 = /** @type {(inputs: Builderrunbrowserunsupportedtitle4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Цей браузер не може запустити середовище`)
};

/**
* | output |
* | --- |
* | "This browser cannot start the runtime" |
*
* @param {Builderrunbrowserunsupportedtitle4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunbrowserunsupportedtitle4 = /** @type {((inputs?: Builderrunbrowserunsupportedtitle4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunbrowserunsupportedtitle4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunbrowserunsupportedtitle4(inputs)
	if (locale === "es") return es_builderrunbrowserunsupportedtitle4(inputs)
	if (locale === "zh") return zh_builderrunbrowserunsupportedtitle4(inputs)
	if (locale === "ja") return ja_builderrunbrowserunsupportedtitle4(inputs)
	if (locale === "ko") return ko_builderrunbrowserunsupportedtitle4(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunbrowserunsupportedtitle4(inputs)
	if (locale === "de") return de_builderrunbrowserunsupportedtitle4(inputs)
	if (locale === "fr") return fr_builderrunbrowserunsupportedtitle4(inputs)
	return uk_builderrunbrowserunsupportedtitle4(inputs)
});
export { builderrunbrowserunsupportedtitle4 as "builderRunBrowserUnsupportedTitle" }