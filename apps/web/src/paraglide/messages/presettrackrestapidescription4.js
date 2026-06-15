/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrestapidescription4Inputs */

const en_presettrackrestapidescription4 = /** @type {(inputs: Presettrackrestapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FastAPI with SQLAlchemy, Pydantic, Ruff, and a small API-first Python project layout.`)
};

const es_presettrackrestapidescription4 = /** @type {(inputs: Presettrackrestapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FastAPI con SQLAlchemy, Pydantic, Ruff y una estructura Python API-first pequeña.`)
};

const zh_presettrackrestapidescription4 = /** @type {(inputs: Presettrackrestapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FastAPI，配合 SQLAlchemy、Pydantic、Ruff，以及轻量 API-first Python 项目结构。`)
};

/**
* | output |
* | --- |
* | "FastAPI with SQLAlchemy, Pydantic, Ruff, and a small API-first Python project layout." |
*
* @param {Presettrackrestapidescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackrestapidescription4 = /** @type {((inputs?: Presettrackrestapidescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapidescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrestapidescription4(inputs)
	if (locale === "es") return es_presettrackrestapidescription4(inputs)
	return zh_presettrackrestapidescription4(inputs)
});
export { presettrackrestapidescription4 as "presetTrackRestApiDescription" }