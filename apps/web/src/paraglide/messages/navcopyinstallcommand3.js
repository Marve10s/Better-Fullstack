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

/**
* | output |
* | --- |
* | "Copy install command" |
*
* @param {Navcopyinstallcommand3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navcopyinstallcommand3 = /** @type {((inputs?: Navcopyinstallcommand3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcopyinstallcommand3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcopyinstallcommand3(inputs)
	if (locale === "es") return es_navcopyinstallcommand3(inputs)
	return zh_navcopyinstallcommand3(inputs)
});
export { navcopyinstallcommand3 as "navCopyInstallCommand" }