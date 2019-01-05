(function () {
    var defProp = function (prop, value) {
        Object.defineProperty(window.navigator, prop, {
            get: function () {
                return value;
            }
        });
    };
	var bHO;
	try
	{	bHO = get_bHO(host_from_url(location.host));
	}
	catch (e)
	{
	}

	if (bHO)
	{
		for (var kString in bHO)
		{	defProp(kString, bHO[kString]);
		}
	}
}());
