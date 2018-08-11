const readline = require('readline');
const events = require('events');
class _events extends events{};
const e = new _events();
const minimist = require('minimist')
const error = require('./utils/error')
const loggedIn = require('./cmds/login')
const prompt = require('prompt')
const isUserAuthenticated = require('./cmds/login')
const User = require('./models/userModel')
const ora = require('ora')
const dbCommands = require('./cmds/db');
const state = require('./utils/state.js')


module.exports = () => {


  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'help'


  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {

    case 'login':
      prompt.start();
      prompt.get(['username', 'password'], function (err, result) {

      let loginUn = result.username
      let loginPw = result.password

        // console.log('Command-line input received:');
        // console.log('  username: ' + result.username);
        // console.log('  password: ' + result.password);

        if(loginUn && loginPw){
          // define the mlab database url
          dbCommands.loginUserName = loginUn
          dbCommands.loginPassword = loginPw
          dbCommands.connectDb(function(db){
             const spinner = ora().start();

             db.on('error', console.error.bind(console, 'connection error:'));
               //lOGIN QUERY
               dbCommands.findUser(User,loginUn,loginPw,function(user){
                  if(user) {
                      spinner.stop();
                      console.log("success fully logged in");
                     //  require('./utils/state.js')(loginUserName,loginPassword);
                      // initialize the CLI if the user authenticates
                     cli.init()
                }
                else {
                    console.log("AuthenticationFailed");
                  }
               })
           })

          }
      });
      break
  }



  var cli = {};

  // Init script
  cli.init = function(){

    // Send to console, in dark blue
    console.log('\x1b[34m%s\x1b[0m','converter-cli is running');

    // Start the interface
    var _interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ''
    });

    // Create an initial prompt
    _interface.prompt();

    // Handle each line of input separately
    _interface.on('line', function(str){

      // Send to the input processor
      cli.processInput(str);

      // Re-initialize the prompt afterwards
      _interface.prompt();
    });

    // If the user stops the CLI, kill the associated process
    _interface.on('close', function(){
      process.exit(0);
    });

  };
  // cli.init()

    // Input processor
  cli.processInput = function(str){
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    // Only process the input if the user actually wrote something, otherwise ignore it
    if(str){
      // Codify the unique strings that identify the different unique questions allowed be the asked
      var uniqueInputs = [
        'login',
        'help',
        'logs',
        'exit',
        'convert',

      ];

      // Go through the possible inputs, emit event when a match is found
      var matchFound = false;
      var counter = 0;
      uniqueInputs.some(function(input){
        if(str.toLowerCase().indexOf(input) > -1){
          matchFound = true;
          // Emit event matching the unique input, and include the full string given
          e.emit(input,str);
          return true;
        }
      });

      // If no match is found, tell the user to try again
      if(!matchFound){
        console.log("Sorry, try again");
      }

    }
  };

    // Input handlers
  e.on('help',function(str){
    // cli.responders.help();
    require('./cmds/help')(str)
  });

  e.on('logs',function(str){
    console.log(dbCommands.loginUserName,dbCommands.loginPassword);
    // define the mlab database url
    dbCommands.connectDb(function(db){
      const spinner = ora().start()
      db.on('error', console.error.bind(console, 'connection error:'));
      dbCommands.findUser(User,dbCommands.loginUserName,dbCommands.loginPassword,function(user){

        if(user) {
            spinner.stop()
            require('./cmds/showLogs')(dbCommands.loginUserName)
        }
        else {
          console.log("You are not authenticated");
        }
      })
    })
  });
}
