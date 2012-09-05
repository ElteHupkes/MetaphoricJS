<?php
/**
 * Controller for posts
 * @author Elte Hupkes
 */
class PostsController extends AppController {
	public $renderJson = true;
	
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

	/**
	 * Adds a post
	 */
	public function admin_add() {

	}

	/**
	 * Updates an existing post
	 */
	public function admin_edit() {

	}
}
