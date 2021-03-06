const lintStream = require("jslint").LintStream,
    path = require('path');

let lint;

function malta_lint(o, options) {

	const self = this,
		start = new Date(),
        pluginName = path.basename(path.dirname(__filename));

    let msg;

	options = options || {};

	options.node = 'node' in options ? !!options.node : true;
	options.browser = 'browser' in options ? !!options.browser : true;
	options.eval = 'eval' in options ? !!options.eval : true;
	options.single = 'single' in options ? !!options.single : true;
	options['this'] = 'this' in options ? !!options['this'] : true;
	options.white = 'white' in options ? !!options.white : true;
	options['for'] = 'for' in options ? !!options['for'] : true;
	

	lint = lint || new lintStream(options || {});

	return function (solve, reject){

		lint.write({file: o.name, body: o.content});
		
		lint.on('data', function (chunk, encoding, callback) {
			self.log_info('Jslint says'.invert());
			
			let errs = chunk.linted.errors,
				out, i=0;
			for (e in errs) {
				if (e && errs[e] && 'raw' in errs[e]){
					i++;
					out = self.utils.replaceAll(
						errs[e].raw,
						errs[e],
						{delim : ['{', '}']}
					).red() + ' @line ' + (errs[e].line+'').yellow();
					self.log_info(out)
				}
			}
			i == 0 && self.log_info(' Jslint shuts up'.underline());
			self.log_info('end of Jslint sentences'.invert());
		});

		solve(o);
		self.notifyAndUnlock(start, msg);
	};
}
malta_lint.ext = ['js', 'coffee', 'ts'];
module.exports = malta_lint;