# Parse HTTP logs

Parse HTTP logs using nodejs. While this repo is functional, it is more or less an exercise in clean coding and TDD. In practice, we'd probably want a more efficient tool than a command line nodejs script.

## Requires

 - `Node >= 16.0.0`
 - `npm >= 8.0.0`
 - `yarn >= 3.0.0`

## Setup

Run `yarn` to install dependencies.

Run `yarn build` to compile files to the `dist` folder.

Run `yarn readfile --filename=PATH/TO/FILE` to extract data from a log file. The number of unique ip addresses in the file, as well as the three most active ip addresses and most visited urls, will be logged to console.

## Assumptions

This program assumes that the log file has one log per line, and uses the [combined log format](https://httpd.apache.org/docs/2.4/logs.html). If a line in the file fails to parse, a warning will be logged to console and the line will be skipped.

See https://www.npmjs.com/package/common-log-format for a more efficient tool if you just want to turn a combined log format file into json.

This repo avoids using regex so that it can be a bit more readable, and can raise more custom validation errors if needed, but this will come at the expense of efficiency (though, if we want to read a log file fast, we should probably use a different language).
