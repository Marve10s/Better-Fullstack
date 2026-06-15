/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrestapiintent4Inputs */

const en_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expose a service`)
};

const es_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exponer un servicio`)
};

const zh_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暴露服务`)
};

/**
* | output |
* | --- |
* | "Expose a service" |
*
* @param {Presettrackrestapiintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackrestapiintent4 = /** @type {((inputs?: Presettrackrestapiintent4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapiintent4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrestapiintent4(inputs)
	if (locale === "es") return es_presettrackrestapiintent4(inputs)
	return zh_presettrackrestapiintent4(inputs)
});
export { presettrackrestapiintent4 as "presetTrackRestApiIntent" }