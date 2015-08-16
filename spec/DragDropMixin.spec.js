/**
 * Created by itaysh on 8/12/15.
 */

var DragDropMixin = require('../dist/DragDropMixin');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
//var jsdom = require('jsdom');

describe('DragDropMixin', function () {

    var element = null,
        elementDrag = null,
        elementDrop = null;

    beforeEach(function () {
        //var html = '<html><body></body></html>';
        //global.document = jsdom.jsdom(html);
        //global.window = document.parentWindow;
        //document.querySelector('body').addEventListener('click', function() {
        //    console.log('clicked');
        //});

        //console.log(window);

        //spyOn(DragDropMixin, 'handleDrop').and.callThrough();

        var Comp = React.createClass({
            mixins: [DragDropMixin],
            render: function render() {
                return React.createElement('div', {});
            }
        });

        var CompDrag = React.createClass({
            mixins: [DragDropMixin],
            dragDrop: function dragDrop() {
                return {
                    draggable: true,
                    dropType: 'test',
                    dataTransfer: {
                        test: true
                    }
                };
            },
            render: function render() {
                return React.createElement('div', {});
            }
        });

        var CompDrop = React.createClass({
            mixins: [DragDropMixin],
            dragDrop: function dragDrop() {
                var self = this;
                return {
                    droppable: true,
                    acceptableTypes: ['test'],
                    drop: function (data) {
                        console.log(123);
                        self.setState(data);
                    }
                };
            },
            render: function render() {
                return React.createElement('div', {});
            }
        });

        element = React.createElement(Comp, {});
        elementDrag = React.createElement(CompDrag, {});
        elementDrop = React.createElement(CompDrop, {});

    });

    it('should load', function () {
        expect(DragDropMixin).toBeDefined();
    });

    it('should throw when called without dragDrop function', function () {
        expect(TestUtils.renderIntoDocument.bind(null, element)).toThrow();
    });

    it('should attach drag functionality when configured', function () {
        var rendered = TestUtils.renderIntoDocument(elementDrag);

        expect(rendered.getDOMNode().draggable).toBe(true);
    });

    it('should attach drop functionality when configured', function () {
        var renderedDrag = TestUtils.renderIntoDocument(elementDrag);
        var renderedDrop = TestUtils.renderIntoDocument(elementDrop);
        var nodeDrag = renderedDrag.getDOMNode();
        var nodeDrop = renderedDrop.getDOMNode();
        var mockEvent = {
            //nativeEvent: {
                dataTransfer: {
                    types: ["objtopass"],
                    setData: function () {},
                    getData: function () {
                        return JSON.parse({
                            dropType: 'test',
                            data: {
                                test: true
                            }
                        });
                    }
                }
            //}
        };

        //spyOn(rendered.dragDropData, 'drop').and.callThrough();

        TestUtils.SimulateNative.dragStart(nodeDrag, mockEvent);
        TestUtils.Simulate.dragOver(nodeDrop, mockEvent);
        TestUtils.Simulate.drop(nodeDrop, mockEvent);

        //expect(DragDropMixin.handleDrop).toHaveBeenCalled();
        //expect(rendered.dragDropData.drop).toHaveBeenCalled();
        expect(renderedDrop.state).not.toBeNull();
    });

});