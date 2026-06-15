/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatesavedpreset3Inputs */

const en_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Update Saved Preset`)
};

const es_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizar plantilla guardada`)
};

const zh_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新已保存预设`)
};

/**
* | output |
* | --- |
* | "Update Saved Preset" |
*
* @param {Builderupdatesavedpreset3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderupdatesavedpreset3 = /** @type {((inputs?: Builderupdatesavedpreset3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatesavedpreset3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderupdatesavedpreset3(inputs)
	if (locale === "es") return es_builderupdatesavedpreset3(inputs)
	return zh_builderupdatesavedpreset3(inputs)
});
export { builderupdatesavedpreset3 as "builderUpdateSavedPreset" }