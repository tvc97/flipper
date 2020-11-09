(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{106:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return a})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return p}));var i=t(2),o=t(6),r=(t(0),t(130)),c={id:"new-clients",title:"Implementing a Flipper Client"},a={unversionedId:"extending/new-clients",id:"extending/new-clients",isDocsHomePage:!1,title:"Implementing a Flipper Client",description:"In the GitHub repo, you'll find Flipper clients for Android, iOS and C++ code, but there's nothing to stop you from writing a FlipperClient for another device or OS.",source:"@site/../docs/extending/new-clients.mdx",permalink:"/docs/extending/new-clients",editUrl:"https://github.com/facebook/flipper/blob/master/website/../docs/extending/new-clients.mdx",sidebar:"extending",previous:{title:"flipper-plugin API reference (Sandy)",permalink:"/docs/extending/flipper-plugin"},next:{title:"Secure Communication",permalink:"/docs/extending/establishing-a-connection"}},l=[{value:"Establishing a connection",id:"establishing-a-connection",children:[]},{value:"Responding to messages",id:"responding-to-messages",children:[{value:"getPlugins",id:"getplugins",children:[]},{value:"getBackgroundPlugins",id:"getbackgroundplugins",children:[]},{value:"init",id:"init",children:[]},{value:"deinit",id:"deinit",children:[]},{value:"execute",id:"execute",children:[]}]},{value:"Error Reporting",id:"error-reporting",children:[]},{value:"Testing",id:"testing",children:[]}],s={rightToc:l};function p(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(i.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"In the GitHub repo, you'll find Flipper clients for Android, iOS and C++ code, but there's nothing to stop you from writing a FlipperClient for another device or OS."),Object(r.b)("p",null,"Flipper clients communicate with the Flipper desktop app using JSON RPC messages over an ",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"http://rsocket.io/"}),"RSocket")," connection."),Object(r.b)("p",null,"This page documents the API, and you can use ",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/facebook/flipper/blob/master/xplat/Flipper/FlipperConnectionManagerImpl.cpp"}),"FlipperConnectionManagerImpl.cpp")," for reference."),Object(r.b)("h2",{id:"establishing-a-connection"},"Establishing a connection"),Object(r.b)("p",null,"Start by connecting to the Flipper server running within the desktop app. Connecting to the server registers your application with Flipper and enables plugins to interact with it. As the Flipper desktop has a different lifecycle than your app and may connect and disconnect at any time it is important that you attempt to reconnect to the Flipper server until it accepts your connection."),Object(r.b)("p",null,"We use the RSocket protocol for communication between desktop and client, because it allows for easy certificate pinning and functionality like request-response messages."),Object(r.b)("p",null,"In order to securely connect to Flipper, your client should first ",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"establishing-a-connection"}),"obtain a certificate"),"."),Object(r.b)("p",null,"After the client certificate has been obtained, connect to the following URL with an RSocket client:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),"localhost:8088/sonar?os={OS}\n                     &device={DEVICE}\n                     &device_id={DEVICE_ID}\n                     &app={APP}\n                     &sdk_version={SDK_VERSION}\n                     &foreground={FOREGROUND}\n")),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"OS"),": The OS which the connecting is being established from. For example ",Object(r.b)("inlineCode",{parentName:"p"},"os=Android")," if your client is running on Android. This is usually hard-coded into the FlipperClient implementation. This string may be used by the Flipper desktop app to identify valid plugins as well as present in the UI to the user."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"DEVICE"),": The name of the device running the application. For example ",Object(r.b)("inlineCode",{parentName:"p"},"device=iPhone7"),"."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"DEVICE_ID"),": A unique identifier for the device. The Flipper server / desktop app may use this to coalesce multiple connections originating from the save device or present the string in the UI to differentiate between connections to different clients."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"APP"),": The name of the app running this client instance. For example ",Object(r.b)("inlineCode",{parentName:"p"},"app=Facebook")," when connecting to a running facebook app. OS + DEVICE_ID + APP should together uniquely identify a connection."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"FOREGROUND"),": A boolean indicating whether this connection was established with a foreground process. This is a hint to the Flipper desktop app of whether to re-focus on this connection or not. For example ",Object(r.b)("inlineCode",{parentName:"p"},"foreground=true"),". This parameter is recommended but optional."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"SDK_VERSION"),": A number indicating the latest protocol version this client is compatible with. You can find the current version in our ",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/facebook/flipper/blob/master/xplat/Flipper/FlipperConnectionManagerImpl.cpp#L37"}),"C++ connection implementation"),". Usually stored as a constant in the client code, this allows protocol changes to be made whilst still preserving connectivity with old clients. When Flipper desktop encounters an old SDK version, it may attempt to communicate using a matching protocol. However, backwards compatibility is not guaranteed and you should strive to update clients on the rare occasion that the protocol version advances."),Object(r.b)("h2",{id:"responding-to-messages"},"Responding to messages"),Object(r.b)("p",null,"Flipper uses a simple Remote Procedure Call protocol using JSON-formatted payloads."),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"method")," field of the payload indicates which method of the FlipperClient is being called. This will always be present."),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"payload")," field contains the JSON parameters for the method call. This may be omitted when no parameters are used."),Object(r.b)("p",null,"It is recommended that implementations gracefully ignore extra fields for the sake of backwards and forwards compatibility."),Object(r.b)("p",null,"Responses contain either a success object representing the return value of the RPC invocation or an error object indicating that an error occurred."),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"The following methods must be implemented by all FlipperClient implementations"),":"),Object(r.b)("p",null,"The syntax used for these type definitions is ",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"https://flow.org/en/docs/types/objects/"}),"Flow"),". All requests/responses are JSON objects. Where no Response type is specified, it's a void call - no response is expected."),Object(r.b)("h3",{id:"getplugins"},"getPlugins"),Object(r.b)("p",null,"Return the available plugins as a list of identifiers. A plugin identifier is a string which is matched with the plugin identifier of desktop javascript plugins. This allows the client to specify the plugins it supports."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'Request = {\n  "method": "getPlugins",\n}\n\nResponse = {\n  "success": {\n    "plugins": Array<string>\n  },\n}\n')),Object(r.b)("h3",{id:"getbackgroundplugins"},"getBackgroundPlugins"),Object(r.b)("p",null,"Returns a subset of the available plugins returned by ",Object(r.b)("inlineCode",{parentName:"p"},"getPlugin"),". The background connections will automatically receive a connection from Flipper once it starts (and if the plugins are enabled), rather than waiting for the user to open the plugin."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'Request = {\n  "method": "getBackgroundPlugins",\n}\n\nResponse = {\n  "success": {\n    "plugins": Array<string>\n  },\n}\n')),Object(r.b)("h3",{id:"init"},"init"),Object(r.b)("p",null,"Initialize a plugin. This should result in an onConnected call on the appropriate plugin. Plugins should by nature be lazy and should not be initialized up front as this may incur significant cost. The Flipper desktop client knows when a plugin is needed and should control when to initialize them."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'Request = {\n  "method": "init",\n  "params": {\n    "plugin": string,\n  },\n}\n')),Object(r.b)("h3",{id:"deinit"},"deinit"),Object(r.b)("p",null,"Opposite of init. A call to deinit is made when a plugin is no longer needed and should release any resources. Don't rely only on deinit to release plugin resources as Flipper may quit without having the chance to issue a deinit call. In those cases, you should also rely on the RSocket disconnect callbacks. This call is mainly for allowing the desktop app to control the lifecycle of plugins."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'Request = {\n  "method": "deinit",\n  "params": {\n    "plugin": string,\n  },\n}\n')),Object(r.b)("h3",{id:"execute"},"execute"),Object(r.b)("p",null,"This is the main call and how the Flipper desktop plugins and client plugins communicate. When a javascript desktop plugin issues a client request it will be wrapped in one of these execute calls. This execute indicates that the call should be redirected to a plugin.\nrequest.params.api is the plugin id.\nrequest.params.method is the method within the plugin to execute.\nrequest.params.params is an optional params object containing the parameters to the RPC invocation."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'Request = {\n  "method": "execute",\n  "params": {\n    "api": string,\n    "method": string,\n    "params": ?Object,\n  },\n}\n\nResponse = {\n  "success": Object,\n} | {\n  "error": Object,\n}\n')),Object(r.b)("h2",{id:"error-reporting"},"Error Reporting"),Object(r.b)("p",null,"The Flipper desktop app handles error reporting so you don't have to. If an error occurs during the execution of an RPC invocation, return a serialization of it in the response so it can be attributed to the method call."),Object(r.b)("p",null,"If an error occurs in some other context, you can proactively send it to Flipper with the following request structure:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),"Request = {\n  error: {\n    message: string,\n    stacktrace: string,\n  }\n}\n")),Object(r.b)("p",null,"While in development mode, Flipper will display any client errors next to javascript errors in the Electron/Chrome DevTools console."),Object(r.b)("h2",{id:"testing"},"Testing"),Object(r.b)("p",null,"Testing is incredibly important when building core infrastructure and tools. The following is pseudo code for tests we would expect any new FlipperClient implementation to implement and correctly execute. To run tests we strongly encourage you to build a mock for the RSocket connection to mock out the desktop side of the protocol and to not have any network dependencies in your test code."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'test("GetPlugins", {\n  let connection = new MockConnection();\n  let client = new FlipperClient(connection);\n  let plugin = {id: "test"};\n\n  client.addPlugin(plugin);\n  client.start();\n\n  connection.onReceive({\n    id: 1,\n    method: "getPlugins",\n  });\n\n  assert(connection.sentMessages, contains({\n    id: 1,\n    success:{\n      plugins: ["test"],\n    },\n  }));\n});\n')),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'test("InitDeinit", {\n  let connection = new MockConnection();\n  let client = new FlipperClient(connection);\n  let plugin = {id: "test", connected: false};\n\n  client.addPlugin(plugin);\n  client.start();\n\n  assertFalse(plugin.connected);\n\n  connection.onReceive({\n    id: 1,\n    method: "init",\n    params: {\n      plugin: "test",\n    },\n  });\n\n  assertTrue(plugin.connected);\n\n  connection.onReceive({\n    id: 1,\n    method: "deinit",\n    params: {\n      plugin: "test",\n    },\n  });\n\n  assertFalse(plugin.connected);\n});\n')),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'test("Disconnect", {\n  let connection = new MockConnection();\n  let client = new FlipperClient(connection);\n  let plugin = {id: "test", connected: false};\n\n  client.addPlugin(plugin);\n  client.start();\n\n  assertFalse(plugin.connected);\n\n  connection.onReceive({\n    id: 1,\n    method: "init",\n    params: {\n      plugin: "test",\n    },\n  });\n\n  assertTrue(plugin.connected);\n  connection.disconnect();\n  assertFalse(plugin.connected);\n});\n')),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'test("Execute", {\n  let connection = new MockConnection();\n  let client = new FlipperClient(connection);\n  let plugin = {\n    id: "test",\n    reverse: (params, responder) => {\n      responder.success({word: params.word.reverse()});\n    },\n  };\n\n  client.addPlugin(plugin);\n  client.start();\n\n  connection.onReceive({\n    id: 1,\n    method: "init",\n    params: {\n      plugin: "test",\n    },\n  });\n\n  connection.onReceive({\n    id: 1,\n    method: "execute",\n    params: {\n      api: "test",\n      method: "reverse",\n      params: {\n        word: "hello"\n      },\n    },\n  });\n\n  assert(connection.sentMessages, contains({\n    id: 1,\n    success:{\n      word: "olleh",\n    },\n  }));\n});\n')))}p.isMDXComponent=!0},130:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return h}));var i=t(0),o=t.n(i);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,o=function(e,n){if(null==e)return{};var t,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=o.a.createContext({}),p=function(e){var n=o.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a({},n,{},e)),t},u=function(e){var n=p(e.components);return o.a.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},b=Object(i.forwardRef)((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(t),b=i,h=u["".concat(c,".").concat(b)]||u[b]||d[b]||r;return t?o.a.createElement(h,a({ref:n},s,{components:t})):o.a.createElement(h,a({ref:n},s))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,c=new Array(r);c[0]=b;var a={};for(var l in n)hasOwnProperty.call(n,l)&&(a[l]=n[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,c[1]=a;for(var s=2;s<r;s++)c[s]=t[s];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);