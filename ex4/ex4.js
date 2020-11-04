var Widget = {
	init: function(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert: function($where){
        if (this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    }    
}

var Button = Object.create(Widget);

Button.setup = function(width, height, label) {
    this.init(width, height);
    this.label = label || 'Default';
	this.$elem = $("<button>").text(this.label);
}

Button.render = function($where) {
	// call the parent render()
	// add a click handler -> onClick
    this.insert($where);
    this.$elem.click(this.onClick.bind(this) );
};

Button.onClick = function(evt) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
	console.log("Button " + this.label + " clicked!");
};

$(document).ready(function(){
	var $body = $(document.body);
	var btn1 = Object.create(Button);
    btn1.setup(20 ,30, 'abc');
	var btn2 = Object.create(Button);
    btn2.setup(50 ,70, 'dac');

	btn1.render($body);
	btn2.render($body);
});
