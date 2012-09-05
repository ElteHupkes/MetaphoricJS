<?php
/**
 * Controller for posts
 * @author Elte Hupkes
 */
class PostsController extends AppController {
	/**
	 * Every action here has JSON output; use JSON view class.
	 */
	public $viewClass = 'JsonView';

	/**
	 * Pre-action logic.
	 */
	public function beforeFilter() {
		parent::beforeFilter();
		
		$this->RequestHandler->renderAs($this, 'json');
	}
	
	/**
	 * Returns a list of posts
	 */
	public function index() {
		$posts = array();
		$this->set(array(
			'posts' => $posts,
			'_serialize' => 'posts'
		));
	}
}
