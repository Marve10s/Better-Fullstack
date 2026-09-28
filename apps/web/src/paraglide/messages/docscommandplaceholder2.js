/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscommandplaceholder2Inputs */

const en_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type a command or search...`)
};

const es_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Escribe un comando o busca...`)
};

const zh_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入命令或搜索...`)
};

const ja_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンドを入力または検索...`)
};

const ko_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령을 입력하거나 검색...`)
};

const zh_hant1_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`輸入指令或搜尋...`)
};

const de_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl eingeben oder suchen...`)
};

const fr_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tapez une commande ou recherchez...`)
};

const uk_docscommandplaceholder2 = /** @type {(inputs: Docscommandplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Введіть команду або шукайте...`)
};

/**
* | output |
* | --- |
* | "Type a command or search..." |
*
* @param {Docscommandplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docscommandplaceholder2 = /** @type {((inputs?: Docscommandplaceholder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docscommandplaceholder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docscommandplaceholder2(inputs)
	if (locale === "zh") return zh_docscommandplaceholder2(inputs)
	if (locale === "ja") return ja_docscommandplaceholder2(inputs)
	if (locale === "ko") return ko_docscommandplaceholder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docscommandplaceholder2(inputs)
	if (locale === "de") return de_docscommandplaceholder2(inputs)
	if (locale === "fr") return fr_docscommandplaceholder2(inputs)
	if (locale === "uk") return uk_docscommandplaceholder2(inputs)
	return en_docscommandplaceholder2(inputs)
});
export { docscommandplaceholder2 as "docsCommandPlaceholder" }