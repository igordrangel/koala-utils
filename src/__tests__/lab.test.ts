// import { koala } from "../index";
//
// jest.setTimeout(10000000);
// test('Lab', async () => {
// 	const text = `Recusada
//
//
// Recusa automatica - 28/10/2020 12:10:20
//
//
// - POLÍTICA DE CRÉDITO DEFINITIVA`;
// 	console.log(koala(text).string()
// 	                       .nbl2br()
// 	                       .normalize()
// 	                       .split('<br/>')
// 	                       .map((value, index) => {
// 	                       	if (index > 0) {
// 		                        if (value.indexOf('- ') === 0) {
// 			                        value = value.replace('- ', '');
// 		                        }
// 		                        return value;
// 	                        }
// 	                       	return '';
// 	                       })
// 	                       .clearEmptyValues()
// 	                       .toString(' - ')
// 	                       .getValue());
// 	expect(true).toBe(true);
// });
