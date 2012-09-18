<?php
/**
 * Bcrypt Form Authenticator, inspired by Mark Story's post.
 *
 * @see http://mark-story.com/posts/view/using-bcrypt-for-passwords-in-cakephp
 * @author Mark Story
 * @author Elte Hupkes
 */
App::uses('FormAuthenticate', 'Controller/Component/Auth');

class BcryptAuthenticate extends FormAuthenticate {
	/**
	 * Cost factor for hashing
	 *
	 * @var int
	 */
	public static $cost = 12;

	/**
	 * @param string $password Plain text password
	 * @return string Hashed password
	 */
	protected function _password($password) {
		return self::hash($password);
	}

	/**
	 * Create a blowfish / bcrypt hash.
	 *
	 * @static
	 * @param string $password
	 * @param null|string $salt If not given, a salt is generated.
	 * @return string Hashed password
	 */
	public static function hash($password, $salt = null) {
		if (!$salt) {
			$salt = substr(Security::generateAuthKey(), 0, 22);
		}
		return crypt($password, '$2a$' . self::$cost . '$' . $salt);
	}

	/**
	 * Overrides _findUser to always fetch the user, which is
	 * necessary to check the Bcrypt password.
	 *
	 * @param string $username
	 * @param string $password
	 * @return array|bool The user data, or false.
	 */
	protected function _findUser($username, $password) {
		$userModel = $this->settings['userModel'];
		list(,$model) = pluginSplit($userModel);
		$fields = $this->settings['fields'];

		$conditions = array(
			$model . '.' . $fields['username'] => $username
		);
		if (!empty($this->settings['scope'])) {
			$conditions = array_merge($conditions, $this->settings['scope']);
		}

		/* @var AppModel $User */
		$User = ClassRegistry::isKeySet($userModel) ? ClassRegistry::getObject($userModel) : ClassRegistry::init($userModel);
		$result = $User->find('first', array(
			'conditions' => $conditions,
			'recursive' => $this->settings['recursive']
		));
		if (empty($result) || empty($result[$model])) {
			return false;
		}

		/**
		 * Verify the password
		 */
		$hash = $result[$model][$fields['password']];
		if (empty($hash)) {
			return false;
		} elseif (!$this->checkPassword($password, $hash)) {
			return false;
		}
		
		// Remove the password from the user array for security reasons
		unset($result[$model][$fields['password']]);
		return $result[$model];
	}

	/**
	 * Validates a bcrypt password
	 * @static
	 * @param string $password
	 * @param string $hash
	 * @return bool
	 */
	public static function checkPassword($password, $hash) {
		if (empty($password) || empty($hash)) {
			return false;
		}

		$salt = substr($hash, 7, 22);
		return ($hash === self::hash($password, $salt));
	}
}
