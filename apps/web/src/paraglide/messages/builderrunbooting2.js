/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunbooting2Inputs */

const en_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Booting browser runtime`)
};

const es_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Iniciando entorno del navegador`)
};

const zh_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在启动浏览器运行时`)
};

const ja_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブラウザランタイムを起動中`)
};

const ko_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`브라우저 런타임 부팅 중`)
};

const zh_hant1_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在啟動瀏覽器執行階段`)
};

const de_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser-Laufzeit wird gestartet`)
};

const fr_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Démarrage de l’environnement navigateur`)
};

const uk_builderrunbooting2 = /** @type {(inputs: Builderrunbooting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запуск середовища браузера`)
};

/**
* | output |
* | --- |
* | "Booting browser runtime" |
*
* @param {Builderrunbooting2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunbooting2 = /** @type {((inputs?: Builderrunbooting2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunbooting2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunbooting2(inputs)
	if (locale === "es") return es_builderrunbooting2(inputs)
	if (locale === "zh") return zh_builderrunbooting2(inputs)
	if (locale === "ja") return ja_builderrunbooting2(inputs)
	if (locale === "ko") return ko_builderrunbooting2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunbooting2(inputs)
	if (locale === "de") return de_builderrunbooting2(inputs)
	if (locale === "fr") return fr_builderrunbooting2(inputs)
	return uk_builderrunbooting2(inputs)
});
export { builderrunbooting2 as "builderRunBooting" }