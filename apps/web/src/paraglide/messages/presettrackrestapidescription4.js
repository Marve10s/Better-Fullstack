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

const ja_presettrackrestapidescription4 = /** @type {(inputs: Presettrackrestapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FastAPI と SQLAlchemy、Pydantic、Ruff、および小規模な API ファースト Python プロジェクト レイアウト。`)
};

const ko_presettrackrestapidescription4 = /** @type {(inputs: Presettrackrestapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SQLAlchemy, Pydantic, Ruff 및 소규모 API 우선 Python 프로젝트 레이아웃이 포함된 FastAPI.`)
};

const zh_hant1_presettrackrestapidescription4 = /** @type {(inputs: Presettrackrestapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FastAPI，搭配 SQLAlchemy、Pydantic、Ruff，以及輕量 API-first Python 專案結構。`)
};

const de_presettrackrestapidescription4 = /** @type {(inputs: Presettrackrestapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FastAPI mit SQLAlchemy, Pydantic, Ruff und einem kleinen API-first Python-Projektlayout.`)
};

const fr_presettrackrestapidescription4 = /** @type {(inputs: Presettrackrestapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FastAPI avec SQLAlchemy, Pydantic, Ruff et une petite mise en page de projet Python API-first.`)
};

/**
* | output |
* | --- |
* | "FastAPI with SQLAlchemy, Pydantic, Ruff, and a small API-first Python project layout." |
*
* @param {Presettrackrestapidescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackrestapidescription4 = /** @type {((inputs?: Presettrackrestapidescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapidescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrestapidescription4(inputs)
	if (locale === "es") return es_presettrackrestapidescription4(inputs)
	if (locale === "zh") return zh_presettrackrestapidescription4(inputs)
	if (locale === "ja") return ja_presettrackrestapidescription4(inputs)
	if (locale === "ko") return ko_presettrackrestapidescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackrestapidescription4(inputs)
	if (locale === "de") return de_presettrackrestapidescription4(inputs)
	return fr_presettrackrestapidescription4(inputs)
});
export { presettrackrestapidescription4 as "presetTrackRestApiDescription" }