# Node-NMAP-Vulners

NPM package enabling your [NodeJs] application to interface with the features of [NMAP].  This package requires that [NMAP] is installed and available to the running node application.
If [VULNERS] script is installed, this package is able to parse the output to [NodeJs].

UPDATE 1.0.1
* Improved Service and Vulnerabilities integration

UPDATE 1.0.0 (Tommaso Pezzi)
* Forked the [node-nmap] NPM package to read and parse the Vulners script output.
  + Vulners.nse must be installed.(https://github.com/vulnersCom/nmap-vulners)


## Installation
`npm install node-nmap-vulners`

## Scan Types
* `NmapScan` - This is the core of the package and runs the NMAP command.
 
## Scan instance variables, methods, and events

* `scanResults` : Array of host objects - contains the results of the scan.
* `scanTime` : number in ms - duration of scan.
* `scanTimeout` : number in ms - scan will cancel if timeout is reached.
* `startScan()` - begins the NMAP scan.
* `cancelScan()` - kills the NMAP process.
* `'complete'` : event - returns array of host objects
* `'error'` : event - returns string with error information

## Usage

NmapScan is the core function of the package.  It emits two events: `'complete'` and `'error'`.  Both of these events return data.  All methods are easy to set up.  Simply define a variable as one of the methods, and that variable will become a new instance of NmapScan with appropriately set commands. All input accepts either a space separated string, or an array of strings to make it easier to work with a complex set of hosts.  All methods return an array of JSON objects containing information on each host.  Any key without information provided from NMAP is filled as `null`.

The return structure is:

```javascript
[  
    {  
       "hostname":"theHostname",
       "ip":"127.0.0.1",
       "mac":null,
       "openPorts":[  
          {  
             "port":80,
             "service":"http"
          },...  
        ],
       "osNmap":null, //note that osNmap is not guaranteed to be correct.
    },...]
```
### Examples

```javascript
var nmap = require('node-nmap');

nmap.nmapLocation = "nmap"; //default

//    Accepts array or comma separarted string for custom nmap commands in the second argument.
var nmapscan = new nmap.NmapScan('127.0.0.1 google.com', '-sn');

nmapscan.on('complete',function(data){
  console.log(data);
});
nmapscan.on('error', function(error){
  console.log(error);
});

nmapscan.startScan();

// returns
// [  
//    {  
//       "hostname":"localhost",
//       "ip":"127.0.0.1",
//       "mac":null,
//       "openPorts":[  

//       ],
//       "osNmap":null
//    },
//    {  
//       "hostname":"google.com",
//       "ip":"74.125.21.113",
//       "mac":null,
//       "openPorts":[  

//       ],
//       "osNmap":null
//    }
// ]

//    Accepts array or comma separarted string for nmap vulners script.
var nmapscan = new nmap.NmapScan('127.0.0.1 --script vulners');

nmapscan.on('complete',function(data){
  console.log(data);
});
nmapscan.on('error', function(error){
  console.log(error);
});

nmapscan.startScan();

// returns
// [  
//    {  
//       "hostname":"localhost",
//       "ip":"127.0.0.1",
//       "mac":null,
//       "openPorts":[  

//       ],
//       "osNmap":null
//    },
//    {  
//       "hostname":"google.com",
//       "ip":"74.125.21.113",
//       "mac":null,
//       "openPorts":[  

//       ],
//       "osNmap":null
//    }
// ]

Please open an issue if you have any questions, concerns, bugs, or critiques.

[NMAP]: <https://nmap.org/>
[NPM]: <https://www.npmjs.com/>
[NodeJs]: <https://nodejs.org/en/>
