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

		// Allow every page without the admin prefix
		if (empty($this->request->params['prefix'])) {
			$this->Auth->allow('*');
		}

		if ($this->renderJson) {
			$this->RequestHandler->renderAs($this, 'json');
		}
	}

	/**
	 * Call this method to display a "not authorized"
	 * message.
	 */
	protected function _notAuthorized() {
		$this->RequestHandler->renderAs($this, 'json');
		$this->response->statusCode(401);
		$this->set(array(
			'message' => __('You are not authorized to view this location.'),
			'_serialize' => 'message'
		));
	}
}

