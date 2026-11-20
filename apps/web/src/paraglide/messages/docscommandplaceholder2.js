/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscommandplaceholder2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Escribe un comando o busca...")
	if (locale === "zh") return /** @type {LocalizedString} */ ("输入命令或搜索...")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コマンドを入力または検索...")
	if (locale === "ko") return /** @type {LocalizedString} */ ("명령을 입력하거나 검색...")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("輸入指令或搜尋...")
	if (locale === "de") return /** @type {LocalizedString} */ ("Befehl eingeben oder suchen...")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Tapez une commande ou recherchez...")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Введіть команду або шукайте...")
	return /** @type {LocalizedString} */ ("Type a command or search...")
});
export { docscommandplaceholder2 as "docsCommandPlaceholder" }