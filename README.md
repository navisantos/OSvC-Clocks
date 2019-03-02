# OSvC-Clocks
This adds an extension on the OSvC BUI Right Panel.
It register and is listening to the 'changeContext' action using the getGlobalContext method.
Important: is expects as value a JSON with the newWS, oldWS and the action.

I create another workspace extension to invoke this actions. You can find the changeContext workspace extension on my github repository: https://github.com/navisantos 
You can also use your workspace to invoke the methods. refer to invokeAction and registerAction documentation.