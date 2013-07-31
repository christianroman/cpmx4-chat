module.exports = function(grunt) {

    // let do not repeat the css paths twice
    var cssPaths = ["components/bootstrap/less", "components/font-awesome/less", "assets/css"];

    var jsFiles = [
	"components/jquery/jquery.js",
	"components/underscore/underscore.js",
	"components/bootstrap/js/bootstrap-transition.js",
	"components/bootstrap/js/bootstrap-alert.js",
	"components/bootstrap/js/bootstrap-modal.js",
	"components/bootstrap/js/bootstrap-dropdown.js",
	"components/bootstrap/js/bootstrap-scrollspy.js",
	"components/bootstrap/js/bootstrap-tab.js",
	"components/bootstrap/js/bootstrap-tooltip.js",
	"components/bootstrap/js/bootstrap-popover.js",
	"components/bootstrap/js/bootstrap-button.js",
	"components/bootstrap/js/bootstrap-collapse.js",
	"components/bootstrap/js/bootstrap-carousel.js",
	"components/bootstrap/js/bootstrap-typeahead.js",
	"assets/js/*.js"
	    ];

    // Project configuration.
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	concat: {
	    dist: {
		      src: jsFiles,
	dest: 'public/js/main.js'
		  }
	},
	watch: {
		   src: {
			    files: ['assets/**', 'components/**', 'Gruntfile.js'],
					     tasks: ['default']
					     },
					     options: {
	// otherwise my smart express
	// setup won't work
	nospawn: true
	}
	},
	uglify: {
	dist: {
	src: '<%= concat.dist.dest %>',
	dest: 'public/js/main.js'
	}
	},
	jshint: {
	all: ['assets/js/**/*.js'],
			     options: {
			     curly: true,
			     eqeqeq: true,
			     immed: true,
			     latedef: true,
			     newcap: true,
			     noarg: true,
			     sub: true,
			     undef: true,
			     unused: true,
			     boss: true,
			     eqnull: true,
			     browser: true,
			     globals: {
			     console: true,
			     io: true,
			     $: true,
			     _: true
			     }
			     }
			     },
			     less: {
			     development: {
			     options: {
			     paths: cssPaths
			     },
			     files: {
			     "public/css/main.css": "assets/css/main.less"
			     }
			     },
			     production: {
			     options: {
			     paths: cssPaths,
			     yuicompress: true
			     },
			     files: {
			     "public/css/main.css": "assets/css/main.less"
			     }
			     }
			     },
			     copy: {
			     main: {
			     files: [{ 
			     expand: true,
			     flatten: true,
			     src: ['components/font-awesome/font/*'],
			     dest: 'public/font/'
			     }]
			     }
			     }
			     });

	// Load from NPM packages
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'jshint', 'less:development', 'copy']);

	// Production task
	grunt.registerTask('production', ['default', 'uglify', 'less:production']);
	};
