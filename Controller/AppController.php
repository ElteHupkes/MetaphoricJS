<?php
/**
 * Application controller for Metaphoric.nl
 *
 * @author Elte Hupkes
 */
App::uses('Controller', 'Controller');

/**
 * The application controller sets application wide
 * components and handles basic authentication.
 *
 * @property RequestHandlerComponent $RequestHandler
 * @property SessionComponent $Session
 * @property AuthComponent $Auth
 */
class AppController extends Controller {
	/**
	 * Components
	 * @var array
	 */
	public $components = array(
		'Session',
		'Auth',
		'RequestHandler'
	);
	
	/**
	 * Handles pre-action logic
	 */
	public function beforeFilter() {
		parent::beforeFilter();
		
		$this->Auth->authenticate = array(
			AuthComponent::ALL => array(
				'userModel' => 'User',
				'recursive' => -1,
				'fields' => array(
					'username' => 'email',
					'password' => 'password'
				),
			), 'Bcrypt'
		);
	}
	
	/**
	 * Authorization method, currently very simple: everyone
	 * who is logged in can access admin functionality; Non-admin
	 * functionality can be accessed by anyone.
	 */
	public function isAuthorized() {
		return ($this->Auth->loggedIn() || empty($this->request->params['prefix']));
	}
}

