//group 5
//imports
const Discord = require('discord.js');
const syllable = require('syllable');
const getRhymes = require('get-rhymes');

var auth = require('./auth.json');
// initialize the bot
const bot = new Discord.Client();
//login token
bot.login('NTQyMTExNzIxNTQwODEyODEx.DzzJdg.PUX-CTEjU_QjWmz3Khq5xAU_OpE');

bot.on('ready', () => {
    console.log("I'm ready!");
});

bot.on('message', message => {
  // If the message is "!haiku", will probably make it run automatically later
  if (message.content == '!haiku') {
    var first = 5;
    var second = 7;
    var third = 5;

    message.channel.fetchMessages({limit: 100})
    .then(messages => console.log(`Received ${messages.size} messages`))
    .catch(console.error);

    //
    //When a promise is fulfilled, the value that it returns is passed as an argument to the function you put in .then(). 

    message.channel.fetchMessages({limit: 100}).then(messageCollection => {
        messageArray = Array.from(messageCollection);
        for (var i = 0; i < messageArray.length; i++) {
            messageArray[i] = messageArray[i].toString().substring(19); //substring 19 to ignore ID before message text
        }
        
        //scramble array so selected message is potentially different each time
        messageArray = shuffleArray(messageArray);

        //three stanzas
        var stanzaOne = "";
        var stanzaTwo = "";
        var stanzaThree = "";
        var haiku = "";
        var selected = false; //to prevent another 5 syllable from overwriting the first stanza

        for (var i = 0; i < messageArray.length; i++) {
            if (syllable(messageArray[i]) == first && selected == false) {
                stanzaOne = messageArray[i];
                selected = true;
            } else if (syllable(messageArray[i]) == second) {
                stanzaTwo = messageArray[i];
            } else if (syllable(messageArray[i]) == third) {
                stanzaThree = messageArray[i];
            }
        }

        //compile haiku
        haiku += stanzaOne + "\n" + stanzaTwo + "\n" + stanzaThree;

        console.log(haiku);
        //send message
        message.channel.send(haiku);

    });

  }
});

bot.on('message', message => {
  
  if (message.content == "!random") {

    message.channel.fetchMessages({limit: 100})
    .then(messages => console.log(`Received ${messages.size} messages`))
    .catch(console.error);

    //
    //When a promise is fulfilled, the value that it returns is passed as an argument to the function you put in .then(). 

    message.channel.fetchMessages({limit: 100}).then(messageCollection => {
        messageArray = Array.from(messageCollection);
        for (var i = 0; i < messageArray.length; i++) {
            messageArray[i] = messageArray[i].toString().substring(19); //substring 19 to ignore ID before message text
        }

        
        
        //scrable array so selected message is potentially different each time
        messageArray = shuffleArray(messageArray);
        //start poem off with first stanza
        var poem = messageArray[0];

        //identify last word of stanza
        var lastword = messageArray[0].substring(messageArray[0].lastIndexOf(" ") + 1);
        console.log(lastword);
        //get rhymes of the last word
        getRhymes(lastword).then(rhymeArray => {
            //console.log(rhymeArray);
            console.log(poem);
            /*
            * Start with first index in message array after the first stanza, and compare its last word to the rhymes
            * in the rhyme array. If a lastword is in the rhyme array, add that message as a new stanza.
            */
            for (var i = 1; i < messageArray.length; i++) {
                var lastword2 = messageArray[i].substring(messageArray[i].lastIndexOf(" ") + 1); 
                for (var j = 0; j < rhymeArray.length; j++) {
                    //check if last word is contained within the ending of this index of the rhyme array.
                    if (rhymeArray[j].substring((rhymeArray[j].length - 1) - lastword2.length -1).includes(lastword2)) {
                        poem += "\n" + messageArray[i];
                        //break out of the loop to prevent repeat stanzas
                        j += rhymeArray.length + 1;
                    }
                }
            }
            console.log(poem);
            //send message
            message.channel.send(poem);
        });
        

    });

  }
});

function shuffleArray(array) {
    var i, j, k
    for (k = array.length - 1; k > 0; k--) {
        i = Math.floor(Math.random() * (k + 1));
        j = array[k];
        array[k] = array[i];
        array[i] = j;
    }
    return array;
}

//if (message.content.includes(" ") && !message.author.bot)
//save for later