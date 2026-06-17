/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmscatteraria2Inputs */

const en_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark scatter chart: each point is one model and creation path`)
};

const es_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gráfico de dispersión del benchmark: cada punto es un modelo y una ruta de creación`)
};

const zh_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark 散点图：每个点代表一个模型和一种创建路径`)
};

const ja_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマーク散布図: 各ポイントは 1 つのモデルと作成パスです`)
};

const ko_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벤치마크 분산형 차트: 각 지점은 하나의 모델이자 생성 경로입니다.`)
};

const zh_hant1_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark 散佈圖：每個點代表一個模型和一種建立路徑`)
};

const de_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark-Streudiagramm: Jeder Punkt ist ein Modell und ein Erstellungspfad`)
};

const fr_llmscatteraria2 = /** @type {(inputs: Llmscatteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diagramme de dispersion de référence : chaque point correspond à un modèle et à un chemin de création`)
};

/**
* | output |
* | --- |
* | "Benchmark scatter chart: each point is one model and creation path" |
*
* @param {Llmscatteraria2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmscatteraria2 = /** @type {((inputs?: Llmscatteraria2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmscatteraria2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmscatteraria2(inputs)
	if (locale === "es") return es_llmscatteraria2(inputs)
	if (locale === "zh") return zh_llmscatteraria2(inputs)
	if (locale === "ja") return ja_llmscatteraria2(inputs)
	if (locale === "ko") return ko_llmscatteraria2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmscatteraria2(inputs)
	if (locale === "de") return de_llmscatteraria2(inputs)
	return fr_llmscatteraria2(inputs)
});
export { llmscatteraria2 as "llmScatterAria" }