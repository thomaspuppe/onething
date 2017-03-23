(function () {
	var data = {
		items: [],
		newItem: ''
	};
	new Vue({
		el: '#app',
		data: data,
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
			}
		}
	});

})();
