/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrestapidescription4Inputs */



/**
* | output |
* | --- |
* | "FastAPI with SQLAlchemy, Pydantic, Ruff, and a small API-first Python project layout." |
*
* @param {Presettrackrestapidescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackrestapidescription4 = /** @type {((inputs?: Presettrackrestapidescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapidescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("FastAPI con SQLAlchemy, Pydantic, Ruff y una estructura Python API-first pequeña.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("FastAPI，配合 SQLAlchemy、Pydantic、Ruff，以及轻量 API-first Python 项目结构。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("FastAPI と SQLAlchemy、Pydantic、Ruff、および小規模な API ファースト Python プロジェクト レイアウト。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("SQLAlchemy, Pydantic, Ruff 및 소규모 API 우선 Python 프로젝트 레이아웃이 포함된 FastAPI.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("FastAPI，搭配 SQLAlchemy、Pydantic、Ruff，以及輕量 API-first Python 專案結構。")
	if (locale === "de") return /** @type {LocalizedString} */ ("FastAPI mit SQLAlchemy, Pydantic, Ruff und einem kleinen API-first Python-Projektlayout.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("FastAPI avec SQLAlchemy, Pydantic, Ruff et une petite mise en page de projet Python API-first.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("FastAPI з SQLAlchemy, Pydantic, Ruff і компактною структурою Python-проєкту з API-first підходом.")
	return /** @type {LocalizedString} */ ("FastAPI with SQLAlchemy, Pydantic, Ruff, and a small API-first Python project layout.")
});
export { presettrackrestapidescription4 as "presetTrackRestApiDescription" }