function YT(pl,sn,s1,s2,s3,s4,s5,gr,sCB,pCB){this.player=pl;this.embed=pl.getElementsByTagName("embed")[0]||null;this.stream=streamInit(sn,s1,s2,s3,s4,s5,gr);this.streamOld=new estat_Object();this.stateCallback=sCB||"";this.positionCallback=pCB||"";this.playStates=new estat_Object();this.canAttachEvent=false;this.playStates['-1']=1;this.playStates['1']=5;this.playStates['2']=7;this.playStates['3']=2;this.playStates['0']=12;this.playStates['5']=7;this.eStatPlayState=function(state){return this.playStates[state];};this.polling_interval_setter=function(){var _this=this;poll=function(){eStat_ms.playerChange(_this.player,"polling",null,null);};window.setInterval(poll,60*1000);};this.initialize=function(){var _this=this;this.stream['cmsPL']='YT';window.setTimeout(function(){eStat_ms.playerChange(pl,"polling",null,null);},10*1000);window.setTimeout(function(){eStat_ms.playerChange(pl,"polling",null,null);},20*1000);window.setTimeout(function(){eStat_ms.playerChange(pl,"polling",null,null);},40*1000);this.polling_interval_setter();};this.setStatus=function(status){this.stream['cmsOS']=this.stream['cmsPS'];this.stream['cmsPS']=this.eStatPlayState(status);this.stream['cmsST']=status;eStat_ms.playerChange(this.player,"state",null,null);};this.update=function(){eStat_er.reset();try{if(this.player.isMuted())this.stream['cmsSD']=0;else this.stream['cmsSD']=this.player.getVolume();this.stream['cmsME']=encodeURIComponent(this.player.getVideoUrl());this.stream['cmsPO']=(this.player.getCurrentTime()<0)?0:this.player.getCurrentTime();this.stream['cmsDU']=this.player.getDuration();this.stream['cmsPS']=this.eStatPlayState(this.player.getPlayerState());this.stream['cmsST']=this.player.getPlayerState();if(this.stream['cmsME'].indexOf("&version=")!=-1){var v=this.stream['cmsME'].substring(this.stream['cmsME'].indexOf("&version=")+("&version=").length,this.stream['cmsME'].length);this.stream['cmsPV']=encodeURIComponent(((v.indexOf("&")==-1)?v:v.substring(0,v.indexOf("&"))));}else this.stream['cmsPV']="";this.stream['cmsOE']=this.player.tagName;}catch(e){;}this.stream['cmsOP']=this.stream['cmsPO'];}};YT.Detect=function(pl){try{pl.getAvailableQualityLevels();}catch(e){try{pl.getElementsByTagName("embed")[0].getAvailableQualityLevels();}catch(e){throw"NoYT";}}};function eStat_YoutubeOnStateChange(i){try{eStat_ms.tabYTplayers[i].addEventListener("onStateChange","eStat_ms.tabYTplayers["+i+"].Obj.setStatus");}catch(e){try{eStat_ms.tabYTplayers[i].getElementsByTagName("embed")[0].addEventListener("onStateChange",("eStat_ms.tabYTplayers["+i+"].Obj.setStatus"));}catch(e){}}};