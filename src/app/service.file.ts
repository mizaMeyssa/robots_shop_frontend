import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

	private isIE() {
		let userAgent = navigator.userAgent;
	    return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
	}

	private default_callback(content) {
		var text = "";
		content.map(function(item) {
			Object.keys(item).forEach(function(key){
				if ( key !== 'links') {
					text += key + ' : ' + item[key] + "\n";
				}
			});
			text += "\n\n";
		});
		return text;
	}

	public exportFileTxt(content, formatter_callback) {
		formatter_callback = formatter_callback || this.default_callback;
		let formattedData = formatter_callback(content);
		if (!this.isIE()) {
          let blobdata = new Blob([formattedData],{type : 'text/plain'});
          let link = document.createElement('a');
          link.setAttribute('id', 'exportGrid');
          link.setAttribute('href', window.URL.createObjectURL(blobdata));
          link.setAttribute('download', 'robotsList' + '.txt');
          window.document.body.appendChild(link);
          link.click();
        } else {
          let blob = new Blob([formattedData], {
            type: 'text/plain'
          });
          window.navigator.msSaveBlob(blob, 'robotsList.txt');
        }
	}

}