<?php
/**
 * This file loads all .handlebars templates for the application,
 * so we can keep code clean. In production, the files will
 * have to be concatenated and included in a static index
 * instead.
 */
$directories = array('Controller', 'Model', 'View');
$base = APP.DS.'webroot'.DS.'js'.DS;

foreach ($directories as $dir) {
	$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($base.$dir));
	foreach ($iterator as $path) {
		// Ignore directories
		if ($path->isDir()) {
			continue;
		}

		if (preg_match('#\.handlebars$#', $path)) {
			$name = str_replace($base.$dir.DS, '', $path);
			$name = strtolower(preg_replace('#[^a-z0-9\-_]#i', '-', $name));
			// Remove extension
			$name = substr($name, 0, strlen($name) - 11);
			echo '<script type="text/x-handlebars" data-template-name="'.$name.'">'.file_get_contents($path).'</script>'.PHP_EOL;
		} elseif (preg_match('#\.js$#', $path)) {
			$name = str_replace('\\', '/', str_replace($base, '', $path));
			$name = substr($name, 0, strlen($name) - 3);
			$this->Html->script($name, array('inline' => false));
		}
	}
}