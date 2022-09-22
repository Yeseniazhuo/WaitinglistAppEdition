# Project execute Instructions 

### Git Repository: https://github.com/Yeseniazhuo/WaitinglistAppEdition

## Execute the following code to start Server.

### Clone the server repository or use current one /api foler to start server
`git clone https://github.com/Yeseniazhuo/HotelWaitinglist.git`
install package
`npm install`

### init and start mongodb
start mongodb：
`screen mongod`

initiate database：
`mongo IT5007Tutorial scripts/init.mongo.js`

### Start Web
transfrom .jsx to .js：
`npx babel src --presets @babel/react --out-dir public`

start the Web：
`npm start`

### <strong>Server start at port 3000</strong>


## Execute the following code to start Clientserver.

First change the dictionary to Clientapp, and open android studio

install all the package:
`npm install`

Change the yourIPv4 uri in app.js in Clientserver folder: 
`uri: "http://yourIPv4:3000/graphql"` 

use `react-native run-android`to start the android app.

Then you can add customer in android simulator, then query in http://localhost:3000/graphql
