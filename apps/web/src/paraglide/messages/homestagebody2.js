/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestagebody2Inputs */



/**
* | output |
* | --- |
* | "Open a preset in the builder, swap any part, and copy one command. The builder flags parts that do not work together." |
*
* @param {Homestagebody2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestagebody2 = /** @type {((inputs?: Homestagebody2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestagebody2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abre un preset en el builder, cambia cualquier parte y copia un solo comando. El builder marca las partes que no funcionan juntas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在构建器中打开预设，替换任意部分，然后复制一条命令。构建器会标出无法搭配使用的部分。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルダーでプリセットを開き、好きな部分を入れ替えて、コマンドを1つコピーします。組み合わせられない部分はビルダーが知らせます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌더에서 프리셋을 열고 원하는 부분을 바꾼 뒤 명령어 하나를 복사하세요. 함께 쓸 수 없는 부분은 빌더가 알려줍니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在建構器中開啟預設，替換任意部分，然後複製一條指令。建構器會標出無法搭配使用的部分。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffne ein Preset im Builder, tausche beliebige Teile aus und kopiere einen Befehl. Der Builder markiert Teile, die nicht zusammenpassen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrez un preset dans le builder, changez n'importe quelle partie et copiez une seule commande. Le builder signale les parties qui ne fonctionnent pas ensemble.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрийте пресет у білдері, замініть будь-яку частину та скопіюйте одну команду. Білдер позначає частини, які не працюють разом.")
	return /** @type {LocalizedString} */ ("Open a preset in the builder, swap any part, and copy one command. The builder flags parts that do not work together.")
});
export { homestagebody2 as "homeStageBody" }