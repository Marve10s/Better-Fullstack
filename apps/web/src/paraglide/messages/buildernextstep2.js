/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernextstep2Inputs */

const en_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next step`)
};

const es_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Siguiente paso`)
};

const zh_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

const ja_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`次のステップ`)
};

const ko_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다음 단계`)
};

const zh_hant1_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

const de_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nächster Schritt`)
};

const fr_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Étape suivante`)
};

/**
* | output |
* | --- |
* | "Next step" |
*
* @param {Buildernextstep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildernextstep2 = /** @type {((inputs?: Buildernextstep2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernextstep2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernextstep2(inputs)
	if (locale === "es") return es_buildernextstep2(inputs)
	if (locale === "zh") return zh_buildernextstep2(inputs)
	if (locale === "ja") return ja_buildernextstep2(inputs)
	if (locale === "ko") return ko_buildernextstep2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernextstep2(inputs)
	if (locale === "de") return de_buildernextstep2(inputs)
	return fr_buildernextstep2(inputs)
});
export { buildernextstep2 as "builderNextStep" }