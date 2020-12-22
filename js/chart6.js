var myChart6; //全局变量

function draw_chart6(params, Data, flag) {

	var title = '武汉市确诊人数预测曲线';


	if (myChart6 != null && myChart6 != "" && myChart6 != undefined) {
		myChart6.dispose(); //销毁
	}
	myChart6 = echarts.init(document.getElementById('predict-line'), "dark");

	$.ajax({ //Ajax获取数据后,必须在{}中处理数据
		type: 'get',
		url: 'data/predict.json', //'data/province_today_data.json'
		dataType: "json",
		success: function(data) {
			// 基础设置
			var option6 = {

				title: {
					text: title,
					left: 'center',
					top: '3%',
					textStyle: {
						fontSize: 25,
						color: '#fff'
					}
				},
				legend: {
					data: ['预测', '实际'],
					top: 20,
					left: 10
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				animation: false,
				grid: {
					top: 70,
					left: 60,
					right: 80,
					bottom: 50
				},
				xAxis: {
					name: '天数\n(距离起始\n1月10日)',
					minorTick: {
						show: true
					},
					splitLine: {
						lineStyle: {
							color: '#999'
						}
					},
					minorSplitLine: {
						show: true,
						lineStyle: {
							color: '#ddd'
						}
					}
				},
				yAxis: {
					name: '人数(人)',
					minorTick: {
						show: true
					},
					splitLine: {
						lineStyle: {
							color: '#999'
						}
					},
					minorSplitLine: {
						show: true,
						lineStyle: {
							color: '#ddd'
						}
					}
				},
				dataZoom: [{
					show: true,
					type: 'inside',
					filterMode: 'none',
					xAxisIndex: [0],
				}, {
					show: true,
					type: 'inside',
					filterMode: 'none',
					yAxisIndex: [0],
				}],
				series: [{
					name: '实际',
					type: 'scatter',
					data: data.reality
				}, {
					name: '预测',
					type: 'line',
					showSymbol: false,
					clip: true,
					lineStyle: {
						width: 4,
					},
					data: data.predict
				}]

			};

			myChart6.setOption(option6);
		}
	});
}
