import fetch from "node-fetch";
import { KlAbstract } from "./KlAbstract";

interface KlRequestResponse<TypeResponse> {
	statusCode: number;
	data: TypeResponse;
}

export class KlRequest extends KlAbstract<string> {
	private headers?: any = undefined;
	
	constructor(urlBase: string) {
		super(urlBase);
	}
	
	public defineHeaders(headers: any) {
		this.headers = headers;
		return this;
	}
	
	public get<TypeResponse>(url: string, params: any) {
		return this.request<TypeResponse>('GET', url, params);
	}
	
	public post<TypeResponse>(url: string, data: any, formUrlEncoded = false) {
		return this.request<TypeResponse>('POST', url, data, formUrlEncoded);
	}
	
	public put<TypeResponse>(url: string, data: any) {
		return this.request<TypeResponse>('PUT', url, data);
	}
	
	public delete<TypeResponse>(url: string, data?: any) {
		return this.request<TypeResponse>('DELETE', url, data);
	}
	
	private request<TypeResponse>(type: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data: any, formUrlEncoded = false) {
		return new Promise<KlRequestResponse<TypeResponse>>((resolve, reject) => {
			let params = '';
			let body = undefined;
			switch (type) {
				case "GET":
					params = this.getParams(data).toString();
					break;
				case "POST":
				case "PUT":
				case "DELETE":
					body = (formUrlEncoded ? this.getFormUrlEncoded(data) : data);
					break;
			}
			
			fetch(this.value + url + (params ? '?' + params : ''), {
				method: type,
				headers: this.headers,
				body
			}).then(async response => {
				const data = await response.json();
				if (response.status === 200) {
					resolve({
						statusCode: response.status,
						data
					});
				} else {
					reject(response);
				}
			}).catch(async e => {
				reject(e);
			});
		});
	}
	
	private getParams(data: any) {
		const params = new URLSearchParams();
		Object.keys(data).forEach(indexName => {
			params.append(indexName, data[indexName]);
		});
		
		return params;
	}
	
	private getFormUrlEncoded(data: any) {
		let result = '';
		Object.keys(data).forEach(indexName => {
			if (!result) {
				result = `${indexName}=${data[indexName]}`;
			} else {
				result += `&${indexName}=${data[indexName]}`
			}
		});
		
		return result;
	}
}