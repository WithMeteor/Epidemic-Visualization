var myChart4; //全局变量

function compare(property) {
	return function(a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	}
}

// 排行颜色
var colorListMapping = {
	'四川': '#FF0000',
	'山东': '#FF4040',
	'浙江': '#FF7373',
	'上海': '#A60000',
	'北京': '#FF7400',
	'江苏': '#FF9640',
	'西藏': '#A64B00',
	'湖北': '#FFA900',
	'河北': '#FFBE40',
	'台湾': '#FFCF73',
	'福建': '#A66E00',
	'青海': '#FFD200',
	'广西': '#FFDD40',
	'陕西': '#FFE673',
	'云南': '#A68800',
	'江西': '#FFFC00',
	'天津': '#FFFD40',
	'重庆': '#FFFD73',
	'山西': '#A6A400',
	'辽宁': '#78E700',
	'贵州': '#9BF33D',
	'甘肃': '#B3F36D',
	'海南': '#4E9600',
	'吉林': '#009999',
	'宁夏': '#33CCCC',
	'新疆': '#5CCCCC',
	'河南': '#408DD2',
	'广东': '#E969A8',
	'香港': '#514ED9',
	'澳门': '#7573D9',
	'湖南': '#0C5DA5',
	'安徽': '#A600A6',
	'内蒙古': '#FFB273',
	'黑龙江': '#D2006B',
};

var provinces = [];
for (var key in colorListMapping) {
	provinces.push(key)
}

