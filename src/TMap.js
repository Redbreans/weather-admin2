export function TMap(key) {
	key="MXVBZ-B6FRU-FQRVO-4XPKO-5B2IV-7OFCG";
	return new Promise(function(resolve, reject) {
		window.init = function() {
			resolve(qq) //注意这里
		}
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://map.qq.com/api/js?v=2.exp&callback=init&key=" + key;
		script.onerror = reject;
		document.head.appendChild(script);
	})
}