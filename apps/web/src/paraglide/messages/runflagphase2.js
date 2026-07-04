/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagphase2Inputs */

const en_runflagphase2 = /** @type {(inputs: Runflagphase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`split the run into a generate phase and a validate phase, validated on its own`)
};

const es_runflagphase2 = /** @type {(inputs: Runflagphase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`dividir la ejecución en una fase de generación y una fase de validación, validada por sí sola.`)
};

const zh_runflagphase2 = /** @type {(inputs: Runflagphase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`将运行过程分为生成阶段和验证阶段，验证阶段单独进行验证。`)
};

const ja_runflagphase2 = /** @type {(inputs: Runflagphase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実行を生成フェーズと検証フェーズに分割し、それぞれを個別に検証する`)
};

const ko_runflagphase2 = /** @type {(inputs: Runflagphase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실행 과정을 생성 단계와 검증 단계로 나누고, 각 단계는 자체적으로 검증됩니다.`)
};

const zh_hant1_runflagphase2 = /** @type {(inputs: Runflagphase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`將運行過程分為生成階段和驗證階段，驗證階段單獨進行驗證。`)
};

const de_runflagphase2 = /** @type {(inputs: Runflagphase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Lauf wird in eine Generierungsphase und eine Validierungsphase unterteilt, die jeweils selbstständig validiert wird.`)
};

const fr_runflagphase2 = /** @type {(inputs: Runflagphase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`diviser l'exécution en une phase de génération et une phase de validation, validée séparément.`)
};

/**
* | output |
* | --- |
* | "split the run into a generate phase and a validate phase, validated on its own" |
*
* @param {Runflagphase2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runflagphase2 = /** @type {((inputs?: Runflagphase2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagphase2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runflagphase2(inputs)
	if (locale === "es") return es_runflagphase2(inputs)
	if (locale === "zh") return zh_runflagphase2(inputs)
	if (locale === "ja") return ja_runflagphase2(inputs)
	if (locale === "ko") return ko_runflagphase2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagphase2(inputs)
	if (locale === "de") return de_runflagphase2(inputs)
	return fr_runflagphase2(inputs)
});
export { runflagphase2 as "runFlagPhase" }