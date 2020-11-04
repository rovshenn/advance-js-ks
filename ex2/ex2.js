function NotesManager () {    
    this.notes = [];    
};    

NotesManager.prototype.addNote = function (note) {
    $("#notes").prepend(
        $("<a href='#'></a>")
        .addClass("note")
        .text(note)
    );
};

NotesManager.prototype.addCurrentNote = function () {
    var current_note = $("#note").val();

    if (current_note) {
        this.notes.push(current_note);
        this.addNote(current_note);
        $("#note").val("");
    }
};

NotesManager.prototype.showHelp = function () {
    $("#help").show();

    document.addEventListener("click",function __handler__(evt){
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        document.removeEventListener("click",__handler__,true);
        this.hideHelp();
    },true);
};

NotesManager.prototype.hideHelp =  function () {
    $("#help").hide();
}

NotesManager.prototype.handleOpenHelp = function (evt) {
    if (!$("#help").is(":visible")) {
        evt.preventDefault();
        evt.stopPropagation();

        this.showHelp();
    }
};

NotesManager.prototype.handleAddNote = function (evt) {
    this.addCurrentNote();
};

NotesManager.prototype.handleEnter = function (evt) {
    if (evt.which == 13) {
        this.addCurrentNote();
    }
};

NotesManager.prototype.handleDocumentClick = function (evt) {
    $("#notes").removeClass("active");
    $("#notes").children(".note").removeClass("highlighted");
}

NotesManager.prototype.handleNoteClick = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    $("#notes").addClass("active");
    $("#notes").children(".note").removeClass("highlighted");
    $(evt.target).addClass("highlighted");
}

NotesManager.prototype.init = function () {
    // build the initial list from the existing `notes` data
    var html = "";
    for (i=0; i< this.notes.length; i++) {
        html += "<a href='#' class='note'>" + this.notes[i] + "</a>";
    }
    $("#notes").html(html);

    // listen to "help" button
    $("#open_help").bind("click",this.handleOpenHelp);

    // listen to "add" button
    $("#add_note").bind("click",this.handleAddNote);

    // listen for <enter> in text box
    $("#new_note").bind("keypress",this.handleEnter);

    // listen for clicks outside the notes box
    $(document).bind("click",this.handleDocumentClick);

    // listen for clicks on note elements
    $("#notes").on("click",".note",this.handleNoteClick);
}

NotesManager.prototype.loadData = function (data) {
    this.notes = this.notes.concat(data);    
}
    
//    const publicApi = {
//        init: init,
//        loadData: loadData
//    };
//    
//    return publicApi;


var notes = [
    "This is the first note I've taken!",
    "Now is the time for all good men to come to the aid of their country.",
    "The quick brown fox jumped over the moon."
];

const manageNotes = new NotesManager();

manageNotes.loadData(notes);
manageNotes.init.bind(manageNotes);
$(document).ready(manageNotes.init);

    