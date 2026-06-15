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

/**
* | output |
* | --- |
* | "Check out this tech stack I configured with Better Fullstack! {count} technologies selected" |
*
* @param {Sharetweettext2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sharetweettext2 = /** @type {((inputs: Sharetweettext2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharetweettext2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharetweettext2(inputs)
	if (locale === "es") return es_sharetweettext2(inputs)
	return zh_sharetweettext2(inputs)
});
export { sharetweettext2 as "shareTweetText" }