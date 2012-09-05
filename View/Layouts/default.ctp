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
?>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<?php
if (Configure::read('debug') > 1) {
	echo $this->Html->script(array('ember-1.0.pre', 'handlebars-1.0.0.beta.6'));
} else {
?>
<script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ember.js/1.0.pre/ember-1.0.pre.min.js"></script>
<?php
}
	echo $this->Html->script('app'), $this->fetch('script'); 
?>
</body>
</html>
