/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometotaloptions2Inputs */

const en_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`options across 7 ecosystems · ts · rn · rust · go · python · java · elixir`)
};

const es_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`opciones en 7 ecosistemas · ts · rn · rust · go · python · java · elixir`)
};

const zh_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7 个生态中的选项 · ts · rn · rust · go · python · java · elixir`)
};

/**
* | output |
* | --- |
* | "options across 7 ecosystems · ts · rn · rust · go · python · java · elixir" |
*
* @param {Hometotaloptions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometotaloptions2 = /** @type {((inputs?: Hometotaloptions2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotaloptions2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometotaloptions2(inputs)
	if (locale === "es") return es_hometotaloptions2(inputs)
	return zh_hometotaloptions2(inputs)
});
export { hometotaloptions2 as "homeTotalOptions" }