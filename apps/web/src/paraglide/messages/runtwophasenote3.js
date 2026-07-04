/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runtwophasenote3Inputs */

const en_runtwophasenote3 = /** @type {(inputs: Runtwophasenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prefer to keep validation clean? Split it into two phases — generate everything first, then validate on its own:`)
};

const es_runtwophasenote3 = /** @type {(inputs: Runtwophasenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Prefieres mantener la validación limpia? Divídela en dos fases: primero genera todo y luego valida por separado.`)
};

const zh_runtwophasenote3 = /** @type {(inputs: Runtwophasenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`想要保持验证过程的简洁性？那就把它分成两个阶段——先生成所有内容，然后再单独进行验证：`)
};

const ja_runtwophasenote3 = /** @type {(inputs: Runtwophasenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`検証を簡潔に保ちたい場合は、2つのフェーズに分割します。まずすべてを生成し、次に検証を単独で行います。`)
};

const ko_runtwophasenote3 = /** @type {(inputs: Runtwophasenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검증 과정을 깔끔하게 유지하고 싶으신가요? 그렇다면 두 단계로 나누세요. 먼저 모든 것을 생성한 다음, 생성된 부분만 따로 검증하는 방식입니다.`)
};

const zh_hant1_runtwophasenote3 = /** @type {(inputs: Runtwophasenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`想要保持驗證過程的簡潔性？那就把它分成兩個階段──先生成所有內容，然後再單獨驗證：`)
};

const de_runtwophasenote3 = /** @type {(inputs: Runtwophasenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sie möchten die Validierung übersichtlich halten? Teilen Sie sie in zwei Phasen auf – generieren Sie zuerst alles und validieren Sie anschließend separat:`)
};

const fr_runtwophasenote3 = /** @type {(inputs: Runtwophasenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vous préférez une validation simple ? Divisez-la en deux phases : générez d’abord tout, puis validez séparément :`)
};

/**
* | output |
* | --- |
* | "Prefer to keep validation clean? Split it into two phases — generate everything first, then validate on its own:" |
*
* @param {Runtwophasenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runtwophasenote3 = /** @type {((inputs?: Runtwophasenote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runtwophasenote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runtwophasenote3(inputs)
	if (locale === "es") return es_runtwophasenote3(inputs)
	if (locale === "zh") return zh_runtwophasenote3(inputs)
	if (locale === "ja") return ja_runtwophasenote3(inputs)
	if (locale === "ko") return ko_runtwophasenote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runtwophasenote3(inputs)
	if (locale === "de") return de_runtwophasenote3(inputs)
	return fr_runtwophasenote3(inputs)
});
export { runtwophasenote3 as "runTwoPhaseNote" }