(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{138:function(e,t,n){e.exports=n(154)},145:function(e,t,n){},154:function(e,t,n){"use strict";n.r(t);var a,o,i=n(0),r=n.n(i),c=n(99),l=n.n(c),d=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,211)).then(function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),o(e),i(e),r(e)})},u=(n(145),n(230)),s=n(231),m=n(232),f=n(224),b=n(229),T=n(219),E=n(233),g=n(221),p=n(131),k=n.n(p),h=n(201),v=n(217),O=n(214),C=n(28),j=n(85),y=n(17),I=n(25),S=n(216),A=n(133).a.create(Object(I.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"865054b3-8839-41aa-aa3c-1dce403daa1b"}})),w=function(){return A.get("todo-lists")},L=function(e){return A.post("todo-lists",{title:e})},N=function(e){return A.delete("todo-lists/".concat(e))},D=function(e,t){return A.put("todo-lists/".concat(e),{title:t})},P=function(e){return A.get("todo-lists/".concat(e,"/tasks"))},F=function(e,t){return A.delete("todo-lists/".concat(e,"/tasks/").concat(t))},R=function(e,t,n){return A.put("todo-lists/".concat(e,"/tasks/").concat(t),n)},x=function(e,t){return A.post("todo-lists/".concat(e,"/tasks"),{title:t})},U=function(e){return A.post("auth/login",e)},K=function(){return A.get("auth/me")},M=function(){return A.delete("auth/login")};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(a||(a={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(o||(o={}));var G=function(e,t){e.messages.length?t(J(e.messages[0])):t(J("Some error occurred")),t(_("failed"))},H=function(e,t){t(J(e.message?e.message:"Some error occurred")),t(_("failed"))},Z={isLoginIn:!1},Y=function(e){return{type:"login/SET-IS-LOGIN-IN",value:e}},z=function(){return function(e){e(_("loading")),M().then(function(t){0===t.data.resultCode?(e(Y(!1)),e(_("succeeded"))):G(t.data,e)}).catch(function(t){H(t,e)})}},B={status:"idle",error:null,initialized:!1},J=function(e){return{type:"APP/SET-ERROR",error:e}},_=function(e){return{type:"APP/SET-STATUS",status:e}},q=function(){return function(e){K().then(function(t){0===t.data.resultCode&&e(Y(!0)),e({type:"APP/SET-INITIALIZED",value:!0})})}},V=Object(S.a)(),$=(Object(S.a)(),[]),Q=n(4),W=Object(Q.a)({},V,[{id:Object(S.a)(),title:"Frog1",status:a.Completed,todoListId:V,startDate:"",deadline:"",addedDate:"",order:0,priority:o.Low,description:""},{id:Object(S.a)(),title:"Frog2",status:a.Completed,todoListId:V,startDate:"",deadline:"",addedDate:"",order:0,priority:o.Low,description:""},{id:Object(S.a)(),title:"Frog3",status:a.Completed,todoListId:V,startDate:"",deadline:"",addedDate:"",order:0,priority:o.Low,description:""}]),X=function(e,t,n){return function(a,o){var i=o().tasks[e].find(function(e){return e.id===n});if(i){var r=Object(I.a)({title:i.title,status:i.status,deadline:i.deadline,description:i.description,priority:i.priority,startDate:i.startDate},t);a(_("loading")),R(e,n,r).then(function(o){0===o.data.resultCode?(a(function(e,t,n){return{type:"UPDATE-TASK",idTodo:e,model:t,idTask:n}}(e,t,n)),a(_("succeeded"))):G(o.data,a)}).catch(function(e){H(e,a)})}}},ee=n(108),te=Object(j.b)({todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Remove-Todo":return e.filter(function(e){return e.id!=t.id});case"Add-Todo":return[Object(I.a)({},t.NewTodo,{filter:"All",entityStatus:"idle"})].concat(Object(y.a)(e));case"ChengeTitle-Todo":return e.map(function(e){return e.id===t.id?Object(I.a)({},e,{title:t.title}):e});case"Change-Isdone-Todo":return e.map(function(e){return e.id===t.id?Object(I.a)({},e,{filter:t.isDone}):e});case"SET-TODOLIST":return t.todolist.map(function(e){return Object(I.a)({},e,{filter:"All",entityStatus:"idle"})});case"CHENGE-TODOLIST-ENTITY-STATUS":return e.map(function(e){return e.id===t.id?Object(I.a)({},e,{entityStatus:t.status}):e});default:return e}},tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Remove-Task":var n=Object(I.a)({},e),a=n[t.idTodo].filter(function(e){return e.id!=t.idTask});return n[t.idTodo]=a,Object(I.a)({},n);case"Add-Task":var o=Object(I.a)({},e),i=t.task,r=o[i.todoListId],c=[i].concat(Object(y.a)(r));return o[i.todoListId]=c,o;case"UPDATE-TASK":var l=Object(I.a)({},e),d=l[t.idTodo];return l[t.idTodo]=d.map(function(e){return e.id===t.idTask?Object(I.a)({},e,t.model):e}),l;case"Remove-Todo":var u=Object(I.a)({},e);return delete u[t.id],u;case"Add-Todo":var s=Object(I.a)({},e);return s[t.NewTodo.id]=[],s;case"SET-TODOLIST":var m=Object(I.a)({},e);return t.todolist.forEach(function(e){m[e.id]=[]}),m;case"SET-TASK":var f=Object(I.a)({},e);return f[t.todolistId]=t.tasks,f;default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(I.a)({},e,{status:t.status});case"APP/SET-ERROR":return Object(I.a)({},e,{error:t.error});case"APP/SET-INITIALIZED":return Object(I.a)({},e,{initialized:t.value});default:return e}},login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGIN-IN":return Object(I.a)({},e,{isLoginIn:t.value});default:return e}}}),ne=Object(j.c)(te,Object(j.a)(ee.a)),ae=function(){return Object(C.b)()};C.c;window.store=ne;var oe=i.forwardRef(function(e,t){return i.createElement(O.a,Object.assign({elevation:6,ref:t,variant:"filled"},e))});function ie(){var e=Object(C.c)(function(e){return e.app.error}),t=ae(),n=function(e,n){"clickaway"!==n&&t(J(null))},a=null!=e;return i.createElement(h.a,{spacing:2,sx:{width:"100%"}},i.createElement(v.a,{open:a,autoHideDuration:6e3,onClose:n},i.createElement(oe,{onClose:n,severity:"error"},e)))}var re=n(220),ce=n(223),le=n(10),de=n(212),ue=n(209),se=r.a.memo(function(e){console.log("AddItemForm is colled");var t=Object(i.useState)(""),n=Object(le.a)(t,2),a=n[0],o=n[1],c=Object(i.useState)(null),l=Object(le.a)(c,2),d=l[0],u=l[1],s=function(t){""!=t.trim()?(e.AddItem(t.trim()),o(""),u(null)):u("You need to write something")};return r.a.createElement("div",null,r.a.createElement(de.a,{onKeyPress:function(e){null!==d&&u(null),13==e.charCode&&s(a)},variant:"outlined",label:"Type value",onChange:function(e){!function(e){o(e.currentTarget.value),u(null)}(e)},error:!!d,value:a,type:"text"}),r.a.createElement(f.a,{onClick:function(){s(a)},color:"primary"},r.a.createElement(ue.a,null)),d?r.a.createElement("div",null,d):"")}),me=r.a.memo(function(e){console.log("EditableSpan");var t=Object(i.useState)(!0),n=Object(le.a)(t,2),a=n[0],o=n[1],c=Object(i.useState)(e.title),l=Object(le.a)(c,2),d=l[0],u=l[1];return a?r.a.createElement("span",{onDoubleClick:function(){o(!1)}},e.title):r.a.createElement(de.a,{value:d,onChange:function(e){return function(e){u(e)}(e.currentTarget.value)},onBlur:function(){return e.ChengeTaskName(d),u(""),void o(!0)},autoFocus:!0})}),fe=n(210),be=n(215),Te=r.a.memo(function(e){var t=Object(i.useCallback)(function(t){e.removeTask(e.task.id,e.TodolistId)},[e.task.id,e.TodolistId]),n=Object(i.useCallback)(function(t){e.ChengeTaskName(e.TodolistId,e.task.id,t)},[e.TodolistId,e.task.id,e.ChengeTaskName]),o=Object(i.useCallback)(function(t){var n=t.currentTarget.checked;e.chengeChecked(e.task.id,n?a.Completed:a.New,e.TodolistId)},[e.task.id,e.TodolistId]);return r.a.createElement("div",{key:e.task.id,className:e.task.status===a.Completed?"Todolist-TasksList-ChekedTrue":""},r.a.createElement(be.a,{checked:e.task.status===a.Completed,color:"primary",onChange:o}),r.a.createElement(me,{ChengeTaskName:n,key:e.task.id,title:e.task.title}),r.a.createElement(f.a,{onClick:function(){return t(e.task.id)}},r.a.createElement(fe.a,null)))}),Ee=r.a.memo(function(e){var t=ae(),n=Object(i.useCallback)(function(t){e.ChengeTitleTodo(e.todolist.id,t)},[e.todolist.id,e.ChengeTitleTodo]),o=Object(i.useCallback)(function(t){e.AddNewTodoTask(t,e.todolist.id)},[e.AddNewTodoTask,e.todolist.id]),c=Object(i.useCallback)(function(){e.FilterChenge("All",e.todolist.id)},[]),l=Object(i.useCallback)(function(){e.FilterChenge("Completed",e.todolist.id)},[]),d=Object(i.useCallback)(function(){e.FilterChenge("Active",e.todolist.id)},[]),u=e.tasks;return"Completed"===e.todolist.filter&&(u=e.tasks.filter(function(e){return e.status==a.Completed})),"Active"===e.todolist.filter&&(u=e.tasks.filter(function(e){return e.status==a.New})),Object(i.useEffect)(function(){var n;t((n=e.todolist.id,function(e){e(_("loading")),P(n).then(function(t){var a=t.data.items;e(function(e,t){return{type:"SET-TASK",todolistId:e,tasks:t}}(n,a)),e(_("succeeded"))})}))},[]),r.a.createElement("div",{className:"todolist"},r.a.createElement("h1",null,r.a.createElement(me,{title:e.todolist.title,ChengeTaskName:n}),r.a.createElement(f.a,{onClick:function(){e.DeleteTodo(e.todolist.id)},disabled:"loading"===e.todolist.entityStatus},r.a.createElement(fe.a,null))),r.a.createElement(se,{key:e.todolist.id,AddItem:o,disabled:"loading"===e.todolist.entityStatus}),r.a.createElement("div",null,u.map(function(t){return r.a.createElement(Te,{key:t.id,TodolistId:e.todolist.id,ChengeTaskName:e.ChengeTaskName,removeTask:e.removeTask,chengeChecked:e.chengeChecked,task:t})})),r.a.createElement(T.a,{variant:"All"==e.todolist.filter?"contained":"outlined",onClick:function(){c()}},"All"),r.a.createElement(T.a,{variant:"Active"==e.todolist.filter?"contained":"outlined",onClick:function(){d()}},"Active"),r.a.createElement(T.a,{variant:"Completed"==e.todolist.filter?"contained":"outlined",onClick:function(){l()}},"Completed"))}),ge=n(3),pe=function(e){var t=ae(),n=Object(C.c)(function(e){return e.login.isLoginIn}),a=Object(C.c)(function(e){return e.todolists}),o=Object(C.c)(function(e){return e.tasks});Object(i.useEffect)(function(){n&&t(function(e){e(_("loading")),w().then(function(t){e({type:"SET-TODOLIST",todolist:t.data}),e(_("succeeded"))}).catch(function(t){H(t,e)})})},[]);var c=Object(i.useCallback)(function(e,n){t(function(e,t){return function(n){F(e,t).then(function(a){n({type:"Remove-Task",idTodo:e,idTask:t})})}}(n,e))},[t]),l=Object(i.useCallback)(function(e,n){t(function(e,t){return function(n){n(_("loading")),x(e,t).then(function(e){if(0===e.data.resultCode){var t=e.data.data.item;n(function(e){return{type:"Add-Task",task:e}}(t)),n(_("succeeded"))}else G(e.data,n)}).catch(function(e){H(e,n)})}}(n,e))},[t]),d=Object(i.useCallback)(function(e,n){var a,o;t((a=e,o=n,function(e){D(a,o).then(function(t){e(function(e,t){return{type:"ChengeTitle-Todo",id:e,title:t}}(a,o))})}))},[t]),u=Object(i.useCallback)(function(e,n,a){t(X(e,{title:a},n))},[t]),s=Object(i.useCallback)(function(e){var n;t((n=e,function(e){e(_("loading")),e({type:"CHENGE-TODOLIST-ENTITY-STATUS",id:n,status:"loading"}),N(n).then(function(t){e({type:"Remove-Todo",id:n}),e(_("succeeded"))})}))},[t]),m=Object(i.useCallback)(function(e,n,a){t(X(a,{status:n},e))},[t]),f=Object(i.useCallback)(function(e,n){t({type:"Change-Isdone-Todo",isDone:e,id:n})},[t]),b=Object(i.useCallback)(function(e){t(function(e){return function(t){t(_("loading")),L(e).then(function(e){t({type:"Add-Todo",NewTodo:e.data.data.item}),t(_("succeeded"))})}}(e))},[t]);return n?r.a.createElement(r.a.Fragment,null,r.a.createElement(re.a,{container:!0,style:{padding:"20px 0px 20px 0px"}},r.a.createElement(se,{AddItem:b})),r.a.createElement(re.a,{container:!0,spacing:10},a.map(function(e){var t=o[e.id];return r.a.createElement(re.a,{key:e.id,item:!0},r.a.createElement(ce.a,{style:{padding:"10px"}},r.a.createElement(Ee,{todolist:e,key:e.id,ChengeTitleTodo:d,ChengeTaskName:u,tasks:t,removeTask:c,FilterChenge:f,chengeChecked:m,DeleteTodo:s,AddNewTodoTask:l})))}))):r.a.createElement(ge.a,{to:"/login"})},ke=n(226),he=n(225),ve=n(207),Oe=n(227),Ce=n(228),je=n(132),ye=function(){var e=ae(),t=Object(C.c)(function(e){return e.login.isLoginIn}),n=Object(je.a)({validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",t},initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(t){var n;e((n=t,function(e){e(_("loading")),U(n).then(function(t){0===t.data.resultCode?(e(Y(!0)),e(_("succeeded"))):G(t.data,e)}).catch(function(t){H(t,e)})}))}});return t?r.a.createElement(ge.a,{to:"/"}):r.a.createElement(ke.a,{sx:{flexGrow:1}},r.a.createElement(re.a,{container:!0,justifyContent:"center"},r.a.createElement(re.a,{item:!0,justifyContent:"center"},r.a.createElement("form",{onSubmit:n.handleSubmit},r.a.createElement(he.a,null,r.a.createElement(ve.a,null,r.a.createElement("p",null,"To log in get registered",r.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"}," here")),r.a.createElement("p",null,"or use common test account credentials:"),r.a.createElement("p",null,"Email: free@samuraijs.com"),r.a.createElement("p",null,"Password: free")),r.a.createElement(Oe.a,null,r.a.createElement(de.a,Object.assign({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.errors.email?r.a.createElement("div",null,n.errors.email):null,r.a.createElement(de.a,Object.assign({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.errors.password?r.a.createElement("div",null,n.errors.password):null,r.a.createElement(Ce.a,{label:"Remember me",control:r.a.createElement(be.a,Object.assign({},n.getFieldProps("rememberMe"),{checked:n.values.rememberMe}))}),r.a.createElement(T.a,{type:"submit",variant:"contained",color:"primary"},"Login")))))))},Ie=n(73);var Se=function(){var e=ae(),t=Object(C.c)(function(e){return e.app.initialized}),n=Object(C.c)(function(e){return e.login.isLoginIn}),a=Object(C.c)(function(e){return e.app.status});Object(i.useEffect)(function(){e(q())},[]);var o=Object(i.useCallback)(function(){e(z())},[]);return t?r.a.createElement(Ie.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(s.a,{position:"static"},r.a.createElement(m.a,null,r.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(k.a,null)),r.a.createElement(b.a,{variant:"h6"},"News"),n&&r.a.createElement(T.a,{color:"inherit",onClick:o},"Log out")),"loading"===a&&r.a.createElement(E.a,{color:"secondary"})),r.a.createElement(g.a,{fixed:!0},r.a.createElement(ge.d,null,r.a.createElement(ge.b,{path:"/",element:r.a.createElement(pe,null)}),r.a.createElement(ge.b,{path:"login",element:r.a.createElement(ye,null)}),r.a.createElement(ge.b,{path:"/404",element:r.a.createElement("h1",null,"404. Page not found")}),r.a.createElement(ge.b,{path:"*",element:r.a.createElement(ge.a,{to:"/404"})}))),r.a.createElement(ie,null))):r.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},r.a.createElement(u.a,null))};l.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C.a,{store:ne},r.a.createElement(Se,null)))),d()}},[[138,3,2]]]);
//# sourceMappingURL=main.67bd99f8.chunk.js.map