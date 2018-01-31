{SelectListView} = require 'atom-space-pen-views'

module.exports =
class MySelectListView extends SelectListView
 initialize: ->
   super
   @addClass('overlay from-top')
   # @setItems(['Hello', 'World'])
   @panel ?= atom.workspace.addModalPanel(item: this)
   @panel.show()
   @focusFilterEditor()

 viewForItem: (item) ->
   "<li>#{item.projectName}</li>"

 confirmed: (item) ->
   this.trigger('navigate-to', item);

 getFilterKey: () ->
  'projectName';
  
 cancelled: ->
   destroyPanel = @panel;
   @panel = null;
   if destroyPanel
     destroyPanel.destroy();
