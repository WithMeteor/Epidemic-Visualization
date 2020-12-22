var myChart5; //全局变量

function sum(arr) { //求和
	var s = 0;
	for (var i = arr.length - 1; i >= 0; i--) {
		s += arr[i];
	}
	return s;
}

function add_value(arr) { //计算与前一天的差值（增加了多少）
	d_list = [];
	for (var i = 0; i < arr.length - 1; i++) {
		add = arr[i + 1] - arr[i];
		d_list.push(add);
	}
	return d_list;
}

function get_other_list(arr, arr1) { //从全国总的数据中减去湖北的数据，得到非湖北的数据
	other_arr = [];
	for (var i = 0; i <= arr.length - 1; i++) {
		other = arr[i] - arr1[i];
		other_arr.push(other);
	}
	return other_arr;
}


function draw_chart5(params, Data, flag) {
	serious_id = 13; //湖北省的在列表中的序号为13
	DateList = [];
	ConfList = [];
	CureList = [];
	DeadList = [];
	Serious_ConfList = [];
	Serious_CureList = [];
	Serious_DeadList = [];
	Other_ConfList = [];
	Other_CureList = [];
	Other_DeadList = [];
	var titleName = '';
	for (var i = 0; i < Data['日期'].length; i += 1) { //get_DateLIst日期列表
		DateList.push(Data['日期'][i]);
	}

	if (flag == 0) { //全国的
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

		//湖北省数据
		for (var i = 0; i < Data['中国']['确诊'].length; i += 1) {
			Serious_ConfList.push(Data['中国']['确诊'][i][serious_id]);
		}

		for (var i = 0; i < Data['中国']['治愈'].length; i += 1) {
			Serious_CureList.push(Data['中国']['治愈'][i][serious_id]);
		}

		for (var i = 0; i < Data['中国']['死亡'].length; i += 1) {
			Serious_DeadList.push(Data['中国']['死亡'][i][serious_id]);
		}

		Other_ConfList = get_other_list(ConfList, Serious_ConfList);
		Other_CureList = get_other_list(CureList, Serious_CureList);
		Other_DeadList = get_other_list(DeadList, Serious_DeadList);

		add_Other_ConfList = add_value(Other_ConfList);
		add_Other_CureList = add_value(Other_CureList);
		add_Other_DeadList = add_value(Other_DeadList);

		add_Serious_Conf_List = add_value(Serious_ConfList);
		add_Serious_Cure_List = add_value(Serious_CureList);
		add_Serious_Dead_List = add_value(Serious_DeadList);
		add_Conf_List = add_value(ConfList);
		add_Cure_List = add_value(CureList);
		add_Dead_List = add_value(DeadList);


	} else if (flag == 1) { //省的
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
		add_Conf_List = add_value(ConfList);
		add_Cure_List = add_value(CureList);
		add_Dead_List = add_value(DeadList);

	} else if (flag == 2) { //市的
		var Province = params.split('-')[0];
		var City = params.split('-')[1];
		titleName = City;
		var index = 0;
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
		add_Conf_List = add_value(ConfList);
		add_Cure_List = add_value(CureList);
		add_Dead_List = add_value(DeadList);
	}

	if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
		myChart5.dispose(); //销毁
	}

	myChart5 = echarts.init(document.getElementById('smooth-line'), "dark");


	DateList.shift();
	if (flag == 0) { //包含全国、湖北、非湖北
		option5 = {
			title: {
				text: titleName + ' 每日新增情况',
				textStyle: {
					color: '#fff',
					fontSize: 28
				},
				x: 'center',
				top: '5% ',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data: ['确诊（全国）', '治愈（全国）', '死亡（全国）', '确诊（湖北）', '治愈（湖北）', '死亡（湖北）', '确诊（非湖北）', '治愈（非湖北）', '死亡（非湖北）'],
				selected: {
					'确诊（全国）': true,
					'治愈（全国）': false,
					'死亡（全国）': false,
					'确诊（湖北）': false,
					'治愈（湖北）': false,
					'死亡（湖北）': false,
					'确诊（非湖北）': false,
					'治愈（非湖北）': false,
					'死亡（非湖北）': false,
				},
			},
			dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
					type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
					start: 10, // 左边在 10% 的位置。
					end: 60 // 右边在 60% 的位置。
				},
				{ // 这个dataZoom组件，也控制x轴。
					type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
					start: 10, // 左边在 10% 的位置。
					end: 60 // 右边在 60% 的位置。
				}
			],
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: DateList
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: '确诊（全国）',
					type: 'line',
					smooth: true,
					symbol: 'diamond',
					symbolSize: 15,
					color: '#ff9540',
					data: add_Conf_List
				},
				{
					name: '治愈（全国）',
					type: 'line',
					smooth: true,
					symbol: 'diamond',
					color: '#ffe200',
					symbolSize: 15,
					data: add_Cure_List
				},
				{
					name: '死亡（全国）',
					type: 'line',
					smooth: true,
					symbol: 'diamond',
					symbolSize: 15,
					color: '#ff0000',
					data: add_Dead_List
				},
				{
					name: '确诊（湖北）',
					type: 'line',
					smooth: true,
					symbol: 'triangle',
					color: '#04859d',
					symbolSize: 15,
					data: add_Serious_Conf_List
				},
				{
					name: '治愈（湖北）',
					type: 'line',
					smooth: true,
					symbol: 'triangle',
					color: '#92ec00',
					symbolSize: 15,
					data: add_Serious_Cure_List
				},
				{
					name: '死亡（湖北）',
					type: 'line',
					smooth: true,
					symbol: 'triangle',
					symbolSize: 15,
					color: '#8dc1a9',
					data: add_Serious_Dead_List
				},
				{
					name: '确诊（非湖北）',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					color: '#a93cd4',
					symbolSize: 15,
					data: add_Other_ConfList
				},
				{
					name: '治愈（非湖北）',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 15,
					color: '#0d58a6',
					data: add_Other_CureList
				},
				{
					name: '死亡（非湖北）',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 15,
					color: '#ef3c7b',
					data: add_Other_DeadList
				}
			]
		};
	} else //只包含对应省、市的数据
	{
		option5 = {
			title: {
				text: titleName + ' 每日新增情况',
				textStyle: {
					color: '#fff',
					fontSize: 28
				},
				x: 'center',
				top: '5% ',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data: ['确诊', '治愈', '死亡'],
				selected: {
					'确诊': true,
					'治愈': false,
					'死亡': false,
				},
			},
			dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
					type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
					start: 10, // 左边在 10% 的位置。
					end: 60 // 右边在 60% 的位置。
				},
				{ // 这个dataZoom组件，也控制x轴。
					type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
					start: 10, // 左边在 10% 的位置。
					end: 60 // 右边在 60% 的位置。
				}
			],
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: DateList
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: '确诊',
					type: 'line',
					smooth: true,
					symbol: 'diamond',
					symbolSize: 15,
					color: '#ff9540',
					data: add_Conf_List
				},
				{
					name: '治愈',
					type: 'line',
					smooth: true,
					symbol: 'triangle',
					symbolSize: 15,
					color: '#ffe200',
					data: add_Cure_List
				},
				{
					name: '死亡',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 15,
					color: '#ff0000',
					data: add_Dead_List
				}
			]
		};
	}

	myChart5.setOption(option5);
}
