// One Thing App - Vanilla JS Implementation

class OneThingApp {
    constructor() {
        this.state = {
            items: [],
            newItem: ''
        };
        
        this.elements = {};
        this.init();
    }

    init() {
        this.bindElements();
        this.setupEventListeners();
        this.render();
    }

    bindElements() {
        this.elements.list = document.querySelector('ol');
        this.elements.input = document.querySelector('input[type="text"]');
        this.elements.clearButton = document.querySelector('button');
    }

    setupEventListeners() {
        // Input field event listeners
        this.elements.input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.addItem();
            }
        });

        // Clear button event listener
        this.elements.clearButton.addEventListener('click', () => {
            this.reset();
        });
    }

    // DOM helper functions
    createElement(tag, className = '', content = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    }

    updateInputVisibility() {
        const inputContainer = this.elements.input.parentElement;
        inputContainer.style.display = this.state.items.length < 7 ? 'block' : 'none';
    }

    renderListItem(item, index) {
        const li = this.createElement('li', item.checked ? 'checked' : '');
        
        const label = this.createElement('label');
        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.checked;
        
        // Add event listener for checkbox
        checkbox.addEventListener('change', (e) => {
            this.toggleItem(index, e.target.checked);
        });
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + item.text));
        li.appendChild(label);
        
        return li;
    }

    render() {
        // Clear existing list
        this.elements.list.innerHTML = '';
        
        // Render all items
        this.state.items.forEach((item, index) => {
            const listItem = this.renderListItem(item, index);
            this.elements.list.appendChild(listItem);
        });
        
        // Update input visibility
        this.updateInputVisibility();
    }

    // Core app methods (matching Vue.js functionality)
    addItem() {
        const text = this.elements.input.value.trim();
        if (text) {
            this.state.items.push({
                text: text,
                checked: false
            });
            this.elements.input.value = '';
            this.render();
        }
    }

    toggleItem(index, checked) {
        this.state.items[index].checked = checked;
        this.render();
    }

    reset() {
        this.state.items = [];
        this.render();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OneThingApp();
});