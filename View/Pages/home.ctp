<script type="text/x-handlebars" data-template-name="application">
	<div id="right">
		<div id="about-me">
			<a {{action goPage App.pages.about href=true}}>
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
					<li><a {{action goPage App.pages.about href=true}}>About</a></li>
					<li><a {{action goPage App.pages.media href=true}}>Media</a></li>
					<li><a href="mailto:elte@hupkes.org">Contact</a></li>
					{{#if App.authUser.loggedIn}}
					<li><a {{action doAddPost href=true}}>Add post</a></li>
                    <li><a {{action doLogin href=true}}>Log out</a></li>
                    {{else}}
					<li><a {{action doLogin href=true}}>Log in</a></li>
					{{/if}}
				</ul>
			</div>
		</div>
	</div>
	<div id="separator"></div>
	<div id="content">{{outlet}}</div>
	<div class="clear"></div>
</script>