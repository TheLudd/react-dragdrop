/**
 * Created by itaysh on 8/3/15.
 */

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        umd: {
            all: {
                options: {
                    src: 'DragDropMixin.js',
                    dest: 'dist/DragDropMixin.js',
                    objectToExport: 'DragDropMixin',
                    amdModuleId: 'DragDropMixin',
                    deps: {
                        'default': ['lodash']
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-umd');

};