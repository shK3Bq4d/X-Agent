(function () {
    var defProp = function (prop, value) {
		try
		{
			Object.defineProperty(window.navigator, prop, {
				get: function () {
					return value;
				},
				set: function() { console.log('shK3Bq4d/X-Agent Someone else tried to sed me');}
			});
		}
		catch (f)
		{	console.log('shK3Bq4d/X-Agent f', f);
		}
    };
	var bHO;
	try
	{	bHO = get_bHO(host_from_url(location.host));
	}
	catch (e)
	{	console.log('shK3Bq4d/X-Agent e', e);
	}

	if (bHO)
	{
		for (var kString in bHO)
		{	defProp(kString, bHO[kString]);
		}
	}
}());