function draw_chart4(params, Data, flag) {

	var title = '新增确诊动态变化';
	var playInterval = 2000;

	var rankData = [];
	var colorMap = {};

	if (flag == 0) {
		title = '全国 ' + title;
		for (var i = 0; i < Data['日期'].length - 1; i += 1) {
			var dateDict = {};
			var dataList = [];
			dateDict['date'] = Data['日期'][i];
			if (i == 0) {
				for (var n = 0; n < Data['中国']['各省'].length; n += 1) {
					dataList.push({
						"name": Data['中国']['各省'][n],
						"value": Data['中国']['确诊'][i][n]
					});
				}
			} else {
				for (var n = 0; n < Data['中国']['各省'].length; n += 1) {
					dataList.push({
						"name": Data['中国']['各省'][n],
						"value": Data['中国']['确诊'][i][n] - Data['中国']['确诊'][i - 1][n]
					});
				}
			}
			dateDict['data'] = dataList;
			rankData.push(dateDict);
		}

		for (var i = 0; i < Data['日期'].length - 1; i += 1) {
			rankData[i].data.sort(compare('value'));
		}

		for (var i = 0; i < provinces.length; i += 1) {
			colorMap[provinces[i]] = provinces[i];
		}
	} else if (flag == 1) {
		title = params + ' ' + title;
		for (var i = 0; i < Data['日期'].length - 1; i += 1) {
			var dateDict = {};
			var dataList = [];
			dateDict['date'] = '2020-' + Data['日期'][i];
			if (i == 0) {
				for (var n = 0; n < Data[params]['各市'].length; n += 1) {
					dataList.push({
						"name": Data[params]['各市'][n],
						"value": Data[params]['确诊'][i][n]
					});
				}
			} else {
				for (var n = 0; n < Data[params]['各市'].length; n += 1) {
					dataList.push({
						"name": Data[params]['各市'][n],
						"value": Data[params]['确诊'][i][n] - Data[params]['确诊'][i - 1][n]
					});
				}
			}
			dateDict['data'] = dataList;
			rankData.push(dateDict);
		}

		for (var i = 0; i < Data['日期'].length - 1; i += 1) {
			rankData[i].data.sort(compare('value'));
		}

		for (var i = 0; i < Data[params]['各市'].length; i += 1) {
			colorMap[Data[params]['各市'][i]] = provinces[i];
		}

	}

	if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
		myChart4.dispose(); //销毁
	}
	myChart4 = echarts.init(document.getElementById('dynamic-bar'), "dark");

	// 基础设置
	var option4 = {
		baseOption: {
			animationDurationUpdate: playInterval * 0.8,
			animationEasingUpdate: 'quinticInOut',
			timeline: {
				show: false,
				axisType: 'category',
				orient: 'vertical',
				autoPlay: true,
				loop: false,
				playInterval: playInterval,
				left: null,
				right: 300,
				top: 330,
				bottom: 100,
				height: null,
				label: {
					normal: {
						show: true,
						interval: 0
					}
				},
				symbol: 'none',
				lineStyle: {
					color: '#ccc',
					show: false
				},
				checkpointStyle: {
					symbol: 'none',
					color: '#bbb',
					borderColor: '#777',
					show: false,
					borderWidth: 1
				},
				controlStyle: {
					showNextBtn: false,
					showPrevBtn: false,
					normal: {
						color: '#666',
						show: false,
						borderColor: '#666'
					},
					emphasis: {
						color: '#aaa',
						borderColor: '#aaa'
					}
				},
				data: rankData.map(function(ele) {
					return ele.date
				})
			},
			title: [{
				left: 'center',
				top: '0%',
				textStyle: {
					fontSize: 25,
					color: '#fff'
				}
			}, {
				left: 'center',
				top: '5%'
			}],
			toolbox: {
				show: true,
				feature: {
					restore: {},
				},
				left: '0%',
				top: '0%',
			},
			grid: [{
				left: '20%',
				right: '20%',
				top: '7%',
				height: 'auto',
				bottom: '-20%'
			}],
			xAxis: [{

			}],
			yAxis: [{

			}],
			series: [{
				id: 'bar',
				type: 'bar',
				barWidth: '10',
				tooltip: {
					show: false
				},
				label: {
					normal: {
						show: true,
						position: 'right'
					}
				},
				data: []
			}]
		},
		options: []
	};

	// var xMaxInterval = 5;
	for (var i = 0; i < rankData.length; i++) {

		var markPoint = {};
		var dataLength = rankData[i]['data'].length;
		var pointList = [];

		for (var n = 0; n < dataLength; n++) {
			if (rankData[i]['data'][n].value > 300) {
				var overFlowValue = rankData[i].data[n].value;
				var overFlowName = rankData[i].data[n].name;
				pointList.push({
					name: overFlowName,
					value: overFlowValue,
					xAxis: 300,
					yAxis: n
				});
				markPoint = {
					symbolRotate: '270',
					itemStyle: {
						color: '#FF0000',
					},
					data: pointList
				};
			}
		}

		option4.options.push({
			title: {
				text: title + ' ' + rankData[i].date,
				color: '#bfbfbf'
			},
			xAxis: [{
				max: 300,
				show: true,
				type: 'value',
				axisTick: {
					show: false
				},
				axisLabel: {
					show: true,
					color: '#fff',
					formatter: function(value, index) {
						// 空一格显示一次坐标值
						if (index % 2 === 0) {
							return String(value)
						} else {
							return '';
						}
					},
					textStyle: {
						color: '#fff'
					}
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: 'rgba(121,121,121,0.3)'
					}
				},
				splitLine: {
					show: true, // true
					lineStyle: {
						color: ['rgba(121,121,121,0.3)', 'rgba(121,121,121,0)']
					}
				}
			}],
			yAxis: [{
				type: 'category',
				axisTick: {
					show: false
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(121,121,121,0.3)'
					}
				},
				axisLabel: {
					show: false,
					textStyle: {}
				},
				data: rankData[i].data.map(function(ele) {
					return ele.name
				})
			}],
			series: [{
				id: 'bar',
				itemStyle: {
					normal: {
						color: function(params) {
							return colorListMapping[colorMap[params.name]]
							// return colors[params.dataIndex]
						},
						label: {
							show: true,
							position: 'top',
							formatter: '{c}%'
						},
						shadowBlur: 20,
						shadowColor: 'rgba(40, 40, 40, 0.5)',
					}
				},
				label: {
					normal: {
						position: 'left',
						formatter: function(p) {
							return p.name + ": " + p.value;
						}
					}
				},
				markPoint: markPoint,
				data: rankData[i].data.map(function(ele) {
					return ele.value
				})
			}]
		})
	}

	myChart4.setOption(option4);
}
