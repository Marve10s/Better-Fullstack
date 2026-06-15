/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedeploytargets2Inputs */

const en_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deploy targets (Vercel, CF, Docker, etc.)`)
};

const es_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Destinos de despliegue (Vercel, CF, Docker, etc.)`)
};

const zh_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`部署目标（Vercel、CF、Docker 等）`)
};

/**
* | output |
* | --- |
* | "Deploy targets (Vercel, CF, Docker, etc.)" |
*
* @param {Comparedeploytargets2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparedeploytargets2 = /** @type {((inputs?: Comparedeploytargets2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedeploytargets2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparedeploytargets2(inputs)
	if (locale === "es") return es_comparedeploytargets2(inputs)
	return zh_comparedeploytargets2(inputs)
});
export { comparedeploytargets2 as "compareDeployTargets" }