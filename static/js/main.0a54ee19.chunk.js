(this.webpackJsonpreactapp=this.webpackJsonpreactapp||[]).push([[0],{113:function(e,a,t){},127:function(e,a,t){"use strict";t.r(a);var n=t(2),c=t(0),r=t.n(c),o=t(13),l=t.n(o),s=(t(113),t(17)),i=(t(24),t(171)),d=t(82),u=t(83),b=t(40),h=t(95),p=t(93);function m(){for(var e="0123456789",a="",t=0;t<5;t++)a+=e.charAt(Math.floor(Math.random()*e.length));return console.log(a),a}var j=t(191),f=t(128);var g=function(e){return Object(n.jsxs)("div",{className:"parameter",children:[Object(n.jsxs)(f.a,{id:e.id,children:[e.label,"= ",e.value]}),Object(n.jsx)(j.a,{value:e.value,min:e.min,max:e.max,step:e.step,onChange:function(a){console.log("range input changed"),e.onChange(a)},"aria-labelledby":e.id})]})},O=(r.a.Component,t(178),t(55)),x=t(172),v=t(173),y=t(185),k=t(189),C=t(175),_=t(8),w=t.n(_),F=Object(i.a)((function(e){return{checkboxFace:{"padding-bottom":12,display:"inline-block",marginTop:4},parameterInline:{display:"inline-block",margin:12},inlineCheckbox:{display:"inline-block",marginTop:2,width:70},disabledlabel:{fontSize:"small",color:"darkgray"},labelsm:{fontSize:"small"}}}));var S=function(e){var a=e.side,t=e.copyOfShape,r=e.updateShapes,o=e.cursorFocus,l=e.shapeRefs,s=F(),i="".concat(a,"Face"),d=a[0].toUpperCase()+a.slice(1),u=l[i];return Object(c.useEffect)((function(){e.refocus(o,l)}),[]),Object(n.jsxs)("div",{children:[Object(n.jsx)(x.a,{className:s.inlineCheckbox,children:Object(n.jsx)(v.a,{label:d,control:Object(n.jsx)(y.a,{checked:!0===t.faces[i],onChange:function(e){return r(e,"checkbox_face","".concat(i,"_").concat(0),"")},size:"small",color:"primary",className:s.checkboxFace})})}),Object(n.jsx)(x.a,{className:s.parameterInline,children:Object(n.jsx)("input",{type:"color",id:"".concat(i,"_")+0,value:!0===t.faces[i]?t.data[i]:t.faces[i],onChange:function(e){return r(e,"color","".concat(i,"_").concat(0),"")},inputref:u,disabled:!0!==t.faces[i]})})]})};function N(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];function t(e){return" "+(a?e:e.toLowerCase())}var n=e.replace(/[A-Z]/g,t);if(a){var c=n.charAt(0).toUpperCase();n=c+n.slice(1)}return n}var z=Object(i.a)((function(e){return{parameter:{display:"block",margin:12}}}));var R=function(e){var a=e.copyOfShape,t=e.parameter,c=N(t),r=e.updateShapes,o=e.paramRef,l=z();return Object(n.jsxs)(x.a,{className:l.parameter,children:[Object(n.jsx)(k.a,{htmlFor:t+"_0",children:c}),Object(n.jsx)(C.a,{inputRef:o,id:t+"_0",value:a.data[t],disabled:!1,onChange:function(e){return r(e,"textinput","".concat(t,"_").concat(0),"")}})]})},I=Object(i.a)((function(e){return{parameter:{display:"block",margin:12,marginLeft:4},slider:{marginBottom:36,display:"block",fontSize:"small"},label:{fontSize:"small","margin-bottom":8,marginTop:24}}}));var T=function(e){var a,t=[e.id,e.label,e.value],c=t[0],r=t[1],o=t[2],l=[e.min,e.max,e.step],s=l[0],i=l[1],d=l[2],u=e.onChange;if(e.marks.length<2){console.log("INSIDE EMPTY MARKS");for(var b=[],h=s;h<=i;h++){var p={value:Number(h),label:"".concat(h)};b.push(p)}console.log(b),a=b}else a=e.marks;var m=I();return Object(n.jsxs)(x.a,{className:m.parameter,children:[Object(n.jsxs)("p",{id:c+"_label",className:m.label,children:[r," ",void 0!==e.sublabel?Object(n.jsx)("span",{className:"tinytext",children:e.sublabel}):""," "]}),Object(n.jsx)(j.a,{className:m.slider,id:c,value:o,min:s,max:i,step:d,marks:a,onChange:u,"aria-labelledby":c+"_label"})]})},V=t(188),E=t(184),G=t(190),P=w.a.TAU,B=[{value:0,label:"0"},{value:P/12,label:"30"},{value:P/4,label:"90"},{value:P/2,label:"180"},{value:P/4*3,label:"270"},{value:P}],A=Object(i.a)((function(e){return{parameterGroup:{display:"block",margin:12,marginTop:24,fontSize:"small"},label:{fontSize:"small","margin-bottom":14,marginTop:24}}}));var M=function(e){var a=A(),t=e.updateShapes,c=e.nodeId,r=e.rotateData,o=[];return["x","y","z"].forEach((function(e,a){var l="rotate_".concat(e,"_0"),s="canvasnode"===c?r["rotate_".concat(e)][0]:r[e],i=Object(n.jsx)(T,{id:l,label:"".concat(e," = ").concat(Math.round(s*(180/Math.PI))),value:s,min:0,max:P,step:P/72,marks:B,onChange:"canvasnode"===c?function(a,t){return r["rotate_".concat(e)][1](t)}:function(e,a){return t(e,"vector",l,a)}},a);o.push(i)})),Object(n.jsxs)("div",{className:a.parameterGroup,children:[Object(n.jsx)("p",{className:a.label,children:"Rotate"}),o]})},Z=t(89),L=t.n(Z),U=Object(i.a)((function(e){return{slider:{width:155,display:"block",marginTop:4,marginBottom:6,marginLeft:12},checkbox:{"padding-bottom":10},inlinecheckbox:{"padding-bottom":10,display:"inline-block"},parameter:{display:"block",margin:12},parameterSubGroup:{display:"block",margin:12,marginTop:12,fontSize:"small"},parameterCheckbox:{display:"block","margin-left":12,"margin-top":3,"margin-bottom":3},inlineParameterCheckbox:{display:"inline-block","margin-left":12,"margin-top":3,"margin-bottom":3},subparameter:{"margin-left":38,"margin-top":3,"margin-bottom":3},myprimary:{color:"black"},root:{backgroundColor:"#f9f9f9",fontSize:"0.9rem"},addshape:{width:140,height:32},add:{backgroundColor:"dodgerblue",color:"white"},li:{paddingTop:4,paddingBottom:4},nested:{paddingTop:4,paddingBottom:4},body2:{fontSize:"0.9rem"},sublabel:{fontSize:"small","margin-bottom":14,marginTop:8,marginLeft:8},formControl:{margin:e.spacing(1),minWidth:120},smallFont:{fontSize:"small"}}}));var D=function(e){var a,t=e.stateVars,c=[t.canvas_w[0],t.canvas_w[1]],o=c[0],l=c[1],s=[t.canvas_h[0],t.canvas_h[1]],i=s[0],d=s[1],u=[t.dragRotate[0],t.dragRotate[1]],b=u[0],h=u[1],p=[t.animate[0],t.animate[1]],m=p[0],g=p[1],O=(t.rotate_x[0],t.rotate_x[1],t.rotate_y[0],t.rotate_y[1],t.rotate_z[0],t.rotate_z[1],[t.spin_x[0],t.spin_x[1]]),_=O[0],w=O[1],F=[t.spin_y[0],t.spin_y[1]],S=F[0],N=F[1],z=[t.spin_z[0],t.spin_z[1]],R=z[0],I=z[1],P=[t.easeIO[0],t.easeIO[1]],B=P[0],A=P[1],Z=[t.animateSelection[0],t.animateSelection[1]],D=Z[0],H=Z[1],q=[t.fallback[0],t.fallback[1]],J=q[0],W=q[1],Y=(e.cursorFocus,e.checkCursorFocus),K=U();function X(e,a){var t=e.split("_")[1],n=JSON.parse(JSON.stringify(B));n[t]=a,A(n)}return"spin"===D?a=Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsxs)(x.a,{className:K.slider,children:[Object(n.jsxs)(f.a,{variant:"body2",id:"spin_x_label",children:["x = ",(_*(180/Math.PI)).toFixed(1)," ",Object(n.jsx)("span",{className:"tinytext",children:"deg/rerender"})]}),Object(n.jsx)(j.a,{className:K.slider,id:"spin_x",value:_,min:0,max:1,step:.01,onChange:function(e,a){w(a),Y()},"aria-labelledby":"spin_x_label",disabled:!m})]}),Object(n.jsxs)(x.a,{className:K.slider,children:[Object(n.jsxs)(f.a,{variant:"body2",id:"spin_y_label",children:["y = ",(S*(180/Math.PI)).toFixed(1)," ",Object(n.jsx)("span",{className:"tinytext",children:"deg/rerender"})]}),Object(n.jsx)(j.a,{className:K.slider,id:"spin_y",value:S,min:0,max:1,step:.01,onChange:function(e,a){N(a),Y()},"aria-labelledby":"spin_y_label",disabled:!m})]}),Object(n.jsxs)(x.a,{className:K.slider,children:[Object(n.jsxs)(f.a,{variant:"body2",id:"spin_z_label",children:["z = ",(R*(180/Math.PI)).toFixed(1)," ",Object(n.jsx)("span",{className:"tinytext",children:"deg/rerender"})]}),Object(n.jsx)(j.a,{className:K.slider,id:"spin_z",value:R,min:0,max:1,step:.01,onChange:function(e,a){I(a),Y()},"aria-labelledby":"spin_z_label",disabled:!m})]})]}):"ease"===D&&(a=Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsxs)("div",{children:[Object(n.jsx)(x.a,{className:K.inlineParameterCheckbox,children:Object(n.jsx)(v.a,{label:"x",control:Object(n.jsx)(y.a,{className:K.checkbox,checked:B.x,onChange:function(){X("easeIO_x",!B.x),Y()},size:"small",name:"easeIO_x",id:"easeIO_x",color:"primary"})})}),Object(n.jsx)(x.a,{className:K.inlineParameterCheckbox,children:Object(n.jsx)(v.a,{label:"y",control:Object(n.jsx)(y.a,{className:K.checkbox,checked:B.y,onChange:function(){X("easeIO_y",!B.y),Y()},size:"small",name:"easeIO_y",id:"easeIO_y",color:"primary"})})}),Object(n.jsx)(x.a,{className:K.inlineParameterCheckbox,children:Object(n.jsx)(v.a,{label:"z",control:Object(n.jsx)(y.a,{className:K.checkbox,checked:B.z,onChange:function(){X("easeIO_z",!B.z),Y()},size:"small",name:"easeIO_z",id:"easeIO_z",color:"primary"})})})]}),Object(n.jsxs)("div",{className:K.parameterSubGroup,children:[Object(n.jsx)(T,{id:"easeIO_cycleCount",label:"Cycle",sublabel:"count = ".concat(B.cycleCount),value:B.cycleCount,min:100,max:500,step:50,marks:[{value:150,label:"short"},{value:450,label:"long"}],onChange:function(e,a){X("easeIO_cycleCount",a),Y()}}),Object(n.jsx)(T,{id:"easeIO_power",label:"Power",value:B.power,min:2,max:5,step:1,marks:[""],onChange:function(e,a){X("easeIO_power",a),Y()}})]})]})),Object(n.jsxs)("div",{children:[Object(n.jsxs)(x.a,{className:K.parameter,children:[Object(n.jsxs)(k.a,{htmlFor:"fallback",children:["Fallback Text ",Object(n.jsx)(V.a,{className:K.mediumFont,title:Object(n.jsx)(f.a,{variant:"body2",children:"Alternative text added inside the canvas tags. Useful for assistive technology users (eg. screen readers) or browsers which don't support canvas rendering."}),children:Object(n.jsx)(L.a,{fontSize:"inherit"})})]}),Object(n.jsx)(C.a,{id:"fallback",multiline:!0,maxRows:8,value:J,onChange:function(e){W(e.target.value),Y()}})]}),Object(n.jsxs)(x.a,{className:K.parameter,children:[Object(n.jsx)(k.a,{htmlFor:"canvas_w",children:"Width"}),Object(n.jsx)(C.a,{id:"canvas_w",value:o,disabled:!1,onChange:function(e){l(e.target.value),Y()}})]}),Object(n.jsxs)(x.a,{className:K.parameter,children:[Object(n.jsx)(k.a,{htmlFor:"canvas_h",children:"Height"}),Object(n.jsx)(C.a,{id:"canvas_h",value:i,disabled:!1,onChange:function(e){d(e.target.value),Y()}})]}),Object(n.jsx)(M,{nodeId:"canvasnode",rotateData:t,updateShapes:""}),Object(n.jsx)(x.a,{className:K.parameterCheckbox,children:Object(n.jsx)(v.a,{label:"Drag Rotate",control:Object(n.jsx)(y.a,{className:K.checkbox,checked:b,onChange:function(){h(!b),Y()},size:"small",name:"dragRotate",id:"dragRotate",color:"primary"})})}),Object(n.jsx)(x.a,{className:K.parameterCheckbox,children:Object(n.jsx)(v.a,{label:"Animate",control:Object(n.jsx)(y.a,{className:K.checkbox,checked:m,onChange:function(){g(!m),Y()},size:"small",name:"animate",id:"animate",color:"primary"})})}),Object(n.jsxs)("div",{className:K.parameterSubGroup,children:[Object(n.jsx)(x.a,{className:K.formControl,disabled:!m,children:Object(n.jsxs)(E.a,{labelId:"animateSelection_label",id:"animateSelection",value:D,onChange:function(e){H(e.target.value)},className:K.smallFont,children:[Object(n.jsx)(G.a,{value:"spin",className:K.smallFont,children:"Continuous spin"}),Object(n.jsx)(G.a,{value:"ease",className:K.smallFont,children:"Ease In/Out"})]})}),m?a:""]})]})};w.a.TAU,Object(i.a)((function(e){return{parameterGroup:{display:"block",margin:12,marginTop:24,fontSize:"small"},label:{fontSize:"small","margin-bottom":14,marginTop:24}}}));var H=Object(i.a)((function(e){var a;return a={checkbox:{"padding-bottom":12},parameter:{display:"block",margin:12,fontSize:"small"},parameterInline:{display:"inline-block",margin:12},parameterGroup:{display:"block",margin:12,marginTop:24,fontSize:"small"},parameterCheckbox:{display:"block","margin-left":12,"margin-top":3,"margin-bottom":3},subparameter:{"margin-left":32,"margin-top":3,"margin-bottom":3},nested:{paddingLeft:e.spacing(4)},".MuiTypography-body1":{fontSize:"0.5rem"},label:{fontSize:"small","margin-bottom":14,marginTop:24},labelsm:{fontSize:"small",display:"inline-block",width:84},textField:{width:55},delete:{margin:16,color:"red"},myprimary:{color:"black"},confirmDialog:{padding:40},li:{paddingTop:4,paddingBottom:4},slider:{marginBottom:36,marginLeft:2,display:"block",fontSize:"small"}},Object(O.a)(a,"checkbox",{"padding-bottom":10}),Object(O.a)(a,"inlineCheckbox",{display:"inline-block",marginTop:2,width:70}),Object(O.a)(a,"checkboxFace",{"padding-bottom":12,display:"inline-block",marginTop:4}),Object(O.a)(a,"disabledlabel",{fontSize:"small",color:"darkgray"}),a}));var q=function(e){var a=e.cursorFocus;console.log("cursorFocus = ",a);var t=e.selectedNodeId,o=Object(s.a)(e.addedShapes,2),l=o[0],i=o[1],d=Object(c.useState)(!1),u=Object(s.a)(d,2),b=(u[0],u[1],{stroke:Object(c.useRef)(),fill:Object(c.useRef)(),color:Object(c.useRef)(),backface:Object(c.useRef)(),translate_x:Object(c.useRef)(),translate_y:Object(c.useRef)(),translate_z:Object(c.useRef)()}),h={width:Object(c.useRef)(),height:Object(c.useRef)(),depth:Object(c.useRef)(),diameter:Object(c.useRef)(),length:Object(c.useRef)(),cornerRadius:Object(c.useRef)(),radius:Object(c.useRef)(),sides:Object(c.useRef)(),frontFace:Object(c.useRef)(),rearFace:Object(c.useRef)(),topFace:Object(c.useRef)(),bottomFace:Object(c.useRef)(),leftFace:Object(c.useRef)(),rightFace:Object(c.useRef)(),quarters:Object(c.useRef)()},p=H();function m(){var e=[];return e.push(l),e.flat()}var j=m(),f="canvasnode"!==t[0]?function(e){var a,n=t[0].split("_").map((function(e){return Number(e)}));return n.forEach((function(t,c){0<c&&c<=n.length-1?a=a.children[t]:0===c&&(a=e[t])})),a}(j):"",g=Object(c.useRef)([!1,!1]);function O(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",r=n.split("_"),o=r[0],l=r[1];if("vector"===t){var s;"translate"===o?1===e.target.value.length&&"-"===e.target.value?(g.current=["-",l],s=0):0===e.target.value.length?(g.current=["",l],s=0):(s=Number(e.target.value),g.current=[!1,!1]):"rotate"===o&&(s=Number(c));var d=f.data[o];"x"===l?d.set({x:s,y:d.y,z:d.z}):"y"===l?d.set({x:d.x,y:s,z:d.z}):d.set({x:d.x,y:d.y,z:s}),a[1]({id:n,cursorPos:e.target.selectionStart})}else"checkbox_face"===t?(e.target.checked?(f.data[o]=f.faces[o],f.faces[o]=!0):(f.faces[o]=f.data[o],f.data[o]=!1),a[1]({id:"",cursorPos:0})):"slider"===t?(f.data[o]=c,a[1]({id:"",cursorPos:0})):"checkbox"===t?(f.data[o]=!f.data[o],a[1]({id:"",cursorPos:0})):"textinput"===t?(f.data[o]=e.target.value,a[1]({id:e.target.id,cursorPos:e.target.selectionStart})):"color"===t&&(f.data[o]=e.target.value,a[1]({id:"",cursorPos:0}));g.current===[!1,!1]&&i(j)}var _="",w=[],F=[],z=Object(n.jsxs)("div",{className:p.parameterGroup,children:[Object(n.jsx)("p",{className:p.label,children:"Faces"}),F]});function I(e,a){if(""!==e[0].id){var t,n=e[0].id.split("_");console.log(n),3===n.length?(console.log("equal to 3"),t="".concat(n[0],"_").concat(n[1])):t="".concat(n[0]);var c=e[0].cursorPos,r=void 0!==a[t]?a[t]:b[t];void 0!==r&&void 0!==r.current&&null!==r.current&&(r.current.focus(),0!==c&&r.current.setSelectionRange(c,c))}}function V(e,a,t,n){if("-"===e.target.value||0===e.target.value.length){e.target.value=0,O(e,a,t,n)}}return"canvasnode"!==t[0]&&(Object.keys(h).forEach((function(e){if(void 0!==f.data[e])if(e.includes("Face")&&"Box"===f.shapeClass){var t=e.split("F")[0],c=Object(n.jsx)(S,{side:t,copyOfShape:f,updateShapes:O,cursorFocus:a,refocus:I,shapeRefs:h});F.push(c)}else if("quarters"===e||"sides"===e){var r="quarters"===e?1:3,o="quarters"===e?4:12,l="".concat(e,"_").concat(0),s=Object(n.jsx)(T,{id:l,label:N(e),value:f.data[e],min:r,max:o,step:1,marks:[""],onChange:function(e,a){return O(e,"slider",l,a)}});w.push(s)}else if("frontFace"!==e){var i=Object(n.jsx)(R,{parameter:e,copyOfShape:f,updateShapes:O,paramRef:h[e]});w.push(i)}})),0!==F.length&&w.push(z),_=function(){var e=Object(n.jsxs)(x.a,{className:p.parameter,children:[Object(n.jsx)("label",{htmlFor:"frontFace_0",className:p.labelsm,children:"Front Face"}),Object(n.jsx)("input",{type:"color",id:"frontFace_0",value:f.data.frontFace,onChange:function(e){return O(e,"color","frontFace_".concat(0),"")},inputref:h.frontFace})]});return Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsxs)(x.a,{className:p.parameter,children:[Object(n.jsx)("label",{htmlFor:"color_0",className:p.labelsm,children:"Color"}),Object(n.jsx)("input",{type:"color",id:"color_0",value:f.data.color,onChange:function(e){return O(e,"color","color_".concat(0),"")},inputref:b.color})]}),Object(n.jsxs)(x.a,{className:p.parameter,children:[Object(n.jsx)("label",{htmlFor:"backface_0",className:p.labelsm,children:"Back Face"}),Object(n.jsx)("input",{type:"color",id:"backface_0",value:f.data.backface,onChange:function(e){return O(e,"color","backface_".concat(0),"")},inputref:b.backface})]}),"Cylinder"===f.shapeClass?e:""]})}()),Object(c.useEffect)((function(){I(a,h)}),[]),Object(n.jsx)(r.a.Fragment,{children:"canvasnode"===t[0]?Object(n.jsx)(D,{checkCursorFocus:e.checkCursorFocus,cursorFocus:a,stateVars:e.stateVars,updateShapes:O}):Object(n.jsxs)("div",{children:["Box"!==f.shapeClass&&"Group"!==f.shapeClass?_:"","Group"!==f.shapeClass?Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsx)(x.a,{className:p.parameterCheckbox,children:Object(n.jsx)(v.a,{label:"Fill",control:Object(n.jsx)(y.a,{inputRef:b.fill,checked:f.data.fill,onChange:function(e){return O(e,"checkbox","fill_".concat(0),"")},size:"small",id:"fill_0",color:"primary",className:p.checkbox})})}),Object(n.jsxs)(x.a,{className:p.parameter,children:[Object(n.jsx)(k.a,{htmlFor:"stroke_0",children:"Stroke"}),Object(n.jsx)(C.a,{inputRef:b.stroke,id:"stroke_0",value:f.data.stroke,disabled:!1,onChange:function(e){O(e,"textinput","stroke_".concat(0),""),console.log(e.target.selectionStart)}})]})]}):"",Object(n.jsxs)("div",{className:p.parameter,children:[Object(n.jsx)("p",{className:p.label,children:"Translate"}),Object(n.jsxs)(x.a,{className:p.textField,children:[Object(n.jsx)(k.a,{htmlFor:"translate_x_0",children:"x"}),Object(n.jsx)(C.a,{inputRef:b.translate_x,id:"translate_x_0",value:"x"===g.current[1]?g.current[0]:f.data.translate.x,onBlur:function(e){return V(e,"vector","translate_x_".concat(0),"")},disabled:!1,onChange:function(e){return O(e,"vector","translate_x_".concat(0),"")}})]}),Object(n.jsxs)(x.a,{className:p.textField,children:[Object(n.jsx)(k.a,{htmlFor:"translate_y_0",children:"y"}),Object(n.jsx)(C.a,{inputRef:b.translate_y,id:"translate_y_0",value:"y"===g.current[1]?g.current[0]:f.data.translate.y,onBlur:function(e){return V(e,"vector","translate_y_".concat(0),"")},disabled:!1,onChange:function(e){return O(e,"vector","translate_y_".concat(0),"")}})]}),Object(n.jsxs)(x.a,{className:p.textField,children:[Object(n.jsx)(k.a,{htmlFor:"translate_z_0",children:"z"}),Object(n.jsx)(C.a,{inputRef:b.translate_z,id:"translate_z_0",value:"z"===g.current[1]?g.current[0]:f.data.translate.z,onBlur:function(e){return V(e,"vector","translate_z_".concat(0),"")},disabled:!1,onChange:function(e){return O(e,"vector","translate_z_".concat(0),"")}})]})]}),Object(n.jsx)(M,{nodeId:t[0],rotateData:f.data.rotate,updateShapes:O}),w]})})};Object(i.a)((function(e){return{slider:{width:200},checkbox:{"padding-bottom":12},parameter:{display:"block",margin:16},subparameter:{"margin-left":32,"margin-top":3,"margin-bottom":3},root:{backgroundColor:"#f1f1f1"}}}));var J=Object(i.a)((function(e){return{slider:{width:155},checkbox:{"padding-bottom":10},parameter:{display:"block",margin:12},parameterCheckbox:{display:"block","margin-left":12,"margin-top":3,"margin-bottom":3},subparameter:{"margin-left":38,"margin-top":3,"margin-bottom":3},myprimary:{color:"black"},root:{backgroundColor:"#f9f9f9",fontSize:"0.9rem"},addshape:{width:140,height:32},add:{backgroundColor:"dodgerblue",color:"white"},li:{paddingTop:4,paddingBottom:4},nested:{paddingTop:4,paddingBottom:4},body2:{fontSize:"0.9rem"}}}));var W=function(e){var a=e.stateVars,t=Object(c.useState)(!0),r=Object(s.a)(t,2),o=(r[0],r[1],Object(c.useState)("Ellipse")),l=Object(s.a)(o,2),i=(l[0],l[1],e.cursorFocus);function d(){console.log("inside cursor check"),""!==i[0].id&&(i[1]({id:"",cursorPos:0}),console.log("cursorFocus reset"))}return J(),Object(n.jsx)("section",{className:"controls",children:Object(n.jsx)("section",{className:"controls_illo",children:Object(n.jsx)("div",{className:"controlsContainer",children:Object(n.jsx)(q,{selectedNodeId:e.selectedNodeId,addedShapes:e.addedShapes,checkCursorFocus:d,cursorFocus:i,stateVars:a})})})})},Y="";var K=function(e){var a=e.stateVars,t=e.shapes,r=Object(c.useRef)(a.dragRotate[0]);r.current=a.dragRotate[0];var o=Object(c.useRef)(a.animate[0]);o.current=a.animate[0];var l=Object(c.useRef)(a.rotate_x[0]);l.current=a.rotate_x[0];var s=Object(c.useRef)(a.rotate_y[0]);s.current=a.rotate_y[0];var i=Object(c.useRef)(a.rotate_z[0]);i.current=a.rotate_z[0];var d=Object(c.useState)(!1),u=Object(c.useRef)(a.spin_x[0]);u.current=a.spin_x[0];var b=Object(c.useRef)(a.spin_y[0]);b.current=a.spin_y[0];var h=Object(c.useRef)(a.spin_z[0]);h.current=a.spin_z[0];var p=Object(c.useRef)(a.animateSelection[0]);p.current=a.animateSelection[0];var m=Object(c.useRef)(a.easeIO[0].x);m.current=a.easeIO[0].x;var j=Object(c.useRef)(a.easeIO[0].y);j.current=a.easeIO[0].y;var f=Object(c.useRef)(a.easeIO[0].z);f.current=a.easeIO[0].z;var g=Object(c.useRef)(a.easeIO[0].cycleCount);g.current=a.easeIO[0].cycleCount;var O,x=Object(c.useRef)(a.easeIO[0].power);function v(e,a){e.children.length>0&&e.children.forEach((function(e){e.data.addTo=a,v(e,new w.a[e.shapeClass](e.data))}))}function y(){(Y=new w.a.Illustration({element:"#illo",dragRotate:a.dragRotate[0],rotate:{x:l.current,y:s.current,z:i.current}})).setSize(a.canvas_w[0],a.canvas_h[0]),t[0].slice(0,t[0].length).forEach((function(e){console.log(e),e.data.addTo=Y,0!==Object.keys(e.faces).length&&Object.keys(e.faces).forEach((function(a){!1===e.faces[a]&&(e.data[a]=!1)}));var a=new w.a[e.shapeClass](e.data);v(e,a)})),Y.updateRenderGraph(),console.log("illo = ",Y)}x.current=a.easeIO[0].power;var k=0;function C(){if(!1===o.current&&!1===r.current)console.log("canceling animation frame"),cancelAnimationFrame(O),Y.rotate.x=l.current,Y.rotate.y=s.current,Y.rotate.z=i.current,Y.updateRenderGraph(),d[1](!1);else{if(!0===o.current)if("spin"===p.current)0===u.current?Y.rotate.x=l.current:Y.rotate.x+=u.current,0===b.current?Y.rotate.y=s.current:Y.rotate.y+=b.current,0===h.current?Y.rotate.z=i.current:Y.rotate.z+=h.current;else if("ease"===p.current){var e=k/g.current,a=w.a.easeInOut(e%1,x.current);m.current&&(Y.rotate.x=a*w.a.TAU),j.current&&(Y.rotate.y=a*w.a.TAU),f.current&&(Y.rotate.z=a*w.a.TAU),k++}Y.updateRenderGraph(),O=requestAnimationFrame(C)}}return Object(c.useEffect)((function(){y()})),Object(c.useEffect)((function(){""!==Y&&a.animate[0]|a.dragRotate[0]&&!1===d[0]&&(console.log("was not rotating"),d[1](!0),C())}),[a.animate[0],a.dragRotate[0]]),Object(n.jsx)("section",{className:"results",children:Object(n.jsx)("section",{className:"illustration",width:a.canvas_w[0],height:a.canvas_h[0],children:Object(n.jsx)("canvas",{id:"illo",width:a.canvas_w[0],height:a.canvas_h[0],children:Object(n.jsx)("p",{children:a.fallback[0]})})})})},X=t(181),Q=t(70),$=t.n(Q),ee=t(91),ae=t.n(ee),te=t(192),ne=t(179),ce=t(174),re=t(187),oe=t(180),le=t(130),se=t(90),ie=t.n(se),de=t(94),ue=t(52),be=t.n(ue),he=Object(i.a)({addbtn:{color:"white"},disabled:{color:"grey"}});function pe(e){var a=r.a.useState(null),t=Object(s.a)(a,2),c=t[0],o=t[1],l=e.selectedNodeId,i=e.addNewZdogShape,d=he(),u=function(){o(null)};function b(e){u(),i(e,l[0])}return Object(n.jsxs)("div",{children:[Object(n.jsx)(ce.a,{disabled:""===l[0],"aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){o(e.currentTarget)},children:Object(n.jsx)(be.a,{className:""===l[0]?d.disabled:d.addbtn,fontSize:"small"})}),Object(n.jsxs)(de.a,{id:"simple-menu",anchorEl:c,keepMounted:!0,open:Boolean(c),onClose:u,children:[Object(n.jsx)(G.a,{onClick:function(){return b("Group")},value:"Group",children:"Group"}),Object(n.jsx)(G.a,{onClick:function(){return b("Ellipse")},value:"Ellipse",children:"Ellipse"}),Object(n.jsx)(G.a,{onClick:function(){return b("Rect")},value:"Rectangle",children:"Rectangle"}),Object(n.jsx)(G.a,{onClick:function(){return b("RoundedRect")},value:"Rounded Rectangle",children:"Rounded Rectangle"}),Object(n.jsx)(G.a,{onClick:function(){return b("Box")},value:"Box",children:"Box"}),Object(n.jsx)(G.a,{onClick:function(){return b("Hemisphere")},value:"Hemisphere",children:"Hemisphere"}),Object(n.jsx)(G.a,{onClick:function(){return b("Polygon")},value:"Polygon",children:"Polygon"}),Object(n.jsx)(G.a,{onClick:function(){return b("Cone")},value:"Cone",children:"Cone"}),Object(n.jsx)(G.a,{onClick:function(){return b("Cylinder")},value:"Cylinder",children:"Cylinder"})]})]})}var me=Object(i.a)({root:{padding:16,overflowX:"scroll",overflowY:"scroll",height:window.innerHeight-185},item:{},addshape:{width:140,height:34},add:{backgroundColor:"dodgerblue",color:"white"},delete:{color:"white"},disabled:{color:"grey"},inlineAdd:{display:"inline"},shapelabel:{display:"inline",paddingTop:11},confirmDialog:{padding:40}});function je(e){e.stateVars;var a=e.addedShapes,t=(e.cursorFocus,e.selectedNodeId),o=e.addNewZdogShape,l=me(),i=r.a.useState(["canvasnode"]),d=Object(s.a)(i,2),u=d[0],b=d[1];console.log("expanded = "+u);var h=Object(c.useState)(!1),p=Object(s.a)(h,2),j=p[0],g=p[1];function O(e){var a=[];return a.push(e),a.flat()}function x(){g(!1)}function v(e,a){var t=a;return console.log(0!==e.length),0!==e.length?e.map((function(e,a){var c="".concat(t,"_").concat(a);return Object(n.jsx)(te.a,{className:l.item,nodeId:c,label:N(e.shapeClass),children:v(e.children,c)},m())})):""}var y=a[0].map((function(e,a){return Object(n.jsx)(te.a,{className:l.item,nodeId:a.toString(),label:N(e.shapeClass),children:v(e.children,a.toString())},m())}));return Object(c.useEffect)((function(){!function(){var e=t[0].split("_");if(e.length>1){e.pop();var a=e.join("_");if(!u.includes(a)){console.log("does not include parentId");var n=O(u);n.push(a),b(n)}}else if(!u.includes("canvasnode")){var c=O(u);c.push("canvasnode"),b(c)}}()})),Object(n.jsxs)("section",{className:"shapetree",children:[Object(n.jsx)("div",{className:"toplevelactions",children:Object(n.jsxs)(ne.a,{id:"btngrp",children:[Object(n.jsx)("div",{children:Object(n.jsx)(ce.a,{className:""===t[0]||"canvasnode"===t[0]?l.disabled:l.delete,onClick:function(){console.log("hello"),g(!0)},"aria-label":"delete",disabled:""===t[0]||"canvasnode"===t[0],children:Object(n.jsx)(ie.a,{fontSize:"small"})})}),Object(n.jsx)(re.a,{onClose:x,open:j,children:Object(n.jsxs)(oe.a,{className:l.confirmDialog,children:[Object(n.jsx)(f.a,{children:"Deleting this shape will also delete any child shapes. Are you sure you want to delete this shape?"}),Object(n.jsxs)("div",{children:[Object(n.jsx)(le.a,{onClick:function(){var e=function(){var e=[];return e.push(a[0]),e.flat()}(),n=t[0].split("_").map((function(e){return Number(e)}));if(1===n.length)e.splice(n[0],1),t[1]("canvasnode");else{var c;n.forEach((function(a,t){0<t&&t<=n.length-2?c=c.children[a]:0===t&&(c=e[a])}));var r=n[n.length-1];c.children.splice(r,1),n.pop();var o=n.map((function(e){return e.toString()})).join("_");t[1](o)}a[1](e),x()},color:"primary",children:"Confirm"}),Object(n.jsx)(le.a,{onClick:x,children:"Cancel"})]})]})}),Object(n.jsx)(pe,{selectedNodeId:t,addNewZdogShape:o})]})}),Object(n.jsx)(X.a,{className:l.root,defaultCollapseIcon:Object(n.jsx)($.a,{}),defaultExpandIcon:Object(n.jsx)(ae.a,{}),expanded:u,selected:t[0],onNodeToggle:function(e,a){b(a)},onNodeSelect:function(e,a){t[1](a),console.log("nodeIds: "+a)},children:Object(n.jsx)(te.a,{className:l.item,nodeId:"canvasnode",label:"Canvas",children:y})})]})}var fe={basic:["addTo","color","backface","stroke","fill","translate","rotate"],Ellipse:["width","height","quarters"],Rect:["width","height"],Box:["width","height","depth","frontFace","rearFace","topFace","bottomFace","leftFace","rightFace"],Hemisphere:["diameter"],RoundedRect:["width","height","cornerRadius"],Polygon:["radius","sides"],Cone:["diameter","length"],Cylinder:["diameter","length","frontFace"],Group:[]},ge=t(182),Oe=t(183),xe=t(92),ve=t.n(xe),ye=t(72),ke=t(71),Ce=t.n(ke);function _e(e,a){var t,n='\n/* illo.js */\n\n// Copy and paste everything into a new file named "illo.js"\n\n\n// create illo\nlet illo = new Zdog.Illustration({\n    // set canvas with id \'illo\'\n    element: "#illo",\n    dragRotate: '.concat(e.dragRotate[0],",\n    rotate: {\n        x: ").concat(e.rotate_x[0],",\n        y: ").concat(e.rotate_y[0],",\n        z: ").concat(e.rotate_z[0],"\n    }\n});\n    "),c=0;function r(e,a){e.children.length>0&&e.children.forEach((function(e){var t="shape".concat(c),o=e.data;e.data.addTo="--"+a+"--";var l=JSON.stringify(o,null,"\t"),s="\nlet ".concat(t," = new Zdog['").concat(e.shapeClass,"'](").concat(l,")\n        ");n=n.concat(s),c+=1,r(e,t)}))}return a.forEach((function(e){var a="shape".concat(c),t=e.data;t.addTo="--illo--";var o=JSON.stringify(t,null,"\t"),l="\nlet ".concat(a," = new Zdog['").concat(e.shapeClass,"'](").concat(o,")\n        ");n=n.concat(l),c+=1,r(e,a)})),e.animate[0]?"spin"===e.animateSelection[0]?t="\nfunction animate() {\n    illo.rotate.x += ".concat(e.spin_x[0],";\n    illo.rotate.y += ").concat(e.spin_y[0],";\n    illo.rotate.z += ").concat(e.spin_z[0],";\n    illo.updateRenderGraph();\n    requestAnimationFrame(animate);\n}\n            \n    animate();\n        "):"ease"===e.animateSelection[0]&&(t="\n/* Zdog animate fn for easeInOut */\n\nlet ticker = 0;\nlet cycleCount = ".concat(e.easeIO[0].cycleCount,";\n\nfunction animate() {\n    let progress = ticker / cycleCount;\n    // apply easing to rotation\n    let tween = Zdog.easeInOut(progress % 1, ").concat(e.easeIO[0].power,");\n    ").concat(e.easeIO[0].x?"illo.rotate.x = tween * Zdog.TAU;":"","\n    ").concat(e.easeIO[0].y?"illo.rotate.y = tween * Zdog.TAU;":"","\n    ").concat(e.easeIO[0].z?"illo.rotate.z = tween * Zdog.TAU;":"","\n    ticker++;\n\n    illo.updateRenderGraph();\n    requestAnimationFrame(animate);\n}\n\nanimate();\n        ")):t=!e.animate[0]&&e.dragRotate[0]?"\nfunction animate() {\n    illo.updateRenderGraph();\n    requestAnimationFrame(animate);\n}\n        \nanimate();\n        ":"\n// update & render\nillo.updateRenderGraph();\n        ",n=n.concat(t)}var we={Group:new w.a.Group,Ellipse:new w.a.Ellipse,Rect:new w.a.Rect,Box:new w.a.Box,Hemisphere:new w.a.Hemisphere,RoundedRect:new w.a.RoundedRect,Polygon:new w.a.Polygon,Cone:new w.a.Cone,Cylinder:new w.a.Cylinder},Fe=Object(i.a)((function(e){return{bar:{backgroundColor:"#2b2b2b"},getCode:{right:16,position:"absolute",backgroundColor:"#3a3939",paddingLeft:16,paddingRight:16},container:{paddingTop:24}}})),Se={none:{fallback:"An animated illustration consisting of 3D shapes",shapelayers:[]},lego:{fallback:"Animated model of a red LEGO piece",shapelayers:[{id:m(),children:[{id:m(),children:[{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#c30006",backface:"#aa0a11",stroke:"1",fill:!0,translate:new w.a.Vector({x:-80,y:0,z:0}),rotate:new w.a.Vector({}),diameter:"65",length:"85",frontFace:"#000000"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#c30006",backface:"#aa0a11",stroke:"1",fill:!0,translate:new w.a.Vector({}),rotate:new w.a.Vector({}),diameter:"65",length:"85",frontFace:"#000000"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#c30006",backface:"#aa0a11",stroke:"1",fill:!0,translate:new w.a.Vector({x:80,y:0,z:0}),rotate:new w.a.Vector({}),diameter:"65",length:"85",frontFace:"#000000"},faces:{}}],open:!0,shapeClass:"Group",data:{translate:new w.a.Vector({x:0,y:5,z:0}),rotate:new w.a.Vector({x:1.5707963267948966,y:0,z:0})},faces:{}}],open:!0,shapeClass:"Box",data:{color:"#c30005",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({}),rotate:new w.a.Vector({}),width:"320",height:"96",depth:"160",frontFace:"#b2081f",rearFace:"#c30005",topFace:"#db0623",bottomFace:!1,leftFace:"#c30005",rightFace:"#c30005"},faces:{frontFace:!0,rearFace:!0,topFace:!0,bottomFace:"#a20106",leftFace:!0,rightFace:!0}},{id:m(),children:[{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#c30006",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({x:40,y:40,z:0}),rotate:new w.a.Vector({}),diameter:"50",length:"20",frontFace:"#db0723"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#c30006",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({x:40,y:-40,z:0}),rotate:new w.a.Vector({}),diameter:"50",length:"20",frontFace:"#db0723"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#c30006",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({x:120,y:40,z:0}),rotate:new w.a.Vector({}),diameter:"50",length:"20",frontFace:"#db0723"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#c30006",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({x:120,y:-40,z:0}),rotate:new w.a.Vector({}),diameter:"50",length:"20",frontFace:"#db0723"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#c30006",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({x:-120,y:40,z:0}),rotate:new w.a.Vector({}),diameter:"50",length:"20",frontFace:"#db0723"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#b2081f",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({x:-120,y:-40,z:0}),rotate:new w.a.Vector({}),diameter:"50",length:"20",frontFace:"#db0723"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#b2081f",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({x:-40,y:40,z:0}),rotate:new w.a.Vector({}),diameter:"50",length:"20",frontFace:"#db0723"},faces:{}},{id:m(),children:[],open:!0,shapeClass:"Cylinder",data:{color:"#b2081f",backface:!0,stroke:1,fill:!0,translate:new w.a.Vector({x:-40,y:-40,z:0}),rotate:new w.a.Vector({}),diameter:"50",length:"20",frontFace:"#db0723"},faces:{}}],open:!0,shapeClass:"Group",data:{translate:new w.a.Vector({x:0,y:-58,z:0}),rotate:new w.a.Vector({x:1.5707963267948966,y:0,z:0})},faces:{}}]}};var Ne=function(e){var a={canvas_w:Object(c.useState)(500),canvas_h:Object(c.useState)(500),dragRotate:Object(c.useState)(!0),animate:Object(c.useState)(!1),rotate_x:Object(c.useState)(0),rotate_y:Object(c.useState)(3.141592653589793),rotate_z:Object(c.useState)(.4363323129985824),spin_x:Object(c.useState)(.01),spin_y:Object(c.useState)(.04),spin_z:Object(c.useState)(.01),easeIO:Object(c.useState)({x:!0,y:!0,z:!1,cycleCount:400,power:3}),animateSelection:Object(c.useState)("ease"),demo:Object(c.useState)("lego"),fallback:Object(c.useState)(Se.lego.fallback)},t=Object(c.useState)(Se.lego.shapelayers),o=Object(c.useState)(!1),l=Object(s.a)(o,2),i=l[0],d=l[1],u=Object(c.useState)({id:"",cursorPos:0}),b=Object(c.useState)("canvasnode"),h=Fe();function p(){var e=[];return e.push(t[0]),e.flat()}return console.log("testing outside return"),Object(c.useEffect)((function(){i&&(console.log("open"),setTimeout((function(){var e=document.getElementById("editorHTML"),n=Object(ye.a)(e,Ce.a.highlightElement),c='<canvas id="illo" width="'.concat(a.canvas_w[0],'" height="').concat(a.canvas_h[0],'">\n          <p>').concat(a.fallback[0],"</p>\n        </canvas>");n.updateCode(c);var r=document.getElementById("editor");if(null!==r){var o=Object(ye.a)(r,Ce.a.highlightElement);if(t[0].length>0){var l=p(),s=function(e){return e.replaceAll('"--',"").replaceAll('--"',"")}(_e(a,l));o.updateCode(s)}var i=o.toString();console.log(i),o.onUpdate((function(e){console.log(e)}))}}),1e3))}),[i]),console.log("selectedNodeId[0]: "+b[0]),Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsx)(ge.a,{elevation:0,position:"fixed",className:h.bar,children:Object(n.jsxs)(Oe.a,{children:[Object(n.jsx)(f.a,{variant:"h6",children:"Zdog UI"}),Object(n.jsx)(le.a,{onClick:function(){console.log("getting code"),d(!0)},color:"inherit",startIcon:Object(n.jsx)(ve.a,{}),"aria-label":"get code",className:h.getCode,children:"Get Code"}),Object(n.jsx)(re.a,{maxWidth:"md",onClose:function(){d(!1)},open:i,children:Object(n.jsxs)(oe.a,{className:h.container,children:[Object(n.jsx)(f.a,{children:"HTML"}),Object(n.jsx)("div",{id:"editorHTML",children:"Canvas element..."}),Object(n.jsx)(f.a,{children:"JavaScript"}),Object(n.jsx)("div",{id:"editor",children:"Getting code..."})]})})]})}),Object(n.jsxs)("main",{children:[Object(n.jsx)(je,{selectedNodeId:b,cursorFocus:u,addNewZdogShape:function(e,a){var n=p(),c=function(e,a){var t=e[a],n=fe[a],c={},r={};return("Group"===a?["translate","rotate"]:fe.basic).forEach((function(e){if("translate"===e||"rotate"===e)c[e]=new w.a.Vector({});else{var a=t[e];c[e]=a}})),n.forEach((function(e){if("width"===e||"height"===e||"depth"===e||"diameter"===e||"length"===e||"radius"===e)c[e]=100;else if(e.includes("Face")||e.includes("face"))c[e]="#000000",r[e]=!0;else{var a=t[e];c[e]=a}})),{data:c,faces:r}}(we,e),r={id:m(),children:[],open:!0,shapeClass:e,data:c.data,faces:c.faces};if("canvasnode"===a)n.push(r),b[1]((n.length-1).toString());else{var o,l=a.split("_").map((function(e){return Number(e)}));l.forEach((function(e,a){0<a&&a<=l.length-1?o=o.children[e]:0===a&&(o=n[e])})),o.children.push(r);var s=o.children.length;b[1](a+"_"+(s-1))}t[1](n)},stateVars:a,addedShapes:t}),Object(n.jsx)(K,{shapes:t,stateVars:a}),Object(n.jsx)(W,{selectedNodeId:b,cursorFocus:u,stateVars:a,addedShapes:t})]})]})},ze=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,193)).then((function(a){var t=a.getCLS,n=a.getFID,c=a.getFCP,r=a.getLCP,o=a.getTTFB;t(e),n(e),c(e),r(e),o(e)}))};l.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(Ne,{})}),document.getElementById("root")),ze()},24:function(e,a,t){}},[[127,1,2]]]);
//# sourceMappingURL=main.0a54ee19.chunk.js.map