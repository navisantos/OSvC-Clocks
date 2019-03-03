			
			var globalCounter = 0;
			var worldClocks = [];
			var globalT = {};
			//creating html clock. it is using the incident Ids
			function createNewClock(externalId) {
				var myHTML = "<div id='div"+externalId+"' class='w3-container w3-center'>"+
								 "<h5 id='h5"+externalId+"' style='margin-top:0px;margin-bottom:0px'>Clock "+externalId+"</h5>"+
			    				 "<h1 id='h1"+externalId+"' style='margin-top:0px;margin-bottom:0px'><time style='margin-top:0px;margin-bottom:0px'>00:00</time></h1>" +
			    				 "<div class='w3-bar'>" +
									 "<button id='start"+externalId+"' class='w3-bar-item w3-button w3-light-green'>start</button>" +
									 "<button id='stop"+externalId+"' class='w3-bar-item w3-button w3-red'>stop</button>" +
									 "<button id='clear"+externalId+"' class='w3-bar-item w3-button w3-black'>clear</button>" +
								 "</div>" +
								 "<hr>"+
						 	 "</div>";

				document.getElementById('myClocks').insertAdjacentHTML('beforeend',myHTML);


			    worldClocks.push({seconds : 0, minutes : 0, hours : 0, id : externalId});

			    if(document.getElementById('myClocks').childNodes.length > 1)
			    	document.getElementById('div'+externalId).className += " w3-opacity-max";
			    else
			    	startAction(externalId);

			    console.log(worldClocks);
			    /* Start Button */
			    document.getElementById('start'+externalId).addEventListener('click', function(){
			    	startAction(externalId);
    			});

				/* Stop button */
				document.getElementById('stop'+externalId).addEventListener('click', function() {
				    stopAction(externalId);
				});

				/* Clear button */
				document.getElementById('clear'+externalId).addEventListener('click', function() {
				    clearAction(externalId);
				});
			}

			function startAction(externalId){
				timer(externalId);
			}

			function clearAction(externalId) {
				document.getElementById('h1'+externalId).textContent = "00:00";
				    for(i=0;i<worldClocks.length;i++){
				    	if(worldClocks[i].id == externalId){
				    		worldClocks[i].seconds = 0;
				    		worldClocks[i].minutes = 0;
				    		worldClocks[i].hours = 0;
				    		globalT[worldClocks[i].id] = 0;
				    	}
				    }
			}

			function stopAction(externalId){
				clearTimeout(globalT[externalId]);
			}

			function add(externalId) {
				for(i=0; i < worldClocks.length; i++)
				{
					//console.log('id: ' + worldClocks[i].id +' seconds: ' + worldClocks[i].seconds);
					if(worldClocks[i] != undefined){
						if(worldClocks[i].id == externalId){
							worldClocks[i].seconds++;
					    	if (worldClocks[i].seconds >= 60) {
					        	worldClocks[i].seconds = 0;
					        	worldClocks[i].minutes++;
					        	if (worldClocks[i].minutes >= 60) {
					            	worldClocks[i].minutes = 0;
					            	worldClocks[i].hours++;
				        		}

							}
						}
						document.getElementById('h1'+worldClocks[i].id).textContent = (worldClocks[i].minutes ? (worldClocks[i].minutes > 9 ? worldClocks[i].minutes : "0" + worldClocks[i].minutes) : "00") + ":" + (worldClocks[i].seconds > 9 ? worldClocks[i].seconds : "0" + worldClocks[i].seconds);
					}
				}

			    timer(externalId);
			}
			function timer(externalId) {
			    globalT[externalId] = setTimeout(function(){ add(externalId)}, 1000);
			}


			ORACLE_SERVICE_CLOUD.extension_loader.load('myContent', '1.0')
			.then(function(extensionProvider)
			    {
			    extensionProvider.getGlobalContext().then(function(globalContext) {
			        globalContext.registerAction('changeContext', function(retorno) {
			        	param = retorno
			        	console.log(param);
			        	//create clock when the workspace loads
			        	if(param.acao == 'EditorLoaded') {
			        		createNewClock(param.newWS);
			        	}
			        	//destroy clock and its dependecies
			     		if(param.acao == 'RecordClosing') {
			     			document.getElementById('myClocks').removeChild(document.getElementById('div'+param.newWS));
			     			for(i=0;i<worldClocks.length;i++){
			     				if(worldClocks[i] != undefined){
			     					if(worldClocks[i].id == param.newWS){
				     					clearTimeout(param.newWS);
				     					delete globalT[param.newWS];
				     					delete worldClocks[i];
			     					}	
			     				}
			     				

			     			}
			     		}
			     		//get Context Change (tab change) events and customize clock view
			     		if(param.acao == 'CurrentEditorTabChanged'){
			     			setTimeout(function(){
			     				var actualTab = document.getElementById('div'+param.newWS);

				     			parentTab = actualTab.parentNode;
				     			firstChild = document.getElementById('myClocks').childNodes[0];

				     			//add opacity to oldActual and stop timer
				     			firstChild.className += ' w3-opacity-max';
				     			var exAtual = firstChild.id.substring(3,8);
				     			console.log('antigoPrimeiro ' + exAtual);
				     			stopAction(exAtual);

				     			parentTab.insertBefore(actualTab,firstChild);
				     			//remove opacity from actualTab and start timer
				     			var newClassName = actualTab.className;
				     			newClassName = newClassName.substring(0,newClassName.search('w3-opacity-max'));
				     			actualTab.className = newClassName;

				     			startAction(param.newWS);
			     			},500)		
			     		} 

			        });
			    });
			});
			