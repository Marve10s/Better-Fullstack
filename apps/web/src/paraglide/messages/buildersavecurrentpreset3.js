/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavecurrentpreset3Inputs */

const en_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save current preset`)
};

const es_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guardar plantilla actual`)
};

const zh_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存当前预设`)
};

/**
* | output |
* | --- |
* | "Save current preset" |
*
* @param {Buildersavecurrentpreset3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersavecurrentpreset3 = /** @type {((inputs?: Buildersavecurrentpreset3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavecurrentpreset3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersavecurrentpreset3(inputs)
	if (locale === "es") return es_buildersavecurrentpreset3(inputs)
	return zh_buildersavecurrentpreset3(inputs)
});
export { buildersavecurrentpreset3 as "builderSaveCurrentPreset" }