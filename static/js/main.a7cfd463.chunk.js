(this.webpackJsonpguesswho=this.webpackJsonpguesswho||[]).push([[0],{50:function(e,t,n){e.exports=n(85)},59:function(e,t,n){},60:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var a=n(42),i=n(3),r=n(7),o=n.n(r),c=n(1),s=n.n(c);n(59),n(60),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l,d=n(44),u=n.n(d),b=n(30),p=n(4),m=n(8),f=Object(m.d)({name:"game",initialState:{numCards:24,showName:!0},reducers:{setNumCards:function(e,t){e.numCards=t.payload},setShowName:function(e,t){e.showName=t.payload}}}),g=f.actions,v=g.setNumCards,x=g.setShowName,j=f.reducer,O=n(48),h=n(5),y=n(20),k=n.n(y),C=n(18),w=n.n(C),N=n(28);!function(e){e.unFetched="unfetched",e.isPending="pending",e.hasSucceeded="succeded",e.hasFailed="failed"}(l||(l={}));var z=n(45),S=new(n.n(z).a)({url:"https://api.jacobrienstra.com",project:"guesswho",mode:"cookie"}),F=Object(m.c)({selectId:function(e){return e.id}}),P=F.getInitialState({status:l.unFetched}),E=Object(m.b)("fetchCards",function(){var e=Object(N.a)(w.a.mark((function e(t){var n,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.getItems("cards",{fields:["id","name","image.data.full_url","deck.name"],filter:{"deck.name":{eq:t}}});case 2:return n=e.sent,a=n.data,e.abrupt("return",a.map((function(e){return{name:e.name,id:e.id,srcUri:e.image.data.full_url}})));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I=Object(m.b)("fetchDecks",Object(N.a)(w.a.mark((function e(){var t,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.getItems("decks",{fields:["name"]});case 2:return t=e.sent,n=t.data,e.abrupt("return",n.map((function(e){return e.name})));case 5:case"end":return e.stop()}}),e)})))),D=Object(m.d)({name:"api",initialState:{decks:{status:l.unFetched},cards:P},reducers:{removeCards:function(e){F.removeAll(e.cards)}},extraReducers:function(e){e.addCase(E.pending,(function(e){e.cards.status=l.isPending})),e.addCase(E.fulfilled,(function(e,t){e.cards.status=l.hasSucceeded,F.removeAll(e.cards),F.upsertMany(e.cards,t.payload)})),e.addCase(E.rejected,(function(e,t){e.cards.status=l.hasFailed,e.cards.error=t.error.message})),e.addCase(I.pending,(function(e){e.decks.status=l.isPending})),e.addCase(I.fulfilled,(function(e,t){e.decks.status=l.hasSucceeded,e.decks.value=t.payload})),e.addCase(I.rejected,(function(e,t){e.decks.status=l.hasFailed,e.decks.error=t.error.message}))}}),W=D.actions.removeCards,G=F.getSelectors((function(e){return e.api.cards})),M=G.selectAll,A=G.selectById,U=G.selectIds,L=G.selectEntities,V=D.reducer,B=Object(m.d)({name:"game",initialState:{},reducers:{setDeck:function(e,t){e.deck=t.payload},setPlayerCard:function(e,t){var n;e.playerCard=null===(n=t.payload)||void 0===n?void 0:n.id},setPlayerName:function(e,t){var n,a=null===(n=t.payload)||void 0===n?void 0:n.replace("-","_");e.playerName=a},setOpponentCode:function(e,t){e.opponentCode=t.payload},setOpponentCard:function(e,t){e.opponentCard=t.payload},setOppCardError:function(e,t){e.oppCardError=t.payload},unSetOpponentAndGameCards:function(e){e.opponentCode=void 0,e.opponentCard=void 0,e.gameCards=void 0},setGameCards:function(e,t){e.gameCards=t.payload},setIsPlaying:function(e,t){e.isPlaying=t.payload}}}),q=B.actions,J=q.setDeck,Y=q.setPlayerCard,H=q.setPlayerName,K=q.unSetOpponentAndGameCards,T=q.setIsPlaying,_=q.setOppCardError,R=B.actions,X=R.setOpponentCard,$=R.setOpponentCode,Q=R.setGameCards;function Z(e){for(var t=e.length-1;t>0;t-=1){var n=Math.floor(Math.random()*(t+1)),a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}}function ee(e){return null!==e&&void 0!==e}var te=B.reducer,ne={key:"guesswho",storage:u.a},ae=Object(b.a)(ne,Object(p.c)({game:te,settings:j,api:V})),ie=Object(m.a)({reducer:ae}),re=Object(b.b)(ie),oe=ie,ce=n(14),se=n(47),le=n(17),de=n(0);var ue=n(86),be=n(10);var pe={name:"19vwtgk",styles:'display:flex;align-items:center;label{display:flex;align-items:center;font-weight:700;font-size:1.5rem;input[type="number"]{margin:0 1rem;padding:0.5rem;font-size:1.5rem;border:2px solid black;border-radius:4px;outline:none;}}svg{margin-right:1rem;}'};var me=function(e){var t=e.name,n=e.label,a=e.value,i=e.onSubmit,r=e.min,o=e.max,c=s.a.useState(a),l=Object(h.a)(c,2),d=l[0],u=l[1];return Object(de.b)("div",{css:pe,className:"input"},Object(de.b)("label",{htmlFor:t},n,Object(de.b)("input",{name:t,type:"number",value:d,min:r,max:o,onKeyUp:function(e){13===e.keyCode&&d&&d>=r&&d<=o&&i(d)},onInput:function(e){var t=parseInt(e.target.value,10);u(t),t>=r&&t<=o&&i(t)}})))};var fe={name:"13zpkux",styles:"position:fixed;top:0;right:0;bottom:0;left:0;z-index:201;display:flex;align-items:center;justify-content:center;background-color:rgb(33,33,33);border-color:rgb(33,33,33);border-radius:inherit;opacity:0.46;transition:0.3s cubic-bezier(0.25,0.8,0.5,1),z-index 1ms;will-change:opacity;"},ge={name:"18td1ip",styles:"&.container{position:fixed;top:0;left:0;z-index:202;display:flex;justify-content:center;width:100%;height:100%;outline:none;transition:0.2s cubic-bezier(0.25,0.8,0.25,1) z-index 1ms;.modal{position:fixed;z-index:202;display:flex;flex-direction:column;box-sizing:content-box;width:calc(100% - 16px);max-width:90%;height:calc(100% - 16px);max-height:90%;margin-top:24px;overflow-y:hidden;background:white;border-radius:4px;box-shadow:0 11px 15px -7px rgba(0,0,0,0.2),0 24px 38px 3px rgba(0,0,0,0.14),0 9px 46px 8px rgba(0,0,0,0.12);transform-origin:center center;opacity:1;transition:0.3s cubic-bezier(0.25,0.8,0.25,1);.header{display:flex;flex-shrink:0;align-items:center;justify-content:space-between;padding:8px 24px;border-bottom:2px solid black;.title{margin-right:12px;font-size:32px;}.button{padding:6px 10px;border-radius:4px;cursor:pointer;&:hover{color:white;background-color:var(--blue);}}}.body{position:relative;display:flex;flex:1 1 auto;overflow-x:hidden;overflow-y:auto;}.footer{display:flex;flex-direction:row;flex-shrink:0;align-items:center;justify-content:space-between;padding:8px 24px;border-top:2px solid black;& > *:not(:last-child){margin-right:8px;}}}}"};var ve=function(e){return Object(de.b)(s.a.Fragment,null,Object(de.b)("div",{css:fe},'""'),Object(de.b)("div",{css:ge,className:"container"},Object(de.b)("div",{className:"modal"},Object(de.b)("div",{className:"header"},Object(de.b)("h2",{className:"title"},e.title),Object(de.b)(be.a,{icon:"times",size:"lg",className:"button",onClick:e.onClose})),Object(de.b)("div",{className:"body"},e.children),e.footer?Object(de.b)("div",{className:"footer"},e.footer):null)))};var xe={name:"ymrvmc",styles:"display:flex;.label{display:flex;align-items:center;font-weight:700;font-size:1.5rem;}svg{margin:0 1rem;cursor:pointer;}"};var je=function(e){var t=e.label,n=e.value,a=void 0!==n&&n,i=e.onToggle,r=s.a.useState(a),o=Object(h.a)(r,2),c=o[0],l=o[1],d=function(){l(!c),i(!c)};return Object(de.b)("div",{css:xe},Object(de.b)("span",{className:"label"},t),c?Object(de.b)(be.a,{icon:"check-square",size:"2x",color:"var(--green)",onClick:d}):Object(de.b)(be.a,{icon:["far","square"],size:"2x",onClick:d}))};var Oe={name:"diuzta",styles:"border-radius:4px;svg{margin:8px 0;padding:4px;cursor:pointer;&:hover{color:white;background:black;}}"},he={name:"1hozkzd",styles:"display:flex;flex-direction:column;justify-content:flex-start;padding:16px 32px;.numCards,.showName{display:flex;align-items:center;margin-bottom:1rem;.data{font-weight:bold;font-size:1.2rem;}}"};var ye=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.settings.numCards})),n=Object(i.c)((function(e){return e.settings.showName}));return Object(de.b)(ue.a,{closeOnEsc:!0},(function(a){var i=a.closePortal,r=a.openPortal,o=a.portal;return Object(de.b)("div",{css:Oe},Object(de.b)(be.a,{size:"2x",icon:"cog",onClick:r,className:"settings"}),o(Object(de.b)(ve,{title:"Settings",onClose:i},Object(de.b)("div",{className:"content",css:he},Object(de.b)("div",{className:"numCards"},Object(de.b)(me,{name:"numCards",label:"Number of Cards",value:t,min:24,max:48,onSubmit:function(t){t&&e(v(t))}}),Object(de.b)("div",{className:"data"},"Current Setting: ",t)),Object(de.b)("div",{className:"showName"},Object(de.b)(je,{value:n,label:"Show Names",onToggle:function(t){e(x(t))}}),Object(de.b)("div",{className:"data"},n?"Yeah":"No"))))))}))},ke=n(12),Ce=n(24),we=n(13),Ne=n(29),ze=n.n(Ne),Se=n(23);var Fe={name:"t47g3e",styles:"display:block;align-items:flex-start;justify-content:center;box-sizing:content-box;min-width:100px;max-width:240px;margin:8px 0;padding:16px 24px;color:white;font-weight:700;font-size:1rem;text-align:center;background-color:var(--blue);border:none;border-radius:4px;outline:none;cursor:pointer;&:not(.disabled):not(.hidden):active{transform:scale(0.95);}&.disabled{color:black;background:var(--disabled);cursor:auto;}&.hidden{visibility:hidden;}"};var Pe=function(e){var t=e.tag,n=void 0===t?"button":t,a=e.onClick,i=e.disabled,r=void 0!==i&&i,o=e.hidden,c=void 0!==o&&o,s=Object(Se.a)(e,["tag","onClick","disabled","hidden"]);return Object(de.b)(n,Object(ke.a)({},s,{css:Fe,onClick:a,className:Object(we.a)({disabled:r,hidden:c},["button"])}),e.children)};var Ee={name:"1clrjjv",styles:'display:flex;align-items:center;label{display:flex;align-items:center;font-weight:700;font-size:1.5rem;input[type="text"]{margin:0 1rem;padding:0.5rem;font-size:1.5rem;border:2px solid black;border-radius:4px;outline:none;}}svg{margin-right:1rem;}'};var Ie=function(e){var t=e.name,n=e.label,a=e.value,i=e.isValid,r=e.onSubmit,o=e.submitText,c=void 0===o?i?"ReSubmit":"Submit":o,l=s.a.useState(a),d=Object(h.a)(l,2),u=d[0],b=d[1];return Object(de.b)("div",{css:Ee,className:"input"},Object(de.b)("label",{htmlFor:t},n,Object(de.b)("input",{name:t,type:"text",value:u,onKeyUp:function(e){13===e.keyCode&&r(u)},onChange:function(e){b(e.target.value)}})),i?Object(de.b)(be.a,{icon:"check-circle",color:"var(--green)",size:"2x"}):Object(de.b)(be.a,{icon:"info-circle",color:"grey",size:"2x"}),Object(de.b)(Pe,{disabled:null==u||""===u||u===a,onClick:function(){return r(u)}},c))},De=n(31);var We={name:"vgkj1u",styles:"display:flex;flex:1 1 100%;align-items:center;box-sizing:border-box;width:100%;margin-bottom:8px;padding:12px;font-weight:700;background-color:var(--lightblue);border:solid 2px transparent;border-radius:6px;cursor:pointer;opacity:1;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:300ms;transition-property:background-color,border-color,opacity;&:hover{border-color:var(--blue);}&.selected{color:white;background-color:var(--blue);}.select-option-content{.description{opacity:0.6;}}"},Ge={name:"rj7mh",styles:"position:relative;display:flex;flex-direction:row;flex-wrap:wrap;& .select-option{&.selected{position:relative;z-index:3;max-width:none;}&.not-selected{position:absolute;cursor:auto;opacity:0;}&.hidden{visibility:hidden;}}"};function Me(e){e.classList.remove("hidden")}var Ae=function(e){return Object(de.b)("div",Object(ke.a)({css:We},e),Object(de.b)("div",{className:"select-option-content"},Object(de.b)("div",{className:"text"},e.text),Object(de.b)("div",{className:"description"},e.description)))};var Ue=function(e){var t=e.items,n=e.selectedValue,a=e.toggle,i=e.element;return Object(de.b)(De.b,{flipKey:n,css:Ge,spring:{damping:21,stiffness:150}},t.map((function(e,t){var r=e.value,o=r===n,c=null!=n,s=c&&!o;return Object(de.b)(De.a,{key:r,flipId:r,onStart:Me,onComplete:function(e){return function(e,t){e&&t.classList.add("hidden")}(s,e)}},function(e,t,n,r,o){var c=i||Ae;return Object(de.b)(c,Object(ke.a)({},e,{id:e.value,className:Object(we.a)(["select-option",{selected:n,"not-selected":o}]),style:{order:n?0:t+1},onClick:function(t){t.preventDefault(),r&&!n||a(e)}}))}(e,t,o,c,s))})))};var Le=function(e){return Object(de.a)("z-index:0;box-sizing:border-box;max-width:",e?"".concat(e,"px"):"none",";margin:0;border:2px solid transparent;perspective:40rem;cursor:pointer;transition:z-index 0 0.2s,border-color 0.2s;.flipper{display:flex;transform-style:preserve-3d;transition:0.2s;.front,.back{min-width:100%;border:2px solid navy;border-radius:6px;backface-visibility:hidden;}.front{background:var(--lightblue);.name{padding-top:4px;color:black;font-weight:700;font-size:1rem;text-align:center;word-wrap:normal;}.container{padding:8px;img{width:100%;}}}.back{display:flex;align-items:center;justify-content:center;background:var(--blue);transform:rotateX(-180deg) translate(-100%,0);.name{color:white;font-weight:700;}}}&:hover{.flipper{.front,.back{border-color:var(--blue);}}}&.eliminated .flipper{z-index:1;transform:rotateX(-180deg);transition-delay:0s;}")};var Ve=function(e){var t=e.maxWidth,n=e.card,a=e.onClick,r=e.className,o=e.style,c=e.canFlip,l=void 0===c||c,d=Object(Se.a)(e,["maxWidth","card","onClick","className","style","canFlip"]),u=n.srcUri,b=n.name,p=n.id,m=function(e,t){var n=s.a.useState((function(){var n=window.localStorage.getItem(t);return null!==n?JSON.parse(n):e})),a=Object(h.a)(n,2),i=a[0],r=a[1];return s.a.useEffect((function(){window.localStorage.setItem(t,JSON.stringify(i))}),[t,i]),[i,r]}(!0,p.toString()),f=Object(h.a)(m,2),g=f[0],v=f[1],x=Object(i.c)((function(e){return e.settings.showName}));return Object(de.b)("div",Object(ke.a)({css:Le(t),key:p,className:Object(we.a)({eliminated:l&&!g},["card","flip-container",r]),onClick:a||(l?function(){return v(!g)}:function(){}),onMouseEnter:function(e){1!==e.buttons&&3!==e.buttons||(a?a():v(!g))},onFocus:function(){},style:o},d),Object(de.b)("div",{className:"flipper"},Object(de.b)("div",{className:"front"},Object(de.b)("div",{className:"container"},Object(de.b)("img",{src:u,alt:b}),x?Object(de.b)("div",{className:"name"},b):null)),Object(de.b)("div",{className:"back"},x?Object(de.b)("div",{className:"name"},b):null)))};var Be={name:"1lto1rq",styles:"display:flex;align-content:center;align-items:center;justify-content:center;width:100%;"},qe={name:"ajcp98",styles:"display:flex;flex-direction:row;width:100%;height:100%;.sidebar{display:flex;flex:0 0 auto;flex-direction:column;padding:16px;border-right:2px solid black;.step{padding:8px 16px;font-weight:700;border-radius:4px;cursor:pointer;}.current{color:white;background:var(--blue);}}.content{display:flex;flex:3 1 auto;flex-direction:column;padding:16px;overflow-x:hidden;overflow-y:auto;}"},Je={name:"j7rabh",styles:"display:flex;flex-direction:column;user-select:text;"};var Ye=function(e){var t,n=s.a.useState(0),a=Object(h.a)(n,2),r=a[0],o=a[1],c=Object(i.b)(),d=Object(i.c)((function(e){return e.api.decks.value})),u=Object(i.c)((function(e){return e.api.decks.status})),b=Object(i.c)((function(e){return e.api.cards.status})),p=Object(i.c)((function(e){return M(e)})),m=Object(i.c)((function(e){return e.game.playerCard})),f=Object(i.c)((function(e){return e.game.deck})),g=Object(i.c)((function(e){return e.game.playerName})),v=Object(i.c)((function(e){return e.game.opponentCode})),x=Object(i.c)((function(e){return e.game.oppCardError})),j=Object(i.c)((function(e){return e.game.opponentCard})),y=Object(i.c)((function(e){return e.game.gameCards})),C=function(e){c(f===e?J(void 0):function(e){return function(t){t(J(e)),null!=e?t(E(e)):W()}}(e))},w=function(e){m===e.id?c(Y(void 0)):c(Y(e))},N=[{name:"Choose Deck",neededData:f},{name:"Choose Card",neededData:m},{name:"Choose Opponent",neededData:j}],z=r===N.length-1,S=0===r,F=!z&&null!=N[r].neededData;if(s.a.useEffect((function(){u===l.unFetched&&c(I())}),[u,c]),null!=g&&""!==g&&m){var P=new k.a(g);t="".concat(g.toLowerCase(),"-").concat(P.encode(m))}return Object(de.b)(ve,{title:"Setup",onClose:e.onClose,footer:Object(de.b)(s.a.Fragment,null,Object(de.b)(Pe,{onClick:function(){S||o(r-1)},disabled:S},"Back"),Object(de.b)(Pe,{onClick:function(){F&&o(r+1)},disabled:z||!F},"Next"))},Object(de.b)("div",{css:qe},Object(de.b)("div",{className:"sidebar"},N.map((function(e,t){return Object(de.b)("div",{key:e.name,className:Object(we.a)(["step",{current:r===t}]),onClick:function(){N.slice(0,t).every((function(e){return null!=e.neededData}))&&o(t)}},e.name)}))),Object(de.b)("div",{className:"content"},function(){switch(r){case 0:if(u===l.isPending)return Object(de.b)("div",{css:Be},Object(de.b)(ze.a,{type:"spin",color:"var(--blue)"}));if(u===l.hasSucceeded&&d)return Object(de.b)(Ue,{items:d.map((function(e){return{value:e,text:(t=e,t.charAt(0).toUpperCase()+t.slice(1))};var t})),selectedValue:f,toggle:function(e){C(e.value)}});break;case 1:if(b===l.isPending&&p)return Object(de.b)("div",{css:Be},Object(de.b)(ze.a,{type:"spin",color:"var(--blue)"}));if(b===l.hasSucceeded&&p)return Object(de.b)(Ue,{items:p.map((function(e){return Object(Ce.a)(Object(Ce.a)({},e),{},{value:e.id,text:e.name})})),selectedValue:m,toggle:w,element:function(e){return Object(de.b)(Ve,Object(ke.a)({maxWidth:100,style:{margin:"8px"},canFlip:!1,card:Object(Ce.a)({},e)},e))}});break;case 2:return Object(de.b)("div",{css:Je},Object(de.b)(Ie,{name:"playerName",label:"Your Name",value:g,isValid:null!=g&&""!==g,onSubmit:function(e){c(H(e))}}),Object(de.b)("div",{css:Object(de.a)("margin-bottom:1rem;color:var(--blue);font-weight:700;font-size:1.2rem;text-indent:2rem;visibility:",null!=t?"visible":"hidden",";")},"Your Code: ",t),Object(de.b)(Ie,{name:"opponentCode",label:"Opponent's Code",value:v,isValid:null!=v&&null!=j&&null==x,onSubmit:function(e){var t;e&&c((t=e,function(e,n){var a=n(),i=t.split("-"),r=Object(h.a)(i,2),o=r[0],c=r[1];if(c&&o){e(_(void 0)),e($(t));var s=new k.a(o.toLowerCase()).decode(c),l=Object(h.a)(s,1)[0],d=L(a),u=d[l];if(u){e(_(void 0)),e(X(l));var b=U(a).filter((function(e){return e!==l}));Z(b);var p=b.slice(0,a.settings.numCards-1).map((function(e){return d[e]})).filter(ee),m=[].concat(Object(O.a)(p),[u]);Z(m),e(Q(m))}else e(_("Could not find opponent's card. Make sure you're spelling their name exactly as they entered it."))}else e(_("Malformed opponent code. Should be: [Opponent's name]-[opponent's code]"))}))}}),Object(de.b)("div",{css:Object(de.a)("margin-bottom:1rem;color:var(--blue);font-weight:700;font-size:1.2rem;text-indent:2rem;visibility:",null==x&&null!=v?"visible":"hidden",";")},"Opponent Code: ",v),Object(de.b)("div",{css:Object(de.a)("margin-bottom:1rem;color:var(--red);font-weight:700;font-size:1.2rem;visibility:",null!=x?"visible":"hidden",";")},"Error: ",x),j&&null==x&&y?Object(de.b)(Pe,{onClick:function(){c(T(!0)),e.onClose()}},"Start Game!"):null);default:return null}return null}())))};var He={name:"ldo4d5",styles:"display:flex;justify-content:center;width:100%;"};var Ke=function(){return Object(de.b)(ue.a,{closeOnEsc:!0},(function(e){var t=e.closePortal,n=e.openPortal,a=e.portal;return Object(de.b)("div",{css:He},Object(de.b)(Pe,{onClick:n},"Game Setup"),a(Object(de.b)(Ye,{onClose:t})))}))};var Te={name:"dkp6m5",styles:"display:flex;margin-left:-16px;.card-grid-column{width:100%;padding-left:16px;background-clip:padding-box;}"};function _e(e){var t=e.cards,n=e.maxWidth,a=e.onCardClick,i=t.map((function(e){return Object(de.b)(Ve,{key:e.id,card:e,className:"card",style:{marginBottom:"8px"},maxWidth:n,onClick:a?function(){return a(e)}:void 0})}));return Object(de.b)("div",{css:Te},i)}le.b.add(ce.b,ce.e,ce.f,ce.a,ce.d,ce.c,se.a);var Re={name:"yrxsu",styles:"display:block;justify-content:center;box-sizing:border-box;width:100%;margin-right:auto;margin-left:auto;padding:16px;text-align:center;"},Xe={name:"edkxhy",styles:'display:flex;flex-direction:column;.level2{display:flex;justify-content:center;}.cardLabel{margin-bottom:8px;color:var(--green);font-weight:bold;font-size:2.5rem;}.level1{display:flex;flex-direction:row;align-items:flex-start;.info{display:flex;flex:1 1 25%;justify-content:flex-end;}.buttonHolder{display:flex;flex:1 1 25%;align-items:center;.settings{margin-right:1rem;}}.title{flex:1 1 50%;font-size:64px;font-family:"Modak",cursive;line-height:1em;text-align:center;vertical-align:middle;}}.opponent{font-weight:bold;font-size:2rem;.name{color:var(--red);}}'};var $e=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.game.gameCards})),n=Object(i.c)((function(e){return e.game.opponentCode})),a=Object(i.c)((function(e){return e.game.playerCard})),r=Object(i.c)((function(e){return A(e,a||"-1")})),o=Object(i.c)((function(e){return e.game.isPlaying}));return Object(de.b)(s.a.Fragment,null,Object(de.b)("div",{css:Re},Object(de.b)("div",{css:Xe},Object(de.b)("div",{className:"level1"},Object(de.b)("div",{className:"buttonHolder"},Object(de.b)(ye,null),Object(de.b)(Pe,{onClick:function(){e((function(e){e(J(void 0)),e(Y(void 0)),e(H(void 0)),e(K()),e(_(void 0)),e(T(!1))}))},hidden:!o},"End Game")),Object(de.b)("div",{className:"title"},"GUESS WHO?!"),Object(de.b)("div",{className:"info opponent"},n&&o?Object(de.b)(s.a.Fragment,null,"Opponent:",Object(de.b)("span",{className:"name"},"\xa0",n.split("-")[0].split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" "))):null)),Object(de.b)("div",{className:"level2"},Object(de.b)("div",{className:"info"},r&&o?Object(de.b)(s.a.Fragment,null,Object(de.b)("div",{className:"cardLabel"},"Your card:"),Object(de.b)(Ve,{maxWidth:300,card:r,canFlip:!1})):null))),Object(de.b)(Ke,null),t&&o?Object(de.b)(_e,{cards:t}):null),Object(de.b)("div",{id:"portal-root"}))};o.a.render(Object(de.b)(s.a.StrictMode,null,Object(de.b)(i.a,{store:oe},Object(de.b)(a.a,{loading:null,persistor:re},Object(de.b)($e,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.a7cfd463.chunk.js.map