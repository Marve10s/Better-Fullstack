/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runctadesc2Inputs */

const en_runctadesc2 = /** @type {(inputs: Runctadesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your numbers land in the same format as the leaderboard. Ran something interesting? Open a pull request with your report.`)
};

const es_runctadesc2 = /** @type {(inputs: Runctadesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tus resultados se mostrarán en el mismo formato que la tabla de clasificación. ¿Obtuviste algún resultado interesante? Envía tu informe mediante una solicitud de extracción.`)
};

const zh_runctadesc2 = /** @type {(inputs: Runctadesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的统计数据将以与排行榜相同的格式显示。运行了什么有趣的东西吗？提交一个 pull request 来附上你的报告吧。`)
};

const ja_runctadesc2 = /** @type {(inputs: Runctadesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`あなたの数値はリーダーボードと同じ形式で表示されます。何か興味深い結果が出ましたか？レポートを添えてプルリクエストを作成してください。`)
};

const ko_runctadesc2 = /** @type {(inputs: Runctadesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`여러분의 결과는 리더보드와 동일한 형식으로 표시됩니다. 흥미로운 작업을 수행하셨나요? 보고서를 첨부하여 풀 리퀘스트를 열어주세요.`)
};

const zh_hant1_runctadesc2 = /** @type {(inputs: Runctadesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的統計數據將以與排行榜相同的格式顯示。運行了什麼有趣的東西嗎？提交一個 pull request 來附上你的報告吧。`)
};

const de_runctadesc2 = /** @type {(inputs: Runctadesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deine Zahlen werden im gleichen Format wie die Rangliste angezeigt. Hast du etwas Interessantes ausprobiert? Erstelle einen Pull Request mit deinem Bericht.`)
};

const fr_runctadesc2 = /** @type {(inputs: Runctadesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vos résultats s'affichent au même format que le classement. Vous avez réalisé une expérience intéressante ? Soumettez une pull request avec votre rapport.`)
};

/**
* | output |
* | --- |
* | "Your numbers land in the same format as the leaderboard. Ran something interesting? Open a pull request with your report." |
*
* @param {Runctadesc2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runctadesc2 = /** @type {((inputs?: Runctadesc2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runctadesc2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runctadesc2(inputs)
	if (locale === "es") return es_runctadesc2(inputs)
	if (locale === "zh") return zh_runctadesc2(inputs)
	if (locale === "ja") return ja_runctadesc2(inputs)
	if (locale === "ko") return ko_runctadesc2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runctadesc2(inputs)
	if (locale === "de") return de_runctadesc2(inputs)
	return fr_runctadesc2(inputs)
});
export { runctadesc2 as "runCtaDesc" }