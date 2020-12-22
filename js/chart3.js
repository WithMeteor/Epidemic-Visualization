var myChart3; //全局变量

function draw_chart3(params, Data, flag) {

	var scatterData = [];
	var titleName = '';

	if (flag == 0) {
		var dateLength = Data['日期'].length;
		for (var i = 0; i < Data['中国']['各省'].length; i += 1) {
			var provinceList = [];
			var provinceName = Data['中国']['各省'][i];
			var deadRate = Data['中国']['死亡'][dateLength - 1][i] / Data['中国']['确诊'][dateLength - 1][i];
			var cureRate = Data['中国']['治愈'][dateLength - 1][i] / Data['中国']['确诊'][dateLength - 1][i];
			var confNum = Data['中国']['确诊'][dateLength - 1][i];
			provinceList.push(deadRate.toFixed(4));
			provinceList.push(cureRate.toFixed(4));
			provinceList.push(confNum);
			provinceList.push(provinceName);
			scatterData.push(provinceList);
			titleName = '全国';
		}
	}
	
	else if (flag == 1) {
		var dateLength = Data['日期'].length;
		for (var i = 0; i < Data[params]['各市'].length; i += 1) {
			var cityList = [];
			var cityName = Data[params]['各市'][i];
			var deadRate = Data[params]['死亡'][dateLength - 1][i] / Data[params]['确诊'][dateLength - 1][i];
			var cureRate = Data[params]['治愈'][dateLength - 1][i] / Data[params]['确诊'][dateLength - 1][i];
			var confNum = Data[params]['确诊'][dateLength - 1][i];
			cityList.push(deadRate.toFixed(4));
			cityList.push(cureRate.toFixed(4));
			cityList.push(confNum);
			cityList.push(cityName);
			scatterData.push(cityList);
			titleName = params;
		}
	}

	var schema = [{
			name: '致死率',
			index: 0,
			text: '实时统计致死率'
		},
		{
			name: '治愈率',
			index: 1,
			text: '实时统计治愈率'
		},
		{
			name: '确诊人数',
			index: 2,
			text: '实时统计确诊人数'
		}
	];


	var itemStyle = {
		opacity: 0.8,
		shadowBlur: 10,
		shadowOffsetX: 0,
		shadowOffsetY: 0,
		shadowColor: 'rgba(0, 0, 0, 0.5)'
	};

	if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
		myChart3.dispose(); //销毁
	}
	myChart3 = echarts.init(document.getElementById('scatter-color'), "dark");

	option3 = {
		title: {
			text: titleName + ' 新型冠状病毒治愈率/致死率',
			textStyle: {
				color: '#fff',
				fontSize: 28
			},
			x: 'center',
			top: '7%',
		},
		
		grid: {
			left: '10%',
			right: '18%',
			bottom: '10%',
			top: '18%',
		},
		tooltip: {
			padding: 10,
			borderColor: '#777',
			borderWidth: 1,
			formatter: function(obj) {
				var value = obj.value;
				return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
					value[3] + '肺炎情况：' +
					'</div>' +
					schema[2].text + '：' + value[2] + '<br>' +
					schema[0].text + '：' + value[0] + '<br>' +
					schema[1].text + '：' + value[1] + '<br>';
			}
		},
		xAxis: {
			type: 'value',
			name: '致死率',
			nameGap: 20,
			nameTextStyle: {
				color: '#fff',
				fontSize: 16
			},
			axisLine: {
				lineStyle: {
					color: '#eee'
				}
			},
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			name: '治愈率',
			nameLocation: 'end',
			nameGap: 20,
			nameTextStyle: {
				color: '#fff',
				fontSize: 16
			},
			axisLine: {
				lineStyle: {
					color: '#eee'
				}
			},
			splitLine: {
				show: false
			}
		},
		visualMap: [{
			type: 'piecewise',
			left: 'right',
			bottom: '20%',
			dimension: 2,

			text: ['明暗：确诊人数'],
			textGap: 30,
			textStyle: {
				color: '#fff'
			},
			pieces: [{
				min: 5000,
				label: "> 5000 人",
				color: "#7f1100"
			}, {
				min: 1000,
				max: 5000,
				label: "1000 - 4999 人",
				color: "#ff5428"
			}, {
				min: 500,
				max: 1000,
				label: "500 - 999 人",
				color: "#ff8c71"
			}, {
				min: 100,
				max: 500,
				label: "100 - 499 人",
				color: "#ffd768"
			}, {
				min: 0,
				max: 100,
				label: "1 - 99 人",
				color: "#ffefd5"
			}, {
				value: 0,
				color: "#ffffff"
			}],
			showLabel: true,
		}],
		series: [{
			name: '散点',
			type: 'scatter',
			itemStyle: itemStyle,
			symbolSize: 30,
			data: scatterData
		}]
	};

	myChart3.setOption(option3);

}
