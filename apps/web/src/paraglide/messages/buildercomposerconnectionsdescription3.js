/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconnectionsdescription3Inputs */

const en_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const es_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const zh_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const ja_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const ko_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const zh_hant1_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const de_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const fr_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const uk_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

/**
* | output |
* | --- |
* | "Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints." |
*
* @param {Buildercomposerconnectionsdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconnectionsdescription3 = /** @type {((inputs?: Buildercomposerconnectionsdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconnectionsdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconnectionsdescription3(inputs)
	if (locale === "zh") return zh_buildercomposerconnectionsdescription3(inputs)
	if (locale === "ja") return ja_buildercomposerconnectionsdescription3(inputs)
	if (locale === "ko") return ko_buildercomposerconnectionsdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconnectionsdescription3(inputs)
	if (locale === "de") return de_buildercomposerconnectionsdescription3(inputs)
	if (locale === "fr") return fr_buildercomposerconnectionsdescription3(inputs)
	if (locale === "uk") return uk_buildercomposerconnectionsdescription3(inputs)
	return en_buildercomposerconnectionsdescription3(inputs)
});
export { buildercomposerconnectionsdescription3 as "builderComposerConnectionsDescription" }