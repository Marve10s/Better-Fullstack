/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipnonemeansskip4Inputs */

const en_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"none" means skip, not "use the default"`)
};

const es_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"none" significa omitir, no "usar el predeterminado"`)
};

const zh_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"none" 表示跳过，不是“使用默认值”`)
};

const ja_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`「なし」は「デフォルトを使用する」ではなく、スキップすることを意味します。`)
};

const ko_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"없음"은 "기본값 사용"이 아니라 건너뛰기를 의미합니다.`)
};

const zh_hant1_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"none" 表示跳過，不是“使用預設值”`)
};

const de_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`„keine“ bedeutet überspringen, nicht „Standard verwenden“`)
};

const fr_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"aucun" signifie ignorer, et non "utiliser la valeur par défaut"`)
};

/**
* | output |
* | --- |
* | "\"none\" means skip, not \"use the default\"" |
*
* @param {Mcptipnonemeansskip4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptipnonemeansskip4 = /** @type {((inputs?: Mcptipnonemeansskip4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipnonemeansskip4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptipnonemeansskip4(inputs)
	if (locale === "es") return es_mcptipnonemeansskip4(inputs)
	if (locale === "zh") return zh_mcptipnonemeansskip4(inputs)
	if (locale === "ja") return ja_mcptipnonemeansskip4(inputs)
	if (locale === "ko") return ko_mcptipnonemeansskip4(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptipnonemeansskip4(inputs)
	if (locale === "de") return de_mcptipnonemeansskip4(inputs)
	return fr_mcptipnonemeansskip4(inputs)
});
export { mcptipnonemeansskip4 as "mcpTipNoneMeansSkip" }