module.exports = function(grunt) {

var srcFiles = [
    // TODO(alpert): Unify these paths
    "src/core.js",
    "src/util.js",
    "build/src/info-tip.js",
    "build/src/prop-check-box.js",
    "build/src/renderer.js",
    "build/src/editor.js",
    "src/widgets.js",
    "build/src/components/number-input.js",
    "build/src/components/graph-settings.js",
    "build/src/components/graph.js",
    "build/src/widgets/input-number.js",
    "build/src/widgets/interactive-graph.js",
    "build/src/widgets/interactive-number-line.js",
    "build/src/widgets/protractor.js",
    "build/src/widgets/radio.js",
    "build/src/widgets/dropdown.js",
    "build/src/widgets/table.js",
    "build/src/widgets/categorization.js",
    "build/src/widgets/plotter.js",
    "build/src/widgets/expression.js",
    "build/src/widgets/orderer.js",
    "build/src/widgets/transformer.js",
    "build/src/answer-area-editor.js",
    "build/src/hint-editor.js",
    "build/src/item-renderer.js",
    "build/src/item-editor.js",
    "build/src/editor-page.js"
];

var testJsxSuccess = "test -s " + srcFiles.join(" && test -s ");

grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    shell: {
        jsx: {
            // jsx always returns non-zero, so error if any of the required
            // files were not built
            command: "node_modules/react-tools/bin/jsx -x jsx src/ build/src/ && " + testJsxSuccess,
            options: {
                stderr: true,
                stdout: true,
                failOnError: true
            }
        },
        gitRevision: {
            command: 'echo "// commit `git rev-parse HEAD`" > build/git-revision.js',
            options: {
                stderr: true,
                stdout: true,
                failOnError: true
            }
        }
    },
    concat: {
        options: {
            banner: "/*! Perseus | http://github.com/Khan/perseus */\n",
            separator: ";"
        },
        dist: {
            src: ["build/git-revision.js"].concat(srcFiles),
            dest: "build/perseus.js"
        }
    }
});

grunt.loadNpmTasks("grunt-contrib-concat");
grunt.loadNpmTasks("grunt-shell");

grunt.registerTask("default", ["shell:jsx", "shell:gitRevision", "concat"]);

};
