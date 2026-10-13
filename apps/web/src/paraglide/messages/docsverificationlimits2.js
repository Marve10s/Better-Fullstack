/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationlimits2Inputs */

const en_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runtime verification applies only to the recorded boundaries and limitations above. It does not prove behavior outside those assertions.`)
};

const es_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La verificación en tiempo de ejecución solo se aplica a los límites y restricciones registrados arriba. No demuestra el comportamiento fuera de esas aserciones.`)
};

const zh_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行时验证仅适用于上方记录的边界和局限，无法证明这些断言之外的行为。`)
};

const ja_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランタイム検証は、上記に記録された境界と制約にのみ適用されます。これらのアサーション以外の動作は証明しません。`)
};

const ko_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`런타임 검증은 위에 기록된 경계와 제약에만 적용됩니다. 해당 어서션 밖의 동작은 증명하지 않습니다.`)
};

const zh_hant1_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行階段驗證只適用於上方記錄的邊界與限制，無法證明這些斷言以外的行為。`)
};

const de_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die Laufzeitverifizierung gilt nur für die oben erfassten Grenzen und Einschränkungen. Verhalten außerhalb dieser Prüfungen belegt sie nicht.`)
};

const fr_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La vérification à l'exécution ne s'applique qu'aux frontières et limites enregistrées ci-dessus. Elle ne prouve aucun comportement en dehors de ces assertions.`)
};

const uk_docsverificationlimits2 = /** @type {(inputs: Docsverificationlimits2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевірка під час виконання стосується лише зафіксованих вище меж і обмежень. Вона не доводить поведінки поза цими перевірками.`)
};

/**
* | output |
* | --- |
* | "Runtime verification applies only to the recorded boundaries and limitations above. It does not prove behavior outside those assertions." |
*
* @param {Docsverificationlimits2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationlimits2 = /** @type {((inputs?: Docsverificationlimits2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationlimits2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationlimits2(inputs)
	if (locale === "zh") return zh_docsverificationlimits2(inputs)
	if (locale === "ja") return ja_docsverificationlimits2(inputs)
	if (locale === "ko") return ko_docsverificationlimits2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationlimits2(inputs)
	if (locale === "de") return de_docsverificationlimits2(inputs)
	if (locale === "fr") return fr_docsverificationlimits2(inputs)
	if (locale === "uk") return uk_docsverificationlimits2(inputs)
	return en_docsverificationlimits2(inputs)
});
export { docsverificationlimits2 as "docsVerificationLimits" }