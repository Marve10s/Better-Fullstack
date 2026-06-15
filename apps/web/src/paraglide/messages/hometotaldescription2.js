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

/**
* | output |
* | --- |
* | "Multiply this by every database, every CSS framework, every AI SDK, and you get more combinations than there are grains of sand." |
*
* @param {Hometotaldescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometotaldescription2 = /** @type {((inputs?: Hometotaldescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotaldescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometotaldescription2(inputs)
	if (locale === "es") return es_hometotaldescription2(inputs)
	return zh_hometotaldescription2(inputs)
});
export { hometotaldescription2 as "homeTotalDescription" }