<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php echo $this->Html->charset(); ?>
	<title>
		<?php echo $title_for_layout; ?>
	</title>
	<link rel="shortcut icon" href="<?php echo $this->Html->webroot('favicon.ico'); ?>" type="image/x-icon" />
	<?php
		echo $this->Html->meta('icon');
		echo $this->fetch('meta');
		echo $this->fetch('css');
	?>
</head>
<body>
<?php
	echo $this->fetch('content');
	echo $this->element('all_templates');
?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<?php
if (Configure::read('debug') > 1) {
	echo $this->Html->script(array('handlebars-1.0.0.beta.6', 'ember-1.0.pre'));
} else {
?>
<script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ember.js/1.0.pre/ember-1.0.pre.min.js"></script>
<?php
}
/**
 * Rationale behind the script order:
 * First the libraries (jQuery, Handlebars before Ember)
 *
 * Then pluralization and ember-i18n; followed by a language file.
 * Finally, include the js_includes file which takes care of its own order.
 */
$scripts = explode("\n", file_get_contents(APP.'webroot/js_includes.txt'));
	echo $this->Html->script(array('lib/CLDR', 'lib/ember-i18n-latest')),
		$this->Html->script('locale/en'),
		$this->Html->script($scripts);
?>
<script type="text/javascript">
	CLDR.defaultLocale = 'en';
</script>
</body>
</html>
