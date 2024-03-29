# quizshow

a collaborative realtime quiz show

![screenshot](https://raw.github.com/ecarter/quizshow/master/screenshot.png)

A app created to present game show style trivia and questions among 
a group of users on mutliple connections and devices in realtime.

**Created for fun and meant to be fun.**

_Quizshow in its current form is a barely alpha prototype._

## Requires

* [Node.js](http://nodejs.org)
* [npm](http://npmjs.org)
* [mongodb](http://mongodb.org)

## Dependencies

* [express](http://expressjs.com)
* [jade](http://jade-lang.com)
* [mongoose](http://mongoosejs.com)
* [socket.io](http://socket.io)

## Install

    $ git clone https://github.com/ecarter/quizshow.git
    $ cd quizshow
    $ npm install
    $ npm link # optional, but required for quizshow(1)

## Examples

First, load the example data into mongo with `quizshow(1)` cli tool.

__Import triva example:__

    $ quizshow --import examples/trivia.txt

__Import questions example:__

    $ quizshow --import examples/questions.json

_Questions from [MoxQuizz]() via [QuizParser](https://github.com/danielmahon/QuizParser)_

__Start the show!__

    $ npm start

Open the app in your browser [localhost:3000](http://localhost:3000)

## Usage `quizshow(1)`

    $ quizshow -h

      Usage: quizshow [options]

      Options:

        -h, --help             output usage information
        -V, --version          output the version number
        -i, --import <file>    import quiz data
        -c, --config <config>  use config file
        --host <localhost>     mongodb host
        --db <quizshow>        mongo database

      Examples:

        $ quizshow -i examples/questions.json
        $ quizshow -i examples/questions.json -c config.js

## License

MIT

