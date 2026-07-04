/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ models: NonNullable<unknown> }} Llmscatterunmetered2Inputs */

const en_llmscatterunmetered2 = /** @type {(inputs: Llmscatterunmetered2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Not metered on this axis (excluded from the plot): ${i?.models}`)
};

const es_llmscatterunmetered2 = /** @type {(inputs: Llmscatterunmetered2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Sin medición en este eje (excluido del gráfico): ${i?.models}`)
};

const zh_llmscatterunmetered2 = /** @type {(inputs: Llmscatterunmetered2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`此坐标轴未计量（未绘制在图中）：${i?.models}`)
};

const ja_llmscatterunmetered2 = /** @type {(inputs: Llmscatterunmetered2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`この軸では計測されていません（プロットから除外）：${i?.models}`)
};

const ko_llmscatterunmetered2 = /** @type {(inputs: Llmscatterunmetered2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`이 축에서는 측정되지 않음(차트에서 제외됨): ${i?.models}`)
};

const zh_hant1_llmscatterunmetered2 = /** @type {(inputs: Llmscatterunmetered2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`此座標軸未計量（未繪製在圖中）：${i?.models}`)
};

const de_llmscatterunmetered2 = /** @type {(inputs: Llmscatterunmetered2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Auf dieser Achse nicht gemessen (nicht im Diagramm): ${i?.models}`)
};

const fr_llmscatterunmetered2 = /** @type {(inputs: Llmscatterunmetered2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Non mesuré sur cet axe (exclu du graphique) : ${i?.models}`)
};

/**
* | output |
* | --- |
* | "Not metered on this axis (excluded from the plot): {models}" |
*
* @param {Llmscatterunmetered2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmscatterunmetered2 = /** @type {((inputs: Llmscatterunmetered2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmscatterunmetered2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmscatterunmetered2(inputs)
	if (locale === "es") return es_llmscatterunmetered2(inputs)
	if (locale === "zh") return zh_llmscatterunmetered2(inputs)
	if (locale === "ja") return ja_llmscatterunmetered2(inputs)
	if (locale === "ko") return ko_llmscatterunmetered2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmscatterunmetered2(inputs)
	if (locale === "de") return de_llmscatterunmetered2(inputs)
	return fr_llmscatterunmetered2(inputs)
});
export { llmscatterunmetered2 as "llmScatterUnmetered" }