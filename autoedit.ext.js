
infrajs.autoeditInit=function(){
	infrajs.externalAdd('autoedittpl',function(now,ext,layer,external,i){
		if(layer[i.replace(/tpl$/,'')])return;
		if(layer[i])return;
		if(!now)now=ext;
		return now;
	});
	(async () => {
		let Load = (await import('/vendor/akiyatkin/load/Load.js')).default
		let CDN = await Load.on('import-default', '/vendor/akiyatkin/load/CDN.js')
		await CDN.js('jquery')
		
		$(document).bind('keydown',function(event){
			if (event.keyCode == 113){
				//infra.loader.show();
				infra.require('-autoedit/autoedit.js');
				AUTOEDIT('admin');
			}
		});
	})()
}
infrajs.autoeditLink = async () => { //infrajs onshow
	let Load = (await import('/vendor/akiyatkin/load/Load.js')).default
	let CDN = await Load.on('import-default', '/vendor/akiyatkin/load/CDN.js')
	await CDN.js('jquery')
	$('.showAdmin[showAdmin!=true]').attr('nohref','1').attr('showAdmin','true').click(function(){
		infra.loader.show();
		infra.require('-autoedit/autoedit.js');
		AUTOEDIT('admin');
		return false;
	});
}
infrajs.autoedit_SaveOpenedWin=function(){
	if(!window.sessionStorage)return;
	if(!window.AUTOEDIT)return;	
	for(var i in window.AUTOEDIT.popups){
		var layer=window.AUTOEDIT.popups[i];
		if(!layer.showed)continue;
		infrajs.popup_memorize('infra.require("-autoedit/autoedit.js");AUTOEDIT("'+layer.config.type+'","'+layer.config.id+'");');
	}
}


Event.one('Controller.oninit',function(){
	//autoedit
	if (Access.admin()) infra.theme.prefix = 'infrajs=a&-nostore=true';//fix mod security

	infrajs.autoeditInit();	
});

Event.handler('Controller.onshow',function(){
	//autoedit
	infrajs.autoeditLink();
});
Event.handler('Controller.onshow',function(){
	//autoedit
	if(!window.AUTOEDIT)return;
	if(!AUTOEDIT.active)return;
	if(!infra.admin())return;
	AUTOEDIT.setHandlers();
});
Event.handler('Controller.onshow',function(){
	//autoedit
	infrajs.autoedit_SaveOpenedWin();
});
