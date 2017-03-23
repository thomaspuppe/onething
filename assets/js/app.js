(function () {

	var STORAGE_KEY = 'todos-vuejs';

	var storage = {
		fetch: function () {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function (items) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		}
	};

	var filters = {
		unchecked: function (items) { return items.filter(function(item){ return !item.checked; }) },
		checked: function (items) { return items.filter(function(item){ return item.checked; }) }
	};

	new Vue({
		el: '#app',
		data: {
			items: storage.fetch(),
			newItem: ''
		},
		watch: {
			items: {
				deep: true,
				handler: storage.save
			}
		},
		computed: {
			numberOfCheckedItems: function() {
				return filters.checked(this.items).length;
			}
		},
		methods: {
			addItem: function () {
				var text = this.newItem.trim();
				if (text) {
					this.items.push({
						text: text,
						checked: false
					});
					this.newItem = '';
				}
			},
			reset: function () {
				this.items = [];
			},
			cleanup: function () {
				this.items = filters.unchecked(this.items);
			}
		}
	});

})();
