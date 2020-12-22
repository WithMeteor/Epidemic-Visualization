var myChart_sentiment = echarts.init(document.getElementById('sentiment-bar') , 'dark');
	$.ajax({
			type : "get",
			async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
			url : "data/sentiment_results.json",    //请求发送到
			dataType : "json",        //返回数据形式为json
			success : function(result) { 
				topics=result.topics
				data=result.data
				data_0=data[0]
				data_1=data[1]
				data_2=data[2]
				
				myChart_sentiment.setOption({
					title:{
						show:true,
						left:'center',
						text:'微博热点话题评论情感',
						textStyle:{
							fontSize:25
						}
					},
					angleAxis: {
						type: 'category',
						data: topics
					},
					radiusAxis: {
					},
					polar: {
					},
					series: [{
						type: 'bar',
						data: data_0,
						coordinateSystem: 'polar',
						name: '消极',
						stack: 'a'
					}, {
						type: 'bar',
						data: data_1,
						coordinateSystem: 'polar',
						name: '中性',
						stack: 'a'
					}, {
						type: 'bar',
						data: data_2,
						coordinateSystem: 'polar',
						name: '积极',
						stack: 'a'
					}],
					legend: {
						show: true,
						right:'10%',
						data: ['消极', '中性', '积极']
					}
				});
				 myChart_sentiment.hideLoading();    //隐藏加载动画
			},
			error : function(errorMsg) {
				alert("图表请求数据失败!");
				myChart_sentiment.hideLoading();
			}
		}) 