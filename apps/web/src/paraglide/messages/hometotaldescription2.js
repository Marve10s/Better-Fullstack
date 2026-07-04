/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometotaldescription2Inputs */

const en_hometotaldescription2 = /** @type {(inputs: Hometotaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multiply this by every database, every CSS framework, every AI SDK, and you get more combinations than there are grains of sand.`)
};

const es_hometotaldescription2 = /** @type {(inputs: Hometotaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multiplica esto por cada base de datos, cada framework CSS y cada SDK de IA, y tendrás más combinaciones que granos de arena.`)
};

const zh_hometotaldescription2 = /** @type {(inputs: Hometotaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`再乘上每个数据库、每个 CSS 框架和每个 AI SDK，组合数量会比沙粒还多。`)
};

const ja_hometotaldescription2 = /** @type {(inputs: Hometotaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`これにすべてのデータベース、すべての CSS フレームワーク、すべての AI SDK を掛け合わせると、砂粒よりも多くの組み合わせが得られます。`)
};

const ko_hometotaldescription2 = /** @type {(inputs: Hometotaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`여기에 모든 데이터베이스, 모든 CSS 프레임워크, 모든 AI SDK를 곱하면 모래알보다 더 많은 조합을 얻을 수 있습니다.`)
};

const zh_hant1_hometotaldescription2 = /** @type {(inputs: Hometotaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`再乘上每個資料庫、每個 CSS 框架和每個 AI SDK，組合數量會比沙粒還多。`)
};

const de_hometotaldescription2 = /** @type {(inputs: Hometotaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multiplizieren Sie dies mit jeder Datenbank, jedem CSS-Framework, jedem AI SDK, und Sie erhalten mehr Kombinationen als Sandkörner.`)
};

const fr_hometotaldescription2 = /** @type {(inputs: Hometotaldescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multipliez cela par chaque base de données, chaque framework CSS, chaque SDK AI, et vous obtenez plus de combinaisons qu'il n'y a de grains de sable.`)
};

/**
* | output |
* | --- |
* | "Multiply this by every database, every CSS framework, every AI SDK, and you get more combinations than there are grains of sand." |
*
* @param {Hometotaldescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometotaldescription2 = /** @type {((inputs?: Hometotaldescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotaldescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometotaldescription2(inputs)
	if (locale === "es") return es_hometotaldescription2(inputs)
	if (locale === "zh") return zh_hometotaldescription2(inputs)
	if (locale === "ja") return ja_hometotaldescription2(inputs)
	if (locale === "ko") return ko_hometotaldescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometotaldescription2(inputs)
	if (locale === "de") return de_hometotaldescription2(inputs)
	return fr_hometotaldescription2(inputs)
});
export { hometotaldescription2 as "homeTotalDescription" }