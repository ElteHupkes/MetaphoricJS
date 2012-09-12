<?php
/**
 * The UsersController takes care of adding/removing users,
 * and logging in or out.
 *
 * @author Elte Hupkes
 */
/**
 * @property User $User
 */
class UsersController extends AppController {
	public $renderJson = true;

	/**
	 * Login action
	 */
	public function login() {

	}

	/**
	 * Allows you to create a new user when
	 * no user is currently available.
	 */
	public function create_first() {
		if ($this->User->find('count') > 0) {
			throw new NotFoundException;
		}

		$this->User->create();
		if ($this->User->save($this->request->data, true, array('name', 'email', 'password'))) {
			$this->set('result', array(
				'status' => 0,
				'user_id' => $this->User->id
			));
		} else {
			$this->set('result', array(
				'status' => 1
			));
		}
		$this->set('_serialize', 'result');
	}

	/**
	 *
	 */
	public function admin_edit() {

	}
}