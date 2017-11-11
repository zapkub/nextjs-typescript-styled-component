"use strict";

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _typescript = require("typescript");

var ts = _interopRequireWildcard(_typescript);

var _babelCore = require("babel-core");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function watch(rootFileNames, options) {
    var files = {};
    // initialize the list of files
    rootFileNames.forEach(function (fileName) {
        files[fileName] = { version: 0 };
    });
    // Create the language service host to allow the LS to communicate with the host
    var servicesHost = {
        getScriptFileNames: function getScriptFileNames() {
            return rootFileNames;
        },
        getScriptVersion: function getScriptVersion(fileName) {
            return files[fileName] && files[fileName].version.toString();
        },
        getScriptSnapshot: function getScriptSnapshot(fileName) {
            if (!fs.existsSync(fileName)) {
                return undefined;
            }
            return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
        },
        getCurrentDirectory: function getCurrentDirectory() {
            return process.cwd();
        },
        getCompilationSettings: function getCompilationSettings() {
            return options;
        },
        getDefaultLibFileName: function getDefaultLibFileName(options) {
            return ts.getDefaultLibFilePath(options);
        },
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        readDirectory: ts.sys.readDirectory
    };
    // Create the language service files
    var services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());
    // Now let's watch the files
    rootFileNames.forEach(function (fileName) {
        // First time around, emit all files
        emitFile(fileName);
        // Add a watch on the file to handle next change
        fs.watchFile(fileName, { persistent: true, interval: 250 }, function (curr, prev) {
            // Check timestamp
            if (+curr.mtime <= +prev.mtime) {
                return;
            }
            // Update the version to signal a change in the file
            files[fileName].version++;
            // write the changes to disk
            emitFile(fileName);
        });
    });
    function emitFile(fileName) {
        var output = services.getEmitOutput(fileName);
        if (!output.emitSkipped) {
            console.log("Emitting " + fileName);
        } else {
            console.log("Emitting " + fileName + " failed");
            logErrors(fileName);
        }
        output.outputFiles.forEach(function (o) {
            if (!/.+\.map/.test(o.name)) {
                var babelResult = (0, _babelCore.transform)(o.text, {
                    sourceRoot: path.join(__dirname, '..'),
                    extends: path.join(__dirname, '../.babelrc')
                });
                fs.writeFileSync(o.name, babelResult.code, "utf8");
            } else {
                fs.writeFileSync(o.name, o.text, "utf8");
            }
        });
    }
    function logErrors(fileName) {
        var allDiagnostics = services.getCompilerOptionsDiagnostics().concat(services.getSyntacticDiagnostics(fileName)).concat(services.getSemanticDiagnostics(fileName));
        allDiagnostics.forEach(function (diagnostic) {
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (diagnostic.file) {
                var _diagnostic$file$getL = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start),
                    line = _diagnostic$file$getL.line,
                    character = _diagnostic$file$getL.character;

                console.log("  Error " + diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
            } else {
                console.log("  Error: " + message);
            }
        });
    }
}
// Start the watcher
var path = require('path');
var glob = require('glob');
glob('**/*.ts*', { ignore: ['**/bin/**', '**/node_modules/**'], root: path.join(__dirname, '..') }, function (err, files) {
    var tsconfig = require('../tsconfig.json');
    var config = ts.convertCompilerOptionsFromJson(tsconfig.compilerOptions, path.join(__dirname, '..'));
    watch(files, config.options);
});
//# sourceMappingURL=development.js.map

;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(watch, "watch", "unknown");
}();

;