/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupworkspaceplatforms3Inputs */

const en_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace & Platforms`)
};

const es_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace y plataformas`)
};

const zh_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作区与平台`)
};

/**
* | output |
* | --- |
* | "Workspace & Platforms" |
*
* @param {Buildergroupworkspaceplatforms3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildergroupworkspaceplatforms3 = /** @type {((inputs?: Buildergroupworkspaceplatforms3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupworkspaceplatforms3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupworkspaceplatforms3(inputs)
	if (locale === "es") return es_buildergroupworkspaceplatforms3(inputs)
	return zh_buildergroupworkspaceplatforms3(inputs)
});
export { buildergroupworkspaceplatforms3 as "builderGroupWorkspacePlatforms" }