var xinm = new Array();
xinm[0] = "白金香"
xinm[1] = "白应梅"
xinm[2] = "柏仁燕"
xinm[3] = "包颜琳"
xinm[4] = "鲍学梅"
xinm[5] = "鲍  颖"
xinm[6] = "Boss"
xinm[7] = "蔡  艳"
xinm[8] = "蔡  玉"
xinm[9] = "曹发敏"

var phone = new Array();
phone[0] = "13800138001"
phone[1] = "13800138002"
phone[2] = "13800138003"
phone[3] = "13800138004"
phone[4] = "13800138005"
phone[5] = "13800138006"
phone[6] = "13800138007"
phone[7] = "13800138008"
phone[8] = "13800138009"
phone[9] = "13800138010"

var nametxt = $('.name');
var phonetxt = $('.phone');
var pcount = xinm.length-1;//参加人数
var runing = true;
var td = 10;//内定中奖,从最小奖开始，共10个名额
var num = 0;
var t;
//开始停止
function start() {
	if (runing) {
		runing = false;
		$('#btntxt').removeClass('start').addClass('stop');
		$('#btntxt').html('停止');
		startNum()
	} else {
		runing = true;
		$('#btntxt').removeClass('stop').addClass('start');
		$('#btntxt').html('开始');
		stop();
		zd();//内定中奖
	}
}
//循环参加名单
function startNum() {
	num = Math.floor(Math.random() * pcount);
	nametxt.html(xinm[num]);
	phonetxt.html(phone[num]);
	t = setTimeout(startNum, 0);
}
//停止跳动
function stop() {
	pcount = xinm.length-1;
	clearInterval(t);
	t = 0;
}
//从一等奖开始指定前3名
function zd() {
	if(td <= 3){
		if (td == 1) {
			nametxt.html('张三');
			phonetxt.html('15112345678');
			$('.list').prepend("<p>"+td+' '+"张三 -- 15112345678</p>");
		}
		if (td == 2) {
			nametxt.html('李四');
			phonetxt.html('151000000000');
			$('.list').prepend("<p>"+td+' '+"李四 -- 151000000000</p>");
		}
		if (td == 3) {
			nametxt.html('王五');
			phonetxt.html('1511111111');
			$('.list').prepend("<p>"+td+' '+"王五 -- 1511111111</p>");
		}
	}else if(td > 3){
		//打印中奖者名单

		$('.list').prepend("<p>"+td+' '+xinm[num]+" -- "+phone[num]+"</p>");
		if(pcount <= 0){
			alert("投票结束");
		}
		//将已中奖者从数组中"删除",防止二次中奖
		xinm.splice($.inArray(xinm[num], xinm), 1);
		phone.splice($.inArray(phone[num], phone), 1);
	}
	td = td - 1;
}
