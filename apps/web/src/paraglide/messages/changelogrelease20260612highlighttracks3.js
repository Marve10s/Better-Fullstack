/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlighttracks3Inputs */

const en_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Added starter tracks: curated, goal-based stack presets for common product shapes.`)
};

const es_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se añadieron rutas iniciales: presets de stack curados y orientados a objetivos para formas comunes de producto.`)
};

const zh_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加入入门路线：为常见产品形态准备的、按目标策划的 stack 预设。`)
};

const ja_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スターター トラックを追加しました: 一般的な製品形状向けに厳選された目標ベースのスタック プリセット。`)
};

const ko_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스타터 트랙 추가: 일반적인 제품 형태에 대해 선별된 목표 기반 스택 사전 설정.`)
};

const zh_hant1_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加入入門路線：為常見產品形態準備的、依目標規劃的 stack 預設。`)
};

const de_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Starter-Tracks hinzugefügt: kuratierte, zielbasierte Stapelvoreinstellungen für gängige Produktformen.`)
};

const fr_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ajout de pistes de démarrage : des préréglages de pile organisés et basés sur des objectifs pour les formes de produits courantes.`)
};

/**
* | output |
* | --- |
* | "Added starter tracks: curated, goal-based stack presets for common product shapes." |
*
* @param {Changelogrelease20260612highlighttracks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlighttracks3 = /** @type {((inputs?: Changelogrelease20260612highlighttracks3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlighttracks3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlighttracks3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlighttracks3(inputs)
	if (locale === "zh") return zh_changelogrelease20260612highlighttracks3(inputs)
	if (locale === "ja") return ja_changelogrelease20260612highlighttracks3(inputs)
	if (locale === "ko") return ko_changelogrelease20260612highlighttracks3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612highlighttracks3(inputs)
	if (locale === "de") return de_changelogrelease20260612highlighttracks3(inputs)
	return fr_changelogrelease20260612highlighttracks3(inputs)
});
export { changelogrelease20260612highlighttracks3 as "changelogRelease20260612HighlightTracks" }