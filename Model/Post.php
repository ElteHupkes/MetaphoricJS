<?php
/**
 * Model for posts
 *
 * @author Elte Hupkes
 */
class Post extends AppModel {
	/**
	 * Validation rules
	 * @var array
	 */
	public $validate = array(
		'title' => array(
			'rule' => 'notEmpty',
			'message' => 'This field is required',
			'required' => true
		)
	);

	/**
	 * @var array
	 */
	public $order = array('created' => 'desc');
}