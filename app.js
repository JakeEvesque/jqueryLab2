let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
//let sentences = ['ten ent eate', 'Too ato too', 'oat itain oat', 'itant eate anot', 'nee ene ate'];
let currentSentence = -1;
let sentence = {
    text: "",
    currentPos: 0,
    startTime: null,
    words: 0,
    errors: 0,
    reset: function (){
        currentSentence = -1;
        this.currentPos = 0;
        this.words = 0;
        this.errors = 0;
        this.set();
    },
    len: function () {
        return this.text.length;
    },
    set: function (){
        currentSentence++;    
        if (currentSentence > sentences.length-1){
            var endTime = new Date();

            var ts = endTime.getTime() - this.startTime.getTime();
            //alert(ts/60000);
            var wordsPerMin = (this.words / (ts/60000)) - (2 * this.errors);
            if (confirm("You typed " + wordsPerMin.toFixed(0) + " words per minute.  Play again?")){
                this.reset();
            }
            return;
        }

        this.text = sentences[currentSentence];
        var wordList = this.text.split(" ");
        this.words += wordList.length;
        this.currentPos = 0;
        let displayString = "";
        for(let s in this.text){
            displayString += "<span class='displayChar' id='displayChar" + s + "'>" +  this.text[s] + "</span>";
        }
        $("#sentence").html(displayString);
        $(".displayChar").each(function () {
            $(this).removeClass("highlight");
        });
        $("#displayChar" + this.currentPos).addClass("highlight");
        $("#target-letter").html(this.text[this.currentPos]);
    },
    checkChar: function (char) {
        if (currentSentence === 0 && this.currentPos === 0){
            this.startTime = new Date();
        }
        if (char == this.text[this.currentPos]){
            this.currentPos++;
            //console.log(this.currentPos + " -> "+  this.len());

            if (this.currentPos >= this.len()){
                this.set();
                $("#feedback").html("");
                return;
            }
            $("#feedback").html($("#feedback").html() + "<span class='glyphicon glyphicon-ok'>  </span>");
            $(".displayChar").each(function () {
                $(this).removeClass("highlight");
            });
            $("#displayChar" + this.currentPos).addClass("highlight");
            $("#target-letter").html(this.text[this.currentPos]);
        } else {
            $("#feedback").html($("#feedback").html() + "<span class='glyphicon glyphicon-remove'>  </span>");
            this.errors++;
        }
    } 
}




$().ready(function () {
    $("#keyboard-upper-container").addClass('hide');

    $(document.body).on("keypress", function (event) {
        sentence.checkChar(event.key);
    });

    $(document.body).on("keydown", function (event){        
        let keyCode = getAsciiCode(event.which, event.shiftKey);
        if (keyCode === 16){
            $("#keyboard-upper-container").removeClass('hide');
            $("#keyboard-lower-container").addClass('hide');
        } 
        $("#" + keyCode).addClass("highlight");

        
    });

    $(document.body).on("keyup", function (event){        
        let keyCode = getAsciiCode(event.which, event.shiftKey);

        if (keyCode === 16){
            $("#keyboard-upper-container").addClass('hide');
            $("#keyboard-lower-container").removeClass('hide');
        }
        $("#" + keyCode).removeClass("highlight");
        
    });
    
    sentence.set();
});

function getAsciiCode(keyCode, shifted){
    if (keyCode >= 65 && keyCode <= 90 && !shifted){
        keyCode += 32;
    }
    if (keyCode === 192 && !shifted){
        keyCode = 96;
    }
    if (keyCode === 173 && !shifted){
        keyCode = 45;
    }
    if (keyCode === 219 && !shifted){
        keyCode = 91;
    }
    if (keyCode === 221 && !shifted){
        keyCode = 93;
    }
    if (keyCode === 220 && !shifted){
        keyCode = 92;
    }
    if (keyCode === 186 && !shifted){
        keyCode = 59;
    }
    if (keyCode === 222 && !shifted){
        keyCode = 39;
    }
    if (keyCode === 188 && !shifted){
        keyCode = 44;
    }
    if (keyCode === 190 && !shifted){
        keyCode = 46;
    }
    if (keyCode === 191 && !shifted){
        keyCode = 47;
    }
    if (keyCode === 189 && !shifted){
        keyCode = 45;
    }
    if (keyCode === 187 && !shifted){
        keyCode =61;
    }
    if (keyCode === 192 && shifted){
        keyCode = 126;
    }
    if (keyCode === 48 && shifted){
        keyCode = 41;
    }
    if (keyCode === 49 && shifted){
        keyCode = 33;
    }
    if (keyCode === 50 && shifted){
        keyCode = 64;
    }
    if (keyCode === 51 && shifted){
        keyCode = 35;
    }
    if (keyCode === 52 && shifted){
        keyCode = 36;
    }
    if (keyCode === 53 && shifted){
        keyCode = 37;
    }
    if (keyCode === 54 && shifted){
        keyCode = 94;
    }
    if (keyCode === 55 && shifted){
        keyCode = 38;
    }
    if (keyCode === 56 && shifted){
        keyCode = 42;
    }
    if (keyCode === 57 && shifted){
        keyCode = 40;
    }
    if (keyCode === 189 && shifted){
        keyCode = 95;
    }
    if (keyCode === 187 && shifted){
        keyCode = 43;
    }
    

    return keyCode;
}