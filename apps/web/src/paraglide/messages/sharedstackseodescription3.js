/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharedstackseodescription3Inputs */

const en_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open a shared Better Fullstack builder configuration.`)
};

const es_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abre una configuración compartida del constructor de Better Fullstack.`)
};

const zh_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开一个共享的 Better Fullstack 构建器配置。`)
};

const ja_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共有 Better Fullstack ビルダー構成を開きます。`)
};

const ko_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공유 Better Fullstack 빌더 구성을 엽니다.`)
};

const zh_hant1_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟一個共享的 Better Fullstack 建構器配置。`)
};

const de_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffnen Sie eine freigegebene Builder-Konfiguration Better Fullstack.`)
};

const fr_sharedstackseodescription3 = /** @type {(inputs: Sharedstackseodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrez une configuration de générateur Better Fullstack partagée.`)
};

/**
* | output |
* | --- |
* | "Open a shared Better Fullstack builder configuration." |
*
* @param {Sharedstackseodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const sharedstackseodescription3 = /** @type {((inputs?: Sharedstackseodescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharedstackseodescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharedstackseodescription3(inputs)
	if (locale === "es") return es_sharedstackseodescription3(inputs)
	if (locale === "zh") return zh_sharedstackseodescription3(inputs)
	if (locale === "ja") return ja_sharedstackseodescription3(inputs)
	if (locale === "ko") return ko_sharedstackseodescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_sharedstackseodescription3(inputs)
	if (locale === "de") return de_sharedstackseodescription3(inputs)
	return fr_sharedstackseodescription3(inputs)
});
export { sharedstackseodescription3 as "sharedStackSeoDescription" }