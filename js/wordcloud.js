var myChart_word = echarts.init(document.getElementById("word_cloud") , 'dark');
$.ajax({
	type: 'get',
	url: 'data/alldays_result.json', //请求数据的地址
	dataType: "json", //返回数据形式为json
	success: function(result) {
		//alert(nameVal);
		wp_ = result;
		option = {
			tooltip: {   
				show: true
			},
			series: [{
				type: "wordCloud",
				gridSize: 6,
				shape: 'diamond',
				sizeRange: [12, 50],
				width: 420,
				height: 225,
				textStyle: {
					normal: {
						color: function() {
							return 'rgb(' + [
								Math.round(Math.random() * 160),
								Math.round(Math.random() * 160),
								Math.round(Math.random() * 160)
							].join(',') + ')';
						}
					},
					emphasis: {
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
				data: wp_.china.day20200216.content
			}]

		};
		myChart_word.setOption(option);
		myChart_word.on('click', function(params) {
			//console.log(params.name)
			document.getElementById('light').style.display = 'block';
			document.getElementById('fade').style.display = 'block';
			document.getElementById("more").onclick = function() {
				var new_url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=&tn=baiduerr&bar=&wd=' + encodeURI(params.name);
				window.open(new_url,
					'height=600,width=900,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
			};
			//alert(wp_.china.day20200214.assossiate[params.dataIndex]);
			$('#sss').text('关键词关联的话题(评论)为:' + String(wp_.china.day20200216.assossiate[params.dataIndex]));
		});

		document.getElementById("sub2").onclick = function() {
			console.log('csa');
			var place = document.getElementsByName("1"); //这里获取的是一个数组因为是使用了name属性去寻找的
			for (var i = 0; i < place.length; i++) {
				if (place[i].checked) {
					// alert(price[i].checked) //这里我尝试打印一下这个判断的值以便大家了解
					var pl = place[i].value
				}
			};
			var nameVal = 'day' + document.getElementById("zhi2").value;
			for (i in wp_) {
				//console.log(i)
				//alert(pl)
				if (i == pl) {
					var data1 = wp_[i];
					console.log(data1)
					var data = [1];
					for (j in data1) {
						if (j == nameVal) {
							var data = data1[j];
						}
					};
				break;
				}
			};
			if (data.length == 1) {
				alert('No data temporarily ! please try another date');
				window.location.reload();
			};
			option = {
				series: [{
					data: data.content
				}]
			};
			myChart_word.setOption(option);
			var year = document.getElementById("zhi2").value.slice(0, 4);
			var mouth = document.getElementById("zhi2").value.slice(4, 6);
			var day = document.getElementById("zhi2").value.substr(6);
			$('#text').text(year + '年' + mouth + '月' + day + '日热搜热评词云')
			myChart_word.on('click', function(params) {
				//console.log(params.dataIndex)
				document.getElementById('light').style.display = 'block';
				document.getElementById('fade').style.display = 'block';
				document.getElementById("more").onclick = function() {
					var new_url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=&tn=baiduerr&bar=&wd=' + encodeURI(
						params.name);
					window.open(new_url,
						'height=600,width=900,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
				};

				$('#sss').text('关键词关联的话题(评论)为:' + String(data.assossiate[params.dataIndex]));
			});
		};
	}
});
