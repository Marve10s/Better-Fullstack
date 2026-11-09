/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlighttracks3Inputs */



/**
* | output |
* | --- |
* | "Added starter tracks: curated, goal-based stack presets for common product shapes." |
*
* @param {Changelogrelease20260612highlighttracks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlighttracks3 = /** @type {((inputs?: Changelogrelease20260612highlighttracks3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlighttracks3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Se añadieron rutas iniciales: presets de stack curados y orientados a objetivos para formas comunes de producto.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("加入入门路线：为常见产品形态准备的、按目标策划的 stack 预设。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スターター トラックを追加しました: 一般的な製品形状向けに厳選された目標ベースのスタック プリセット。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스타터 트랙 추가: 일반적인 제품 형태에 대해 선별된 목표 기반 스택 사전 설정.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("加入入門路線：為常見產品形態準備的、依目標規劃的 stack 預設。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Starter-Tracks hinzugefügt: kuratierte, zielbasierte Stapelvoreinstellungen für gängige Produktformen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ajout de pistes de démarrage : des préréglages de pile organisés et basés sur des objectifs pour les formes de produits courantes.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Додали starter tracks: підібрані пресети стеку під типові форми продуктів.")
	return /** @type {LocalizedString} */ ("Added starter tracks: curated, goal-based stack presets for common product shapes.")
});
export { changelogrelease20260612highlighttracks3 as "changelogRelease20260612HighlightTracks" }