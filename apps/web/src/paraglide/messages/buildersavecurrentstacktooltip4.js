/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavecurrentstacktooltip4Inputs */

const en_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save the current stack as a named preset`)
};

const es_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guarda el stack actual como una plantilla con nombre`)
};

const zh_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`将当前 stack 保存为具名预设`)
};

const ja_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`現在のスタックを名前付きプリセットとして保存します`)
};

const ko_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`현재 스택을 명명된 사전 설정으로 저장`)
};

const zh_hant1_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`將目前 stack 儲存為具名預設`)
};

const de_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Speichern Sie den aktuellen Stapel als benannte Voreinstellung`)
};

const fr_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enregistrez la pile actuelle en tant que préréglage nommé`)
};

/**
* | output |
* | --- |
* | "Save the current stack as a named preset" |
*
* @param {Buildersavecurrentstacktooltip4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildersavecurrentstacktooltip4 = /** @type {((inputs?: Buildersavecurrentstacktooltip4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavecurrentstacktooltip4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersavecurrentstacktooltip4(inputs)
	if (locale === "es") return es_buildersavecurrentstacktooltip4(inputs)
	if (locale === "zh") return zh_buildersavecurrentstacktooltip4(inputs)
	if (locale === "ja") return ja_buildersavecurrentstacktooltip4(inputs)
	if (locale === "ko") return ko_buildersavecurrentstacktooltip4(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersavecurrentstacktooltip4(inputs)
	if (locale === "de") return de_buildersavecurrentstacktooltip4(inputs)
	return fr_buildersavecurrentstacktooltip4(inputs)
});
export { buildersavecurrentstacktooltip4 as "builderSaveCurrentStackTooltip" }