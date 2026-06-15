/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Saveddescription1Inputs */

const en_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Use the save icon in the builder bar to create local presets, then load or update them here.`)
};

const es_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usa el icono de guardar en la barra del constructor para crear plantillas locales y cargarlas o actualizarlas aquí.`)
};

const zh_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用构建器栏中的保存图标创建本地预设，然后在这里加载或更新。`)
};

/**
* | output |
* | --- |
* | "Use the save icon in the builder bar to create local presets, then load or update them here." |
*
* @param {Saveddescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const saveddescription1 = /** @type {((inputs?: Saveddescription1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddescription1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_saveddescription1(inputs)
	if (locale === "es") return es_saveddescription1(inputs)
	return zh_saveddescription1(inputs)
});
export { saveddescription1 as "savedDescription" }