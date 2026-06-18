/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Sharetweettext2Inputs */

const en_sharetweettext2 = /** @type {(inputs: Sharetweettext2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Check out this tech stack I configured with Better Fullstack!

${i?.count} technologies selected

`)
};

const es_sharetweettext2 = /** @type {(inputs: Sharetweettext2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Mira este tech stack que configuré con Better Fullstack.

${i?.count} tecnologías seleccionadas

`)
};

const zh_sharetweettext2 = /** @type {(inputs: Sharetweettext2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`看看我用 Better Fullstack 配置的这个技术栈！

已选择 ${i?.count} 项技术

`)
};

const ja_sharetweettext2 = /** @type {(inputs: Sharetweettext2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Better Fullstack で構成したこの技術スタックをチェックしてください。

${i?.count} テクノロジーが選択されました`)
};

const ko_sharetweettext2 = /** @type {(inputs: Sharetweettext2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Better Fullstack로 구성한 이 기술 스택을 확인해 보세요!

${i?.count} 기술 선택됨`)
};

const zh_hant1_sharetweettext2 = /** @type {(inputs: Sharetweettext2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`看看我用 Better Fullstack 配置的這個技術堆疊！

已選擇 ${i?.count} 項技術`)
};

const de_sharetweettext2 = /** @type {(inputs: Sharetweettext2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Schauen Sie sich diesen Tech-Stack an, den ich mit Better Fullstack konfiguriert habe!

${i?.count} Technologien ausgewählt`)
};

const fr_sharetweettext2 = /** @type {(inputs: Sharetweettext2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Découvrez cette pile technologique que j'ai configurée avec Better Fullstack !

${i?.count} technologies sélectionnées`)
};

/**
* | output |
* | --- |
* | "Check out this tech stack I configured with Better Fullstack! {count} technologies selected" |
*
* @param {Sharetweettext2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const sharetweettext2 = /** @type {((inputs: Sharetweettext2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharetweettext2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharetweettext2(inputs)
	if (locale === "es") return es_sharetweettext2(inputs)
	if (locale === "zh") return zh_sharetweettext2(inputs)
	if (locale === "ja") return ja_sharetweettext2(inputs)
	if (locale === "ko") return ko_sharetweettext2(inputs)
	if (locale === "zh-Hant") return zh_hant1_sharetweettext2(inputs)
	if (locale === "de") return de_sharetweettext2(inputs)
	return fr_sharetweettext2(inputs)
});
export { sharetweettext2 as "shareTweetText" }