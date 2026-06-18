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

const ja_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7 つのエコシステムにわたるオプション · ts · rn · Rust · go · python · java · elixir`)
};

const ko_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7개 생태계에 걸친 옵션 · ts · rn · Rust · go · python · java · elixir`)
};

const zh_hant1_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7 個生態中的選項 · ts · rn · rust · go · python · java · elixir`)
};

const de_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optionen in 7 Ökosystemen · ts · rn · rust · go · python · java · elixir`)
};

const fr_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`options dans 7 écosystèmes · ts · rn · rouille · go · python · java · élixir`)
};

/**
* | output |
* | --- |
* | "options across 7 ecosystems · ts · rn · rust · go · python · java · elixir" |
*
* @param {Hometotaloptions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometotaloptions2 = /** @type {((inputs?: Hometotaloptions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotaloptions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometotaloptions2(inputs)
	if (locale === "es") return es_hometotaloptions2(inputs)
	if (locale === "zh") return zh_hometotaloptions2(inputs)
	if (locale === "ja") return ja_hometotaloptions2(inputs)
	if (locale === "ko") return ko_hometotaloptions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometotaloptions2(inputs)
	if (locale === "de") return de_hometotaloptions2(inputs)
	return fr_hometotaloptions2(inputs)
});
export { hometotaloptions2 as "homeTotalOptions" }