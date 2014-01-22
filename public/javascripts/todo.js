window.Todo = {

	initialize: function() {
		console.log('initializing...');
		var self = this;
		var newTodoTemplate = '<form action="/create" method="POST">\
		<li class="todoItem">\
    			<input type="hidden" class="hiddenCheckBox" name="done" value="0">\
    			<input type="checkbox" class="checkBox" name="done" value="1" >\
    			<input class="title thin" type="text" name="title" placeholder="Title" autocomplete="off" required>\
    			<input class="description thin" type="" name="desc" placeholder="Description" autocomplete="off">\
    			<input class="button" type="submit" value="Save">\
    		</li>\
		</form> ';

		// EVENT LISTENERS
		$('.checkBox').on('change', function(event) {
			var target;
			if (event.target.checked) {
				target = $(event.target);
			} else {
				target = $(event.target).siblings('input[type=hidden]');
			}
			target.parent().toggleClass('done');
			self.updateTodo(target);
		});

		$('.title, .description').on('change', function(event) {
			self.updateTodo($(event.target));
		});

		$(document).on('focus', '.title, .description', function(event) {
			$(event.target).parent().addClass('active');
		});

		$(document).on('blur', '.title, .description', function(event) {
			$(event.target).parent().removeClass('active');
		});

		$(document).on('click', '.delete', function(event) {
			$(event.target).parent().css({position: 'relative'}).animate({left: 5000}, 600, function(){ $(this).remove(); });
			self.deleteTodo($(event.target));
		});

		$(document).on('click', '#newTodo', function(event) {
			$('.todoContainer ul').append(newTodoTemplate);
		});
	},

	createTodo: function(target) {
		var id = target.parent().attr('data-id');
		$.ajax({
			url: '/create',
			type: 'POST',
			data: target.serialize()
		});
	},

	updateTodo: function(target) {
		var id = target.parent().attr('data-id');
		$.ajax({
			url: '/' + id,
			type: 'PUT',
			data: target.serialize()
		});
	},

	deleteTodo: function(target) {
		var id = target.parent().attr('data-id');
		$.ajax({
			url: '/' + id,
			type: 'DELETE'
		});
	}
}

$(function(){window.Todo.initialize()});