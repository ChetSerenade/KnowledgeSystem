<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			span,
			div {
				background-color: #F60;
				margin-bottom: 30px;
				margin-left: 5px;
				height: 40Px;
			}

			/* display:inline-block; 在css中是什么意思?
			inline-block主要的用处是用来处理行内非替换元素的高宽问题的！
			行内非替换元素，比如span、a等标签，正常情况下士不能设置宽高的，
			加上该属性之后，就可以触发让这类标签表现得如块级元素一样，可以设置宽高。
			注意IE6不支持inline-block属性，可以用hack来解决：*display:inline;zoom:1; */
		</style>
	</head>
	<body>
		<div style="background-color:#F60">Div默认为 block</div>

		<span style="display:block;">加了block属性</span>

		<span style="display:block;">加了block属性</span>

		<span style="display:block;">加了block属性</span>

		<span>没加block属性</span>
		<span>没加block属性</span>

		<span>没加block属性</span>
	</body>
</html>
