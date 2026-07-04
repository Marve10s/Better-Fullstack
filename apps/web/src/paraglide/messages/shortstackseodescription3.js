/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Shortstackseodescription3Inputs */

const en_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open a short Better Fullstack builder configuration link.`)
};

const es_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abre un enlace corto de configuración del constructor de Better Fullstack.`)
};

const zh_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开一个短链接形式的 Better Fullstack 构建器配置。`)
};

const ja_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`短い Better Fullstack ビルダー構成リンクを開きます。`)
};

const ko_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`짧은 Better Fullstack 빌더 구성 링크를 엽니다.`)
};

const zh_hant1_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟一個短連結形式的 Better Fullstack 建構器配置。`)
};

const de_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffnen Sie einen kurzen Link zur Builder-Konfiguration Better Fullstack.`)
};

const fr_shortstackseodescription3 = /** @type {(inputs: Shortstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrez un court lien de configuration du générateur Better Fullstack.`)
};

/**
* | output |
* | --- |
* | "Open a short Better Fullstack builder configuration link." |
*
* @param {Shortstackseodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const shortstackseodescription3 = /** @type {((inputs?: Shortstackseodescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Shortstackseodescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_shortstackseodescription3(inputs)
	if (locale === "es") return es_shortstackseodescription3(inputs)
	if (locale === "zh") return zh_shortstackseodescription3(inputs)
	if (locale === "ja") return ja_shortstackseodescription3(inputs)
	if (locale === "ko") return ko_shortstackseodescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_shortstackseodescription3(inputs)
	if (locale === "de") return de_shortstackseodescription3(inputs)
	return fr_shortstackseodescription3(inputs)
});
export { shortstackseodescription3 as "shortStackSeoDescription" }