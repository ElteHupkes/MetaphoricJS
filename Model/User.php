<?php
/**
 * Model for users
 */
class User extends AppModel {
	/**
	 * Validation rules
	 * @var array
	 */
	public $validate = array(
		'email' => array(
			'notEmpty' => array(
				'rule' => 'notEmpty',
				'message' => 'This field is required.',
				'allowEmpty' => false,
				'required' => true
			),
			'isEmail' => array(
				'rule' => 'email',
				'message' => 'Enter a valid e-mail address.'
			),
			'unique' => array(
				'rule' => 'isUnique',
				'message' => 'This e-mail address is already taken.'
			)
		),
		'name' => array(
			'rule' => 'notEmpty',
			'message' => 'This field is required.',
			'required' => true,
			'allowEmpty' => false
		),
		'password_plain' => array(
			'initialValue' => array(
				'on' => 'create',
				'allowEmpty' => false,
				'required' => true,
				'rule' => 'notEmpty',
				'message' => 'This field is required.'
			),
			// On create only
			'length' => array(
				'rule' => array('minLength', 8),
				'message' => 'The password has to be at least %d characters.'
			)
		),
		'current_password' => array(
			'rule' => 'matchesCurrentPassword',
			'message' => 'Wachtwoord incorrect',
			'on' => 'update'
		),
	);

	/**
	 * Validates the current password at a password change
	 * @param array $f
	 * @return bool
	 */
	public function matchesCurrentPassword($f) {
		$f = array_shift($f);
		$pw = $this->field('password');

		return !empty($pw) && checkPassword($f, $pw);
	}
}