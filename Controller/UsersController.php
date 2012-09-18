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
		if ((!empty($this->request->data) && $this->Auth->login()) || $this->Auth->loggedIn()) {
			$this->user_info();
		} else {
			$this->set('result', array(
				'status' => 1,
				'error' => __('Incorrect username/password.')
			));
		}
		$this->set('_serialize', 'result');
	}

	/**
	 * Logout method
	 */
	public function logout() {
		$this->Auth->logout();
		$this->set('result', array(
			'status' => 0
		));
		$this->set('_serialize', 'result');
	}

	/**
	 * Returns the logged in user
	 */
	public function user_info() {
		if ($this->Auth->loggedIn()) {
			$this->set('result', array(
				'status' => 0,
				'User' => $this->Auth->user()
			));
		} else {
			$this->set('result', array(
				'status' => 1,
				'error' => __('No logged in user.')
			));
		}
		$this->set('_serialize', 'result');
	}

	/**
	 * Lists all users
	 */
	public function index() {
		$users = $this->User->find('all', array(
			'fields' => array('id', 'name')
		));
		$this->set(array(
			'users' => $users,
			'_serialize' => 'users'
		));
	}

	/**
	 * Allows you to create a new user when
	 * no user is currently available.
	 */
	public function create_first() {
		if ($this->User->find('count') > 0) {
			$this->set(array(
				'result' => array(
					'status' => 1,
					'errors' => array(
						'name' => array(__('A user already exists. Use "add" instead.'))
					)
				),
				'_serialize' => 'result'
			));
			return;
		}

		$this->User->create();
		if ($this->User->save($this->request->data, true, array('name', 'email', 'password'))) {
			$this->set('result', array(
				'status' => 0,
				'user_id' => $this->User->id
			));
		} else {
			$this->set('result', array(
				'status' => 1,
				'errors' => $this->User->validationErrors
			));
		}
		$this->set('_serialize', 'result');
	}

	/**
	 * "View" user data; used for edit.
	 * @param string $id
	 */
	public function admin_view($id = null) {
		$user = $this->User->find('first', array(
			'conditions' => array('id' => $id),
			'fields' => array('id', 'name', 'email')
		));
		if (!$user) {
			throw new NotFoundException;
		}
		$this->set(array(
			'_serialize' => 'result',
			'result' => $user
		));
	}

	/**
	 *
	 */
	public function admin_edit($id = null) {
		$this->User->id = $id;
		if (!$this->User->exists()) {
			throw new NotFoundException;
		}

		unset($this->request->data['User']['id']);

		$fields = array('name', 'email');
		if (!empty($this->request->data['User']['password'])) {
			$fields[] = 'current_password';
			$fields[] = 'password';
		}

		if ($this->User->save($this->request->data, true, $fields)) {
			$result = array('status' => 0);
		} else {
			$result = array('status' => 1, 'errors' => $this->User->validationErrors);
		}

		$this->set(array(
			'result' => $result,
			'_serialize' => 'result'
		));
	}
}