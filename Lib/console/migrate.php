<?php
/**
 * Very simple MySQL Migration console.
 *
 * Currently only supports migrating up and marking all items as done
 * (which is useful for initial import).
 *
 * Separated from the Cake Console so that migrations can still be ran
 * even if cake fails due to not being able to run.
 *
 * To run this shell:
 *
 * php migrate.php all_done[ before]	Marks all migrations before the one
 * 										specified in "before" as done. "Before"
 * 										should be the filename of a migration without the
 * 										.sql part.
 *
 * php migrate up						Updates to the latest migration
 *
 */
/**
 * @param string $string
 * @param bool $newline End with newline
 * @return void
 */
function out($string = '', $newline = true) {
	echo $string.($newline ? PHP_EOL : '');
}

/**
 * @param string $question
 * @return string
 */
function in($question = null) {
	if ($question) {
		out($question.' ', false);
	}
	return trim(fgets(STDIN));
}

/**
 * Asks a boolean yes / no question
 * @param string $question
 * @return bool
 */
function yn($question = null) {
	return in($question) == 'y';
}

// Load database configuration
require_once(dirname(__FILE__).'/../../Config/database.php');

// Initialize some variables
$dir = dirname(dirname(dirname(__FILE__))).'/Config/MysqlMigrations/';
if ($argc > 1) {
	$action = $argv[1];
} else {
	$action = 'up';
}

// Connect
$dbConfig = new DATABASE_CONFIG();
$cfg = $dbConfig->default;
try {
	$dbh = new PDO('mysql:dbname='.$cfg['database'].';host='.$cfg['host'], $cfg['login'], $cfg['password']);
} catch (Exception $e) {
	die('Could not connect to database: '.$e->getMessage().PHP_EOL);
}

if ($action != 'init') {
	$version = $dbh->query('SELECT id, name, created FROM version ORDER BY name ASC');
	if (!$version) {
		die('Could not retrieve version information.');
	}

	$versionInfo = array();
	foreach ($version as $row) {
		$versionInfo[$row['name']] = $row['created'];
	}
}

$migrations = glob($dir.'*.sql');
sort($migrations);

$insertStatement = $dbh->prepare('INSERT INTO version(`name`, `created`) VALUES(:name, :created)');
switch ($action) {
	case 'up':
        $run = $list = array();
		foreach ($migrations as $migration) {
			$filename = pathinfo($migration, PATHINFO_FILENAME);
			if (!array_key_exists($filename, $versionInfo)) {
				$list[] = $filename;
                $run[] = $migration;
			}
		}
		if (count($run) == 0) {
			out('No migrations found.');
			break;
		}
        out('Going to run '.count($run).' migration(s):'.PHP_EOL.implode(PHP_EOL, $list).PHP_EOL.'Continue [y/n]? ', false);
		$continue = in();
		if ($continue == 'y') {
			out('Running migrations..');
			foreach ($run as $k => $migration) {
				out('Running '.$migration.'...');
				$data = file_get_contents($migration);
				$queries = explode(';', $data);
				foreach ($queries as $query) {
					$query = trim($query);
					if (empty($query)) {
						continue;
					}
					out('Executing query "'.$query.'"...');
					if ($dbh->query($query) === false) {
						out('WARNING: failed!');
						$err = $dbh->errorInfo();
						out('Error: "'.$err[2].'"');
						break(2);
					}
				}
				if (!$insertStatement->execute(array(':name' => $list[$k], ':created' => time()))) {
					out('WARNING: could not update version table!');
				}
				out('Done.');
			}
		} else {
			out('Breaking out.');
		}
	break;
	case 'all_done':
		$before = isset($argv[2]) ? $argv[2] : null;
		out('Marking migrations as done.');
		foreach ($migrations as $migration) {
			$filename = pathinfo($migration, PATHINFO_FILENAME);
			if ($filename == $before) {
				out('Reached '.$filename.', stopping.');
				break;
			}
			if (isset($versionInfo[$filename])) {
				continue;
			}
			if (!$insertStatement->execute(array(':name' => $filename, ':created' => time()))) {
				out('WARNING: could not update version table with file: '.$filename);
				$err = $insertStatement->errorInfo();
				out('Error: '.$err[2]. ', for query: '.$insertStatement->queryString);
			}
		}
	break;
	case 'generate':
		$name = isset($argv[2]) ? $argv[2] : in('What should the migration be called?');
		$t = time();
		$name = $t.'_'.$name;
		$filename = $name.'.sql';
		$loc = $dir.$filename;
		if (!($fp = fopen($dir.$filename, 'w'))) {
			out('Could not open file '.$loc.'!');
			exit(1);
		}
		fclose($fp);

		$markDone = yn('Mark the migration as done?');
		if (!$insertStatement->execute(array(':name' => $name, ':created' => $t))) {
			out('WARNING: could not update version table!');
		}
	break;
	case 'init':
		$queries = file_get_contents($dir.'../Schema/structure.sql');
		if (!$queries) {
			out('WARNING: could not open structure file.');
		}
		out('Executing structure queries..');

		foreach (explode(';', $queries) as $query) {
			if (trim($query) == "") {
				continue;
			}
			if (!$dbh->query($query)) {
				out('WARNING: could not execute query: "'.$query.'"');
			}
		}
		
		out('Done. Run "migrate.php up" to migrate to the latest version.');
	break;
	default:
		out('Invalid action "'.$action.'"');
}

out('Done.');
