/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedfullconfig2Inputs */

const en_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Full saved configuration for this preset.`)
};

const es_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración completa guardada para esta plantilla.`)
};

const zh_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此预设的完整保存配置。`)
};

const ja_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このプリセットの完全に保存された設定。`)
};

const ko_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 사전 설정의 전체 저장된 구성입니다.`)
};

const zh_hant1_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此預設的完整儲存配置。`)
};

const de_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vollständig gespeicherte Konfiguration für diese Voreinstellung.`)
};

const fr_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuration entièrement enregistrée pour ce préréglage.`)
};

/**
* | output |
* | --- |
* | "Full saved configuration for this preset." |
*
* @param {Savedfullconfig2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedfullconfig2 = /** @type {((inputs?: Savedfullconfig2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedfullconfig2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedfullconfig2(inputs)
	if (locale === "es") return es_savedfullconfig2(inputs)
	if (locale === "zh") return zh_savedfullconfig2(inputs)
	if (locale === "ja") return ja_savedfullconfig2(inputs)
	if (locale === "ko") return ko_savedfullconfig2(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedfullconfig2(inputs)
	if (locale === "de") return de_savedfullconfig2(inputs)
	return fr_savedfullconfig2(inputs)
});
export { savedfullconfig2 as "savedFullConfig" }