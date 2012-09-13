<script type="text/x-handlebars" data-template-name="application">
	<div id="nav">
		<ul>
			<li><a href="#" {{action doHome}}>{{t nav.home}}</a></li>
			<li><a href="#" {{action doUsers}}>{{t nav.users}}</a></li>
		</ul>
	</div>
	<div id="content">
		{{outlet}}
	</div>
</script>