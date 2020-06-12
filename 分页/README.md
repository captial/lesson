# Jquery前端分页插件pagination使用
插件描述：JqueryPagination是一个轻量级的jquery分页插件。只需几个简单的配置就可以生成分页控件。并且支持ajax获取数据，自定义请求参数，提供多种方法，事件和回调函数，功能全面的分页插件。

![实例图片](http://upload-images.jianshu.io/upload_images/5640239-a9342c4686e4c6df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


jQuery Pagination分页插件：下载：http://www.jq22.com/jquery-info5697

####步骤一：导入相关的jquery和pagination文件
```

        <script src="js/jquery-1.11.3.js"></script>
        <!--分页-->
        <link rel="stylesheet" href="css/pagination.css" />
        <script type="text/javascript" src="js/jquery.pagination.js"></script>
```

####步骤二：HTML代码：
非常简单只需要一个div标签
```
  <div class="setPageDiv">
            <div class="Pagination" id="pagination"></div>
 </div>
```
####步骤三： JS代码：
```
   $('.Pagination').pagination(pageNum, {
                            num_edge_entries: 1, //边缘页数
                            num_display_entries: 4, //主体页数
                            items_per_page: 1, //每页显示1项
                            prev_text: "上一页",
                            next_text: "下一页",
});
```
####完整代码实例展示：
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="js/jquery-1.11.3.js"></script>
		<!--分页-->
		<link rel="stylesheet" href="css/pagination.css" />
		<script type="text/javascript" src="js/jquery.pagination.js"></script>
		<style>
			.setPageDiv {
				width: 1100px;
				margin: auto;
				margin-bottom: 91px;
				margin-top: 37px;
			}
			
			#pagination {
				margin: auto;
				margin-left: 100px;
			}
			
			.img-responsive {
				width: 30px;
				height: 30px;
			}
		</style>

	</head>

	<body>
		<div class="zxdong">
			<div class="zxdong_inner">
				<ul style="margin-left: 100px;">
					<!--<div class='row'>
						<div class='col-md-1   col-xs-1'>
                        <img src='" + img + "'/   class='img-responsive'>
						</div>
						<div class='col-md-3   col-xs-3'>
						<p>11111111111111111 </p>
						</div></div>-->

					<div class="list">

					</div>
				</ul>

			</div>
		</div>

		<div class="setPageDiv">
			<div class="Pagination" id="pagination"></div>
		</div>

	</body>
	<script>
		//分页
		$(function() {

			$('.setPageDiv').change(function() {

				getMsg(parseInt($(this).val()))
			})

			function getMsg(num) {
				$.ajax({
					url: 'data/bussiness.json',
					type: 'GET',
					dataType: 'json',
					success: function(data) {
						//1.计算分页数量
						var showNum = num;
						var dataL = data.list.length;
						var pageNum = Math.ceil(dataL / showNum);
						$('.Pagination').pagination(pageNum, {
							num_edge_entries: 1, //边缘页数
							num_display_entries: 4, //主体页数
							items_per_page: 1, //每页显示1项
							prev_text: "上一页",
							next_text: "下一页",
							callback: function(index) {
								//console.log(index);
								var html = '<ul>'

								console.log(showNum * index + '~' + parseInt(showNum * index) + parseInt(showNum))
								for(var i = showNum * index; i < showNum * index + showNum; i++) {
									//console.log(i)
									if(i < dataL) {

										var img = data.list[i].img;
										var manager = data.list[i].manager; //交易类型
										html += "<div class='row'>";
										html += "<div class='col-md-1   col-xs-1'>"
										html += "<img src='" + img + "'/   class='img-responsive'>"
										html += "</div>"
										html += "<div class='col-md-3   col-xs-3'>"
										html += "<p>" + manager + "</p>"
										html += "</div></div>";

									}
								}
								html += '</ul>';
								$('.list').html(html)
							}
						})

					}
				})
			}
			getMsg(6)

		})
	</script>

</html>
```



####数据格式:bussiness.json
```
{
	"list": [
		{
			"img":"img/dingwei.png",
			"manager": "新店开业刷刷送豪礼"
			
		}, {
			"img": "img/dingwei.png",
			"manager": "文史楼108"
			
		},
		{
			"img": "img/dingwei.png",
			"manager": "文史楼108"
			
		},
		{
			"img": "img/dingwei.png",
			"manager": "文史楼108"
			
		},
		
		{
			"img": "img/dingwei.png",
			"manager": "文史楼108"
			
		}
		
	]
}
```


