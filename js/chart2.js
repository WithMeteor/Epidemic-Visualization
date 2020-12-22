var myChart2; //全局变量
var allDateList;
var thisMonth = 2;
var endMonth;

function sum(arr) {
	var s = 0;
	for (var i = arr.length - 1; i >= 0; i--) {
		s += arr[i];
	}
	return s;
}

function takeMonth(data, month) {
	var newList = [];
	for (var i = 0; i < allDateList.length; i += 1) {
		if (parseInt(allDateList[i].split('-')[1]) == month) {
			newList.push(data[i]);
		}
	}
	endMonth = parseInt(allDateList[allDateList.length - 1].split('-')[1]);
	return newList;
}

function draw_chart2(params, Data, flag) {
	console.log(flag);
	var DateList = [];
	var ConfList = [];
	var CureList = [];
	var DeadList = [];

	var titleName = '';
	for (var i = 0; i < Data['日期'].length; i += 1) {
		DateList.push('2020-' + Data['日期'][i]);
	}
	allDateList = DateList;

	if (flag == 0) {
		titleName = '全国';
		for (var i = 0; i < Data['中国']['确诊'].length; i += 1) {
			ConfList.push(sum(Data['中国']['确诊'][i]));
		}
		for (var i = 0; i < Data['中国']['治愈'].length; i += 1) {
			CureList.push(sum(Data['中国']['治愈'][i]));
		}
		for (var i = 0; i < Data['中国']['死亡'].length; i += 1) {
			DeadList.push(sum(Data['中国']['死亡'][i]));
		}
	} else if (flag == 1) {
		titleName = params;
		for (var i = 0; i < Data[params]['确诊'].length; i += 1) {
			ConfList.push(sum(Data[params]['确诊'][i]));
		}
		for (var i = 0; i < Data[params]['治愈'].length; i += 1) {
			CureList.push(sum(Data[params]['治愈'][i]));
		}
		for (var i = 0; i < Data[params]['死亡'].length; i += 1) {
			DeadList.push(sum(Data[params]['死亡'][i]));
		}
	} else if (flag == 2) {
		var Province = params.split('-')[0];
		var City = params.split('-')[1];
		var index = 0;
		titleName = City;
		for (var i = 0; i < Data[Province]['各市'].length; i += 1) {
			if (Data[Province]['各市'][i] == City) {
				index = i;
			}
		}
		for (var i = 0; i < Data[Province]['确诊'].length; i += 1) {
			ConfList.push(Data[Province]['确诊'][i][index]);
		}
		for (var i = 0; i < Data[Province]['治愈'].length; i += 1) {
			CureList.push(Data[Province]['治愈'][i][index]);
		}
		for (var i = 0; i < Data[Province]['死亡'].length; i += 1) {
			DeadList.push(Data[Province]['死亡'][i][index]);
		}
	}

	ConfList = takeMonth(ConfList, thisMonth);
	DeadList = takeMonth(DeadList, thisMonth);
	CureList = takeMonth(CureList, thisMonth);
	DateList = takeMonth(DateList, thisMonth);

	if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
		myChart2.dispose(); //销毁
	}
	myChart2 = echarts.init(document.getElementById('calendar-pie'), "dark");

	function getVirtulData() {
		var date = +echarts.number.parseDate(DateList[0]);
		var end = +echarts.number.parseDate(DateList[DateList.length - 1]);
		var dayTime = 3600 * 24 * 1000;
		var data = [];
		for (var time = date; time <= end; time += dayTime) {
			data.push([
				echarts.format.formatTime('yyyy-MM-dd', time), 0
			]);
		}
		return data;
	}

	var scatterData = getVirtulData();
	var cellSize = [80, 80];
	var Radius = 30;
	option2 = {
		title: {
			text: titleName + ' 每日新型冠状病毒病例',
			textStyle: {
				color: '#fff',
				fontSize: 28
			},
			x: 'center',
			top: '0',
		},
		toolbox: {
			show: true,
			right: 0,
			top: 20,
			orient: 'vertical',
			feature: {
				myTool1: { //自定义按钮,命名必须以my打头
					show: true, //是否显示    
					title: '上个月', //鼠标移动上去显示的文字    
					icon: 'image://img/left.png', //图标
					onclick: function() { //点击事件,这里的option1是chart的option信息
						if (thisMonth == 1){
							thisMonth = 2;
						} 
						thisMonth -= 1;
						draw_chart2(params, Data, flag);
					}
				},
				myTool2: { //自定义按钮,命名必须以my打头
					show: true, //是否显示    
					title: '下个月', //鼠标移动上去显示的文字    
					icon: 'image://img/right.png', //图标
					onclick: function() { //点击事件,这里的option1是chart的option信息    
						if (thisMonth == endMonth){
							thisMonth = endMonth - 1;
						} 
						thisMonth += 1;
						draw_chart2(params, Data, flag);
					}
				}
			}
		},
		calendar: {
			top: '60',
			left: 'center',
			orient: 'horizontal', //vertical
			cellSize: cellSize,
			yearLabel: {
				show: false,
				textStyle: {
					fontSize: 30
				}
			},
			dayLabel: {
				margin: 20,
				firstDay: 1,
				nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				color: '#ffffff'
			},
			monthLabel: {
				show: true,
				nameMap: 'cn',
				color: '#ffffff',
			},
			range: [DateList[0], DateList[DateList.length - 1]]
		},
		series: [{
			id: 'label',
			type: 'scatter',
			coordinateSystem: 'calendar',
			symbolSize: 1,
			label: {
				normal: {
					show: true,
					formatter: function(params) {
						return echarts.format.formatTime('dd', params.value[0]);
					},
					offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
					textStyle: {
						color: '#000',
						fontSize: 14
					}
				}
			},
			data: scatterData
		}]
	};

	function getPieSeries(scatterData, chart) {
		return echarts.util.map(scatterData, function(item, index) {
			var center = chart.convertToPixel('calendar', item);
			return {
				id: index + 'pie',
				type: 'pie',
				center: center,
				label: {
					normal: {
						formatter: '{c}',
						position: 'inside'
					}
				},
				radius: Radius,
				data: [{
						name: '死亡',
						value: DeadList[index] // Math.round(Math.random() * 24)
					},
					{
						name: '治愈',
						value: CureList[index]
					},
					{
						name: '确诊',
						value: ConfList[index]
					}
				]
			};
		});
	}

	function getPieSeriesUpdate(scatterData, chart) {
		return echarts.util.map(scatterData, function(item, index) {
			var center = chart.convertToPixel('calendar', item);
			return {
				id: index + 'pie',
				center: center
			};
		});
	}

	var pieInitialized;
	setTimeout(function() {
		pieInitialized = true;
		myChart2.setOption({
			series: getPieSeries(scatterData, myChart2),
			legend: {
				data: ['死亡', '治愈', '确诊', ],
				selected: {
					'死亡': true,
					'治愈': true,
					'确诊': false
				},
				bottom: '50%',
				right: 0,
				orient: 'vertical',
			},
		});
	}, 10);

	option2.onresize = function() {
		if (pieInitialized) {
			myChart2.setOption({
				series: getPieSeriesUpdate(scatterData, myChart2),
			});
		}
	};

	myChart2.setOption(option2);
}
