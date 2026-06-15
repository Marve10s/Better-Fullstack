/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettracksaasdescription3Inputs */

const en_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js with auth, relational data, payments, email, and a deployment-ready app shape.`)
};

const es_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js con auth, datos relacionales, pagos, email y una app lista para despliegue.`)
};

const zh_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js，包含认证、关系型数据、支付、email，以及可部署的应用结构。`)
};

/**
* | output |
* | --- |
* | "Next.js with auth, relational data, payments, email, and a deployment-ready app shape." |
*
* @param {Presettracksaasdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettracksaasdescription3 = /** @type {((inputs?: Presettracksaasdescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasdescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettracksaasdescription3(inputs)
	if (locale === "es") return es_presettracksaasdescription3(inputs)
	return zh_presettracksaasdescription3(inputs)
});
export { presettracksaasdescription3 as "presetTrackSaasDescription" }