/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomepartialnote3Inputs */

const en_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const es_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Algunos requisitos pasaron de fallar a pasar. La celda muestra cuántos.`)
};

const zh_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`有部分需求从失败变为通过。格子里会显示数量。`)
};

const ja_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一部の要件が失敗から成功に変わりました。件数はセルに表示されます。`)
};

const ko_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`일부 요구사항이 실패에서 통과로 바뀌었습니다. 몇 개인지는 칸에 표시됩니다.`)
};

const zh_hant1_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`有部分需求從失敗變為通過。格子裡會顯示數量。`)
};

const de_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Einige Anforderungen sind von fehlgeschlagen auf bestanden gewechselt. Die Zelle zeigt, wie viele.`)
};

const fr_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Certaines exigences sont passées de l'échec à la réussite. La case indique combien.`)
};

const uk_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Частина вимог перейшла з провалу в успіх. Клітинка показує, скільки саме.`)
};

/**
* | output |
* | --- |
* | "Some requirements went from failing to passing. The cell shows how many." |
*
* @param {Fixproofoutcomepartialnote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomepartialnote3 = /** @type {((inputs?: Fixproofoutcomepartialnote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomepartialnote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomepartialnote3(inputs)
	if (locale === "zh") return zh_fixproofoutcomepartialnote3(inputs)
	if (locale === "ja") return ja_fixproofoutcomepartialnote3(inputs)
	if (locale === "ko") return ko_fixproofoutcomepartialnote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomepartialnote3(inputs)
	if (locale === "de") return de_fixproofoutcomepartialnote3(inputs)
	if (locale === "fr") return fr_fixproofoutcomepartialnote3(inputs)
	if (locale === "uk") return uk_fixproofoutcomepartialnote3(inputs)
	return en_fixproofoutcomepartialnote3(inputs)
});
export { fixproofoutcomepartialnote3 as "fixproofOutcomePartialNote" }