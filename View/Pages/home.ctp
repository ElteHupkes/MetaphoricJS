<script type="text/x-handlebars" data-template-name="application">
	<div id="right">
		<div id="about-me">
			<a {{action goAbout href=true}}>
				<img title="Elte Hupkes" alt="Elte Hupkes" src="/img/elte.jpg" />
			</a>
			<h3>Elte Hupkes</h3>
			<p>Computer Science student, web developer,
				musician, football player and some other stuff.</p>
			<br class="clear">
		</div>
		<div class="block">
			<h3>Menu</h3>
			<div class="block-body">
				<ul>
					<li><a {{action goHome href=true}}>Home</a></li>
					<li><a {{action goAbout href=true}}>About</a></li>
					<li><a {{action goMedia href=true}}>Media</a></li>
					<li><a {{action goContact href=true}}>Contact</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div id="separator"></div>
	<div id="content">{{outlet}}</div>
	<div class="clear"></div>
</script>