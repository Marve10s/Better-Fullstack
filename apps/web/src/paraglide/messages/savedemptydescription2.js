/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedemptydescription2Inputs */

const en_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save the current builder configuration to create a reusable preset for yourself. These entries stay in local storage on this browser.`)
};

const es_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guarda la configuración actual para crear una plantilla reutilizable. Estas entradas se quedan en el almacenamiento local de este navegador.`)
};

const zh_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存当前构建器配置，创建可复用的个人预设。这些条目会保存在此浏览器的本地存储中。`)
};

/**
* | output |
* | --- |
* | "Save the current builder configuration to create a reusable preset for yourself. These entries stay in local storage on this browser." |
*
* @param {Savedemptydescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedemptydescription2 = /** @type {((inputs?: Savedemptydescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedemptydescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedemptydescription2(inputs)
	if (locale === "es") return es_savedemptydescription2(inputs)
	return zh_savedemptydescription2(inputs)
});
export { savedemptydescription2 as "savedEmptyDescription" }