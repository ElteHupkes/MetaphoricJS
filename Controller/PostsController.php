<?php
/**
 * Controller for posts
 * @author Elte Hupkes
 */
/**
 * @property Post $Post
 */
class PostsController extends AppController {
	public $renderJson = true;
	
	/**
	 * Returns a list of posts
	 */
	public function index() {
		$posts = $this->Post->find('all');
		$this->set(array(
			'posts' => $posts,
			'_serialize' => 'posts'
		));
	}

	/**
	 * Adds a post
	 */
	public function admin_add() {
		unset($this->request->data['Post']['id']);
		$this->request->data['Post']['author_id'] = $this->Auth->user('id');
		$this->Post->create();
		$fields = array('title', 'preview', 'author_id', 'content', 'published');
		if ($this->Post->save($this->request->data, true, $fields)) {
			$this->set(array(
				'result' => array(
					'status' => 0,
					'post_id' => $this->Post->id
				),
				'_serialize' => 'result'
			));
		} else {
			$this->set(array(
				'result' => array(
					'status' => 1,
					'validationErrors' => $this->Post->validationErrors
				),
				'_serialize' => 'result'
			));
		}
	}

	/**
	 * Updates an existing post
	 */
	public function admin_edit($id = null) {
		$this->Post->id = $id;
		if (!$this->Post->exists()) {
			throw new NotFoundException;
		}
		$fields = array('title', 'preview', 'content', 'published');
		if ($this->Post->save($this->request->data, true, $fields)) {
			$this->set(array(
				'result' => array(
					'status' => 0,
					'post_id' => $this->Post->id
				),
				'_serialize' => 'result'
			));
		} else {
			$this->set(array(
				'result' => array(
					'status' => 1,
					'validationErrors' => $this->Post->validationErrors
				),
				'_serialize' => 'result'
			));
		}
	}
}
