import * as lodash from 'lodash';

import { KlArray } from "./KlArray";
import { KlAbstract } from "./KlAbstract";

export class KlString extends KlAbstract<string> {
	
	constructor(value: string) {
		super(value);
	}
	
	public removeSpaces(delimiter: string = '') {
		this.value = this.value.normalize('NFD').replace(/\s/g, delimiter);
		return this;
	}
	
	public split(delimiter: string = ',') {
		if (this.value.indexOf(delimiter) >= 0) {
			return new KlArray<string>(this.value.split(delimiter));
		} else {
			return new KlArray<string>(this.value.split(new RegExp(/\r\n|\r|\n/, 'gi')));
		}
	}
	
	public clear(delimiter: string = ' ') {
		this.value
		    .normalize('NFD')
		    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
		    .replace(/([^\w]+|\s+)/g, delimiter) // Substitui espaço e outros caracteres por hífen
		    .replace(/\-\-+/g, '-') // Substitui multiplos hífens por um único hífen
		    .replace(/(^-+|-+$)/, '');
		
		return this;
	}
	
	public toCamelCase() {
		this.value = lodash.camelCase(this.clear().getValue());
		return this;
	}
	
	public unmaskCoin() {
		this.value = Number(this.value
		                        .replace('R$', '')
		                        .replace(/\s(?=\s)/g, '')
		                        .replace(/[\n\r\t]/g, '')
		                        .replace(/[^0-9a-zA-Z\(,\@\-\!\#\\$\%\&\*\(\)\_\+\=\{\[\}\]\/\?\;\:\.\|)\.]+/g, '')
		                        .replace(/\./g, '')
		                        .replace(/,/g, '.'),
		).toFixed(2);
		
		return this;
	}
	
	public random(
		length: number,
		numbers: boolean,
		uppercase: boolean         = false,
		lowercase: boolean         = false,
		specialCharacters: boolean = false,
	) {
		const lmin = 'abcdefghijklmnopqrstuvwxyz';
		const lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const num = '1234567890';
		const simb = '@%_-#$%&*!';
		let result = '';
		let characters = '';
		
		if (lowercase) characters += lmin;
		if (uppercase) characters += lmai;
		if (numbers) characters += num;
		if (specialCharacters) characters += simb;
		
		const len = characters.length;
		for (let n = 1; n <= length; n++) {
			const rand = Math.floor(Math.random() * (len - 1 + 1)) + 1;
			result += characters[rand - 1];
		}
		
		this.value = result;
		return this;
	}
	
	public randomNumber(min: number, max: number) {
		if (min > max) {
			throw new Error('The min value cannot be greater than the max');
		}
		
		this.value = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
		
		return this;
	}
	
	public maskCpf() {
		this.value = this.leftPad(this.value.replace(/\D/g, ''), 11)
		                 .replace(/\D/g, '')
		                 .replace(/(\d{3})(\d)/, '$1.$2')
		                 .replace(/(\d{3})(\d)/, '$1.$2')
		                 .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		
		return this;
	}
	
	public nbl2br() {
		this.value.replace(new RegExp(/\r\n|\r|\n/, 'gi'), '<br/>');
		return this;
	}
	
	public utf8(decode = false) {
		if (decode) {
			this.value = this.utf8Decode(this.value);
		} else {
			this.value = this.utf8Encode(this.value);
		}
		return this;
	}
	
	private leftPad(value: string, totalWidth: number, paddingChar?: string) {
		const length = totalWidth - value.toString().length + 1;
		return Array(length).join(paddingChar || '0') + value;
	}
	
	private utf8Encode(argString: string) {
		if (argString === null || typeof argString === 'undefined') {
			return ''
		}
		
		let string = (argString + '')
		let utftext = ''
		let start
		let end
		let stringl = 0
		
		start = end = 0
		stringl = string.length
		for (let n = 0; n < stringl; n++) {
			let c1 = string.charCodeAt(n)
			let enc = null
			
			if (c1 < 128) {
				end++
			} else if (c1 > 127 && c1 < 2048) {
				enc = String.fromCharCode(
					(c1 >> 6) | 192, (c1 & 63) | 128
				)
			} else if ((c1 & 0xF800) !== 0xD800) {
				enc = String.fromCharCode(
					(c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
				)
			} else {
				// surrogate pairs
				if ((c1 & 0xFC00) !== 0xD800) {
					throw new RangeError('Unmatched trail surrogate at ' + n)
				}
				let c2 = string.charCodeAt(++n)
				if ((c2 & 0xFC00) !== 0xDC00) {
					throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
				}
				c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
				enc = String.fromCharCode(
					(c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
				)
			}
			if (enc !== null) {
				if (end > start) {
					utftext += string.slice(start, end)
				}
				utftext += enc
				start = end = n + 1
			}
		}
		
		if (end > start) {
			utftext += string.slice(start, stringl)
		}
		
		return utftext
	}
	
	private utf8Decode(strData: string) {
		let tmpArr = []
		let i = 0
		let c1 = 0
		let seqlen = 0
		
		strData += ''
		
		while (i < strData.length) {
			c1 = strData.charCodeAt(i) & 0xFF
			seqlen = 0
			
			// https://en.wikipedia.org/wiki/UTF-8#Codepage_layout
			if (c1 <= 0xBF) {
				c1 = (c1 & 0x7F)
				seqlen = 1
			} else if (c1 <= 0xDF) {
				c1 = (c1 & 0x1F)
				seqlen = 2
			} else if (c1 <= 0xEF) {
				c1 = (c1 & 0x0F)
				seqlen = 3
			} else {
				c1 = (c1 & 0x07)
				seqlen = 4
			}
			
			for (let ai = 1; ai < seqlen; ++ai) {
				c1 = ((c1 << 0x06) | (strData.charCodeAt(ai + i) & 0x3F))
			}
			
			if (seqlen === 4) {
				c1 -= 0x10000
				tmpArr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)))
				tmpArr.push(String.fromCharCode(0xDC00 | (c1 & 0x3FF)))
			} else {
				tmpArr.push(String.fromCharCode(c1))
			}
			
			i += seqlen
		}
		
		return tmpArr.join('')
	}
}
