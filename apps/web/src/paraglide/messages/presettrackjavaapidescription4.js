/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackjavaapidescription4Inputs */

const en_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot with security, JPA, migrations, and test coverage for backend teams.`)
};

const es_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot con seguridad, JPA, migraciones y cobertura de tests para equipos backend.`)
};

const zh_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot，包含安全、JPA、迁移和面向后端团队的测试覆盖。`)
};

/**
* | output |
* | --- |
* | "Spring Boot with security, JPA, migrations, and test coverage for backend teams." |
*
* @param {Presettrackjavaapidescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapidescription4 = /** @type {((inputs?: Presettrackjavaapidescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapidescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackjavaapidescription4(inputs)
	if (locale === "es") return es_presettrackjavaapidescription4(inputs)
	return zh_presettrackjavaapidescription4(inputs)
});
export { presettrackjavaapidescription4 as "presetTrackJavaApiDescription" }