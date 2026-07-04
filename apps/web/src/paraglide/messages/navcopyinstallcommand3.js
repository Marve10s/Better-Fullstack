/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcopyinstallcommand3Inputs */

const en_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy install command`)
};

const es_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar comando de instalación`)
};

const zh_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制安装命令`)
};

const ja_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`インストールコマンドのコピー`)
};

const ko_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`설치 명령 복사`)
};

const zh_hant1_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製安裝指令`)
};

const de_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installationsbefehl kopieren`)
};

const fr_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier la commande d'installation`)
};

const uk_navcopyinstallcommand3 = /** @type {(inputs: Navcopyinstallcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Копіювати команду встановлення`)
};

/**
* | output |
* | --- |
* | "Copy install command" |
*
* @param {Navcopyinstallcommand3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navcopyinstallcommand3 = /** @type {((inputs?: Navcopyinstallcommand3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcopyinstallcommand3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcopyinstallcommand3(inputs)
	if (locale === "es") return es_navcopyinstallcommand3(inputs)
	if (locale === "zh") return zh_navcopyinstallcommand3(inputs)
	if (locale === "ja") return ja_navcopyinstallcommand3(inputs)
	if (locale === "ko") return ko_navcopyinstallcommand3(inputs)
	if (locale === "zh-Hant") return zh_hant1_navcopyinstallcommand3(inputs)
	if (locale === "de") return de_navcopyinstallcommand3(inputs)
	if (locale === "fr") return fr_navcopyinstallcommand3(inputs)
	return uk_navcopyinstallcommand3(inputs)
});
export { navcopyinstallcommand3 as "navCopyInstallCommand" }