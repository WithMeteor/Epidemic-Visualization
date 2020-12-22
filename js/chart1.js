var myChart1; //全局变量

$(function() {
	changeMap();
})

function changeMap() {
	if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
		myChart1.dispose(); //销毁
	}
	myChart1 = echarts.init(document.getElementById('map'), "dark");
	$.ajax({ //Ajax获取数据后,必须在{}中处理数据
		type: 'get',
		url: 'data/map_data.json', //'data/province_today_data.json'
		dataType: "json",
		success: function(data) {
			option1 = {
				baseOption: {
					timeline: {
						axisType: 'category',
						// realtime: false,
						// loop: false,
						currentIndex: data['日期'].length - 1,
						autoPlay: false,
						playInterval: 2000,
						symbolSize: 12,
						left: '5%',
						right: '5%',
						bottom: '0%',
						width: '90%',
						// controlStyle: {
						//     position: 'left'
						// },
						data: data['日期'],
						tooltip: {
							formatter: data['日期']
						},
					},
					tooltip: {
						trigger: 'item',
						formatter: '{b}<br/>病例数: {c}<br/>点击可查看该省具体疫情',
						textStyle: {
							fontSize: 18,
						}
					},
					legend: {
						data: ['确诊', '治愈', '死亡'],
						selected: {
							'确诊': true,
							'治愈': false,
							'死亡': false
						},
						right: 10,
						top: 12,
						textStyle: {
							color: "#fff"
						},
						itemWidth: 12,
						itemHeight: 10,
					},
					visualMap: {
						min: 0,
						max: 50000,
						left: 26,
						bottom: 40,
						showLabel: true,
						text: ["高", "低"],
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
						show: true
					},
					toolbox: {
						show: true,
						itemSize: 30,
						left: 20,
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							saveAsImage: {
								show: true
							}
						}
					},
					geo: {
						map: 'china',
						label: {
							emphasis: {
								show: false,
							}
						},
						itemStyle: {
							emphasis: {
								areaColor: '#CDBE70'
							}
						}
					},
					series: [{
							name: '确诊',
							type: 'map',
							mapType: 'china',
							selectedMode: 'single',
							label: {
								normal: {
									show: true,
									fontSize: 15,
									color: '#000000',
								},
								emphasis: {
									show: true
								},

								fontSize: 18,
							},
							// data: provinceConfList
						},
						{
							name: '治愈',
							type: 'map',
							mapType: 'china',
							selectedMode: 'single',
							label: {
								normal: {
									show: true,
									fontSize: 15,
									color: '#000000',
								},
								emphasis: {
									show: true
								},

								fontSize: 18,
							},
							// data: provinceCureList
						},
						{
							name: '死亡',
							type: 'map',
							mapType: 'china',
							selectedMode: 'single',
							label: {
								normal: {
									show: true,
									fontSize: 15,
									color: '#000000',
								},
								emphasis: {
									show: true
								},

								fontSize: 18,
							},
							// data: provinceDeadList
						}
					]
				},
				animationDurationUpdate: 3000,
				animationEasingUpdate: 'quinticInOut',
				options: []
			};
			var Province = "";
			var ProvinceList = data['中国']['各省'];
			myChart1.on('click', function(params) {
				Province = params.name;
				console.log(Province);
				var mapFlag = 0; // 遍历省列表，如果参数是省，说明在第一层全国地图，更新图层，否则不更新(即不再向下钻取)
				for (var i = 0; i < ProvinceList.length; i++) {
					if (Province == ProvinceList[i]) {
						mapFlag = 1;
					}
				}
				if (mapFlag == 1) {
					if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
						myChart1.dispose(); //销毁
					}

					draw_chart2(Province, data, 1);
					draw_chart3(Province, data, 1);
					draw_chart4(Province, data, 1);
					draw_chart5(Province, data, 1);

					myChart1 = echarts.init(document.getElementById('map'), "dark");

					option1 = {
						baseOption: {
							timeline: {
								axisType: 'category',
								// realtime: false,
								// loop: false,
								currentIndex: data['日期'].length - 1,
								autoPlay: false,
								playInterval: 2000,
								symbolSize: 12,
								left: '5%',
								right: '5%',
								bottom: '0%',
								width: '90%',
								// controlStyle: {
								//     position: 'left'
								// },
								data: data['日期'],
								tooltip: {
									formatter: data['日期']
								},
							},
							tooltip: {
								trigger: 'item',
								formatter: '{b}<br/>病例数: {c}<br/>点击可查看该市具体疫情<br/>左上角按钮返回上一级',
								textStyle: {
									fontSize: 18,
								}
							},
							legend: {
								data: ['确诊', '治愈', '死亡'],
								selected: {
									'确诊': true,
									'治愈': false,
									'死亡': false
								},
								right: 10,
								top: 12,
								textStyle: {
									color: "#fff"
								},
								itemWidth: 12,
								itemHeight: 10,
							},
							visualMap: {
								min: 0,
								max: 50000,
								left: 26,
								bottom: 40,
								showLabel: true,
								text: ["高", "低"],
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
								show: true
							},
							toolbox: {
								show: true,
								itemSize: 30,
								left: 20,
								feature: {
									dataView: {
										show: true,
										readOnly: false
									},
									myTool: { //自定义按钮,命名必须以my打头
										show: true, //是否显示    
										title: '返回上一级', //鼠标移动上去显示的文字    
										icon: 'image://img/back.png', //图标
										onclick: function() { //点击事件,这里的option1是chart的option信息    
											changeMap();
										}
									},
									saveAsImage: {
										show: true
									}
								}
							},
							geo: {
								map: Province,
								label: {
									emphasis: {
										show: false,
									}
								},
								itemStyle: {
									emphasis: {
										areaColor: '#CDBE70'
									}
								}
							},
							series: [{
									name: '确诊',
									type: 'map',
									mapType: Province,
									selectedMode: 'single',
									label: {
										normal: {
											show: true,
											fontSize: 15,
											color: '#000000',
										},
										emphasis: {
											show: true
										},

										fontSize: 18,
									},
									// data: cityConfList
								},
								{
									name: '治愈',
									type: 'map',
									mapType: Province,
									selectedMode: 'single',
									label: {
										normal: {
											show: true,
											fontSize: 15,
											color: '#000000',
										},
										emphasis: {
											show: true
										},

										fontSize: 18,
									},
									// data: cityCureList
								},
								{
									name: '死亡',
									type: 'map',
									mapType: Province,
									selectedMode: 'single',
									label: {
										normal: {
											show: true,
											fontSize: 15,
											color: '#000000',
										},
										emphasis: {
											show: true
										},

										fontSize: 18,
									},
									// data: cityDeadList
								}
							],
						},
						animationDurationUpdate: 3000,
						animationEasingUpdate: 'quinticInOut',
						options: []
					};

					ThisConfList = data[Province]['确诊'];
					ThisCureList = data[Province]['治愈'];
					ThisDeadList = data[Province]['死亡'];
					for (var n = 0; n < data['日期'].length; n++) {
						var cityConfList = [];
						var cityCureList = [];
						var cityDeadList = [];
						for (var i = 0; i < ThisConfList[n].length; i++) {
							cityConfList.push({
								name: data[Province]['各市'][i],
								value: ThisConfList[n][i]
							});
							cityCureList.push({
								name: data[Province]['各市'][i],
								value: ThisCureList[n][i]
							});
							cityDeadList.push({
								name: data[Province]['各市'][i],
								value: ThisDeadList[n][i]
							});
						}
						option1.options.push({
							title: {
								text: data['日期'][n] + ' ' + Province + ' 新型冠状病毒感染情况',
								textStyle: {
									color: '#fff',
									fontSize: 28
								},
								x: 'center',
								top: '1%',
							},
							series: [{
								name: '确诊',
								type: 'map',
								mapType: Province,
								data: cityConfList,
							}, {
								name: '治愈',
								type: 'map',
								mapType: Province,
								data: cityCureList,
							}, {
								name: '死亡',
								type: 'map',
								mapType: Province,
								data: cityDeadList,
							}]
						});
					}

					var City = "";
					var CityList = data[Province]['各市'];

					myChart1.on('click', function(params) {
						City = params.name;
						console.log(City);
						var mapFlag = 0; // 遍历省列表，如果参数是省，说明在第一层全国地图，更新图层，否则不更新(即不再向下钻取)
						for (var i = 0; i < CityList.length; i++) {
							if (City == CityList[i]) {
								mapFlag = 1;
							}
						}
						if (mapFlag == 1) {

							draw_chart2(Province + '-' + City, data, 2);
							draw_chart5(Province + '-' + City, data, 2);
						}
					});
					myChart1.setOption(option1);
					window.onresize = function() {
						myChart1.resize();
					};
				}

			});

			ConfList = data['中国']['确诊'];
			CureList = data['中国']['治愈'];
			DeadList = data['中国']['死亡'];
			for (var n = 0; n < data['日期'].length; n++) {
				var provinceConfList = [];
				var provinceCureList = [];
				var provinceDeadList = [];
				for (var i = 0; i < ConfList[n].length; i++) {
					provinceConfList.push({
						name: data['中国']['各省'][i],
						value: ConfList[n][i]
					});
					provinceCureList.push({
						name: data['中国']['各省'][i],
						value: CureList[n][i]
					});
					provinceDeadList.push({
						name: data['中国']['各省'][i],
						value: DeadList[n][i]
					});
				}
				option1.options.push({
					title: {
						text: data['日期'][n] + ' 全国 新型冠状病毒感染情况',
						textStyle: {
							color: '#fff',
							fontSize: 28
						},
						x: 'center',
						top: '7%',
					},
					series: [{
						name: '确诊',
						type: 'map',
						mapType: 'china',
						data: provinceConfList,
					}, {
						name: '治愈',
						type: 'map',
						mapType: 'china',
						data: provinceCureList,
					}, {
						name: '死亡',
						type: 'map',
						mapType: 'china',
						data: provinceDeadList,
					}]
				});
			}

			draw_chart2('中国', data, 0);
			draw_chart3('中国', data, 0);
			draw_chart4('中国', data, 0);
			draw_chart5('中国', data, 0);
			draw_chart6('中国', data, 0);
			myChart1.setOption(option1);
			window.onresize = function() {
				myChart1.resize();
				myChart2.resize();
				myChart3.resize();
				myChart4.resize();
				myChart5.resize();
				myChart6.resize();
			};

		}
	});
}
