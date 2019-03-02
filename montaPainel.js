/* In this sample code, I am using a variable to set function values. It helps to be consistent, and if you use the same value in different 
parts of your code, this is a best practice to help on the maintenance. Also, notice that I am passing the app name and version through a variable. 
You want to be consistent and keep the same name for the entire add-in, it will help you to identify errors when debug log is used.
As a best practice, use the same app name and version you add-in pkg (.zip)*/

var iconFont = "fa fa-clock-o";
var createIcon = "font awesome";
var rightSidePaneURL = "./reloginho.html";
var rightSidePaneLabel = "Reloginho";
var appName = "RightSidePaneSampleCode";
var appVersion = "1.0";

function createRightSidePane(){
    ORACLE_SERVICE_CLOUD.extension_loader.load(appName, appVersion)
    .then(function(sdk) {
        sdk.registerUserInterfaceExtension(function(userInterfaceContext) {
            
            // Notice that the code is calling for the RightSidePane here. this is the only difference between left and right side pane.
            userInterfaceContext.getRightSidePaneContext().then(function(rightSidePaneContext) {                
                
                /* I'm not using an existing Side Pane, but if you have an existing Side Pane and want 
                to reuse it to set a different a condition, you have to set the Id. Create your ide 
                for each custom Side Pane; you aren't allowed to use the standard menu in here.*/
                rightSidePaneContext.getSidePane("id").then(function(rightPanelMenu) {


                    //Set Label and the content URL.
                    rightPanelMenu.setContentUrl(rightSidePaneURL);
                    rightPanelMenu.setLabel(rightSidePaneLabel);
                    
                    //Setting to be Visible, with that you will see a thumbs-up on the right side.
                    rightPanelMenu.setVisible(true);
                    
                    // Creating an icon                    
                    var icon = rightPanelMenu.createIcon(createIcon);
                    icon.setIconClass(iconFont);
                    rightPanelMenu.addIcon(icon);                  

                    //Render is the last and most important part. Without this command your side panel won't appear.
                    rightPanelMenu.render();
                });
            });
        });
    })
 /*   .then(function(extensionProvider)
    {
        console.log('entrou no registro');
    extensionProvider.getGlobalContext().then(function(globalContext) {
        console.log('entrou no contexto do registro');
        globalContext.registerAction('changeContext', function(param) {
                console.log('Action Registrada')
                console.log(param);
            });
        });
    }); */
    
}

//JavaScript is a function program language. I like to create a function and call it in sequential order.
createRightSidePane();