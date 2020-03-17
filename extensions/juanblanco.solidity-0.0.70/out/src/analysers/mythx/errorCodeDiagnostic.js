"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function errorCodeDiagnostic(document, collection, analysisResult) {
    const diagnostics = [];
    analysisResult.map((entry) => {
        entry.issues
            .map(issue => {
            const position = {
                start: {
                    column: 0,
                    line: 0,
                },
                // tslint:disable-next-line:object-literal-sort-keys
                end: {
                    column: 0,
                    line: 0,
                },
            };
            // TODO: all the below should be better extracted
            if (issue.decodedLocations) {
                const decodedLocationsFiltered = issue.decodedLocations.filter(decodedLocation => decodedLocation.length > 0);
                decodedLocationsFiltered.map(locations => {
                    // vscode diagnostics starts from 0
                    position.start.line = locations[0].line - 1;
                    position.start.column = locations[0].column;
                    position.end.line = locations[1].line - 1;
                    position.end.column = locations[1].column;
                    const message = `MythX ${issue.swcID}. ${issue.description.head}`;
                    // tslint:disable-next-line:max-line-length
                    const range = new vscode.Range(new vscode.Position(position.start.line, position.start.column), new vscode.Position(position.end.line, position.end.column));
                    const severity = issue.severity.toLowerCase() === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Error;
                    const diagnostic = new vscode.Diagnostic(range, message, severity);
                    diagnostics.push(diagnostic);
                });
            }
        });
    });
    collection.set(document.uri, diagnostics);
}
exports.errorCodeDiagnostic = errorCodeDiagnostic;
//# sourceMappingURL=errorCodeDiagnostic.js.map