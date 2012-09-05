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
	 * Convenience flag for subclasses to override;
	 * sets all the parameters to respond with JSON.
	 * @var bool
	 */
	public $renderJson = false;

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
		$this->Auth->authorize = 'Controller';

		// Allow everything; isAuthorized will take care of denying admin pages.
		$this->Auth->allow('*');

		if ($this->renderJson) {
			$this->RequestHandler->renderAs($this, 'json');
			$this->viewClass = 'JsonView';
		}
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

