/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltooldescription4Inputs */

const en_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router, Hono, Drizzle, auth, and tRPC for product dashboards and admin tools.`)
};

const es_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router, Hono, Drizzle, auth y tRPC para dashboards de producto y herramientas admin.`)
};

const zh_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router、Hono、Drizzle、auth 和 tRPC，用于产品仪表盘和管理工具。`)
};

/**
* | output |
* | --- |
* | "TanStack Router, Hono, Drizzle, auth, and tRPC for product dashboards and admin tools." |
*
* @param {Presettrackinternaltooldescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackinternaltooldescription4 = /** @type {((inputs?: Presettrackinternaltooldescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackinternaltooldescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackinternaltooldescription4(inputs)
	if (locale === "es") return es_presettrackinternaltooldescription4(inputs)
	return zh_presettrackinternaltooldescription4(inputs)
});
export { presettrackinternaltooldescription4 as "presetTrackInternalToolDescription" }