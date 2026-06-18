/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipsetecosystemfirst4Inputs */

const en_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set ecosystem first: it decides which fields matter`)
};

const es_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Define primero el ecosistema: decide qué campos importan`)
};

const zh_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先设置生态：它会决定哪些字段有效`)
};

const ja_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最初にエコシステムを設定します。どの分野が重要かを決定します。`)
};

const ko_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생태계를 먼저 설정하세요. 어떤 분야가 중요한지 결정합니다.`)
};

const zh_hant1_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先設定生態：它會決定哪些欄位有效`)
};

const de_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stellen Sie das Ökosystem an die erste Stelle: Es entscheidet, welche Bereiche wichtig sind`)
};

const fr_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Définir l'écosystème en premier : il décide quels domaines sont importants`)
};

/**
* | output |
* | --- |
* | "Set ecosystem first: it decides which fields matter" |
*
* @param {Mcptipsetecosystemfirst4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptipsetecosystemfirst4 = /** @type {((inputs?: Mcptipsetecosystemfirst4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipsetecosystemfirst4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptipsetecosystemfirst4(inputs)
	if (locale === "es") return es_mcptipsetecosystemfirst4(inputs)
	if (locale === "zh") return zh_mcptipsetecosystemfirst4(inputs)
	if (locale === "ja") return ja_mcptipsetecosystemfirst4(inputs)
	if (locale === "ko") return ko_mcptipsetecosystemfirst4(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptipsetecosystemfirst4(inputs)
	if (locale === "de") return de_mcptipsetecosystemfirst4(inputs)
	return fr_mcptipsetecosystemfirst4(inputs)
});
export { mcptipsetecosystemfirst4 as "mcpTipSetEcosystemFirst" }