/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmbenchmarkdescription2Inputs */

const en_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Measuring coding agents on real fullstack scaffolding tasks — time, tokens, cost, and whether the result actually builds.`)
};

const es_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mide agentes de programación en tareas reales de scaffolding fullstack: tiempo, tokens, coste y si el resultado realmente compila.`)
};

const zh_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用真实全栈脚手架任务衡量编程代理：时间、tokens、成本，以及结果是否真的能构建。`)
};

const ja_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実際のフルスタック スキャフォールディング タスクにおけるコーディング エージェントを測定します (時間、トークン、コスト、結果が実際にビルドされるかどうか)。`)
};

const ko_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시간, 토큰, 비용 및 결과가 실제로 구축되는지 여부 등 실제 풀스택 스캐폴딩 작업에서 코딩 에이전트를 측정합니다.`)
};

const zh_hant1_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用真實全端鷹架任務衡量程式設計代理：時間、tokens、成本，以及結果是否真的能建構。`)
};

const de_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Messung von Codierungsagenten bei echten Fullstack-Scaffolding-Aufgaben – Zeit, Token, Kosten und ob das Ergebnis tatsächlich erstellt wird.`)
};

const fr_llmbenchmarkdescription2 = /** @type {(inputs: Llmbenchmarkdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mesurer les agents de codage sur de véritables tâches d'échafaudage fullstack : temps, jetons, coût et si le résultat est réellement généré.`)
};

/**
* | output |
* | --- |
* | "Measuring coding agents on real fullstack scaffolding tasks — time, tokens, cost, and whether the result actually builds." |
*
* @param {Llmbenchmarkdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmbenchmarkdescription2 = /** @type {((inputs?: Llmbenchmarkdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmbenchmarkdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmbenchmarkdescription2(inputs)
	if (locale === "es") return es_llmbenchmarkdescription2(inputs)
	if (locale === "zh") return zh_llmbenchmarkdescription2(inputs)
	if (locale === "ja") return ja_llmbenchmarkdescription2(inputs)
	if (locale === "ko") return ko_llmbenchmarkdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmbenchmarkdescription2(inputs)
	if (locale === "de") return de_llmbenchmarkdescription2(inputs)
	return fr_llmbenchmarkdescription2(inputs)
});
export { llmbenchmarkdescription2 as "llmBenchmarkDescription" }