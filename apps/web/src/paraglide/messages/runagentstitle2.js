/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runagentstitle2Inputs */

const en_runagentstitle2 = /** @type {(inputs: Runagentstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bring any agent`)
};

const es_runagentstitle2 = /** @type {(inputs: Runagentstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Traiga cualquier agente`)
};

const zh_runagentstitle2 = /** @type {(inputs: Runagentstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`带上任何代理人`)
};

const ja_runagentstitle2 = /** @type {(inputs: Runagentstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントを連れてくる`)
};

const ko_runagentstitle2 = /** @type {(inputs: Runagentstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`어떤 에이전트든 데려오세요`)
};

const zh_hant1_runagentstitle2 = /** @type {(inputs: Runagentstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`帶上任何代理人`)
};

const de_runagentstitle2 = /** @type {(inputs: Runagentstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bringen Sie jeden beliebigen Agenten mit.`)
};

const fr_runagentstitle2 = /** @type {(inputs: Runagentstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Amenez n'importe quel agent`)
};

/**
* | output |
* | --- |
* | "Bring any agent" |
*
* @param {Runagentstitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runagentstitle2 = /** @type {((inputs?: Runagentstitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runagentstitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runagentstitle2(inputs)
	if (locale === "es") return es_runagentstitle2(inputs)
	if (locale === "zh") return zh_runagentstitle2(inputs)
	if (locale === "ja") return ja_runagentstitle2(inputs)
	if (locale === "ko") return ko_runagentstitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runagentstitle2(inputs)
	if (locale === "de") return de_runagentstitle2(inputs)
	return fr_runagentstitle2(inputs)
});
export { runagentstitle2 as "runAgentsTitle" }