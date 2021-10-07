$(document).ready(function() {
    var rows = 4, columns = 4;
    var pieces = "";
    function divideImgToPieces() {
        for(var i = 0, top = 0, order=0; i < rows; i++, top -= 100) {
            for(var j = 0, left = 0; j < columns; j++, left -= 100, order++) {
                pieces = pieces + "<div style='background-position:" + left + "px " + top + "px;' class='piece' data-order=" + order + "></div>";
            }      
        }
    }
    function hideImgPieces() {
        var empty = "";
        for(var i = 0; i < rows; i++) {
            for(var j = 0; j < columns; j++) {
                empty = empty + "<div style='background-image:none;' class='piece droppableSpace'></div>";
            }      
        }
        $('#puzzleContainer').html(empty);
    }
    divideImgToPieces();
    $('#puzzleContainer').html(pieces);
    function gameStart() {
        var pieces = $('#puzzleContainer div');
        pieces.each(function() {
            var leftPosition = Math.floor(Math.random() * 290) + "px";
            var topPosition = Math.floor(Math.random() * 290) + "px";
            $(this).addClass("draggablePiece").css({
                position: "absolute",
                left: leftPosition,
                top: topPosition
            });
            $('#pieceContainer').append($(this));
        });
        hideImgPieces();
        $("#btnStart").hide();
        $("#btnReset").show();
        implementLogic();
    }
    $('#btnStart').click(function(){
        gameStart();
    });
    function checkIfPuzzleSolved() {
        if($("#puzzleContainer .droppedPiece").length != 16) {
            //console.log("not full: " + $("#puzzleContainer .droppedPiece").length );
            return false;
        }
        for (var k=0; k<16; k++) {
            var item = $("#puzzleContainer .droppedPiece:eq(" + k + ")");
            var order = item.data("order");
            console.log ("order: " + order);
            console.log ("K: " + k);
            
            if(k != order) {
                //$("#piecesContainer").text('Ouch! Try Again');
                console.log('Ouch! Try Again');
                return false;
            } 
        }
        $(".game-completed").removeClass('d-none');
        
    }
    function implementLogic() {
        $(".draggablePiece").draggable();
        $(".droppableSpace").droppable({
            drop: function(event, ui) {
                var draggableElement = ui.draggable;
                var droppedOn = $(this);
                droppedOn.addClass("piecePresent");
                $(draggableElement).addClass("droppedPiece")
                    .css({
                        top: 0,
                        left: 0,
                        position: "relative"
                    }).appendTo(droppedOn);
                    checkIfPuzzleSolved();
            }
        });
    }
    $(document).on("click", "#reset", function(event) {
        window.location.replace(window.location.href);
    });
    $(document).on("click", "#btnReset", function(event) {
        window.location.replace(window.location.href);
    });
});