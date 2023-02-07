/* rxjs@7.8.0 */
import{_ as e,S as r,o as t,O as a,a as n,b as i,n as s,e as o,C as u,c,d as l,f,g as h,i as d,h as b,t as m,p,V as v,j as w,k as g}from "./rxjs-shared.min.js";var y=function(e, r){void 0===r&&(r=1/0),this.subscribedFrame=e,this.unsubscribedFrame=r},x=function(){function e(){this.subscriptions=[]}return e.prototype.logSubscribedFrame=function(){return this.subscriptions.push(new y(this.scheduler.now())),this.subscriptions.length-1},e.prototype.logUnsubscribedFrame=function(e){var r=this.subscriptions,t=r[e];r[e]=new y(t.subscribedFrame,this.scheduler.now())},e}(),F=function(a){function n(e, t){var n=a.call(this,(function(e){var t=this,a=t.logSubscribedFrame(),n=new r;return n.add(new r((function(){t.logUnsubscribedFrame(a)}))),t.scheduleMessages(e),n}))||this;return n.messages=e,n.subscriptions=[],n.scheduler=t,n}return e(n,a),n.prototype.scheduleMessages=function(e){for(var r=this.messages.length,a=0; a<r; a++){var n=this.messages[a];e.add(this.scheduler.schedule((function(e){var r=e,a=r.message.notification,n=r.subscriber;t(a,n)}),n.frame,{message:n,subscriber:e}))}},n}(a);n(F,[x]);var k=function(a){function n(e, r){var t=a.call(this)||this;return t.messages=e,t.subscriptions=[],t.scheduler=r,t}return e(n,a),n.prototype._subscribe=function(e){var t=this,n=t.logSubscribedFrame(),i=new r;return i.add(new r((function(){t.logUnsubscribedFrame(n)}))),i.add(a.prototype._subscribe.call(this,e)),i},n.prototype.setup=function(){for(var e=this,r=e.messages.length,a=function(r){var a,n,i;a=e.messages[r],n=a.notification,i=a.frame,e.scheduler.schedule((function(){t(n,e)}),i)},n=0; n<r; n++)a(n)},n}(i);n(k,[x]);var O=function(r){function t(e){var t=r.call(this,w,750)||this;return t.assertDeepEqual=e,t.hotObservables=[],t.coldObservables=[],t.flushTests=[],t.runMode=!1,t}return e(t,r),t.prototype.createTime=function(e){var r=this.runMode?e.trim().indexOf("|"):e.indexOf("|");if(-1===r)throw new Error('marble diagram for time should have a completion marker "|"');return r*t.frameTimeFactor},t.prototype.createColdObservable=function(e, r, a){if(-1!==e.indexOf("^"))throw new Error('cold observable cannot have subscription offset "^"');if(-1!==e.indexOf("!"))throw new Error('cold observable cannot have unsubscription marker "!"');var n=t.parseMarbles(e,r,a,void 0,this.runMode),i=new F(n,this);return this.coldObservables.push(i),i},t.prototype.createHotObservable=function(e, r, a){if(-1!==e.indexOf("!"))throw new Error('hot observable cannot have unsubscription marker "!"');var n=t.parseMarbles(e,r,a,void 0,this.runMode),i=new k(n,this);return this.hotObservables.push(i),i},t.prototype.materializeInnerObservable=function(e, r){var t=this,a=[];return e.subscribe({next:function(e){a.push({frame:t.frame-r,notification:s(e)})},error:function(e){a.push({frame:t.frame-r,notification:o(e)})},complete:function(){a.push({frame:t.frame-r,notification:u})}}),a},t.prototype.expectObservable=function(e, r){var n=this;void 0===r&&(r=null);var i,c=[],l={actual:c,ready:!1},f=t.parseMarblesAsSubscriptions(r,this.runMode),h=f.subscribedFrame===1/0?0:f.subscribedFrame,d=f.unsubscribedFrame;this.schedule((function(){i=e.subscribe({next:function(e){var r=e instanceof a?n.materializeInnerObservable(e,n.frame):e;c.push({frame:n.frame,notification:s(r)})},error:function(e){c.push({frame:n.frame,notification:o(e)})},complete:function(){c.push({frame:n.frame,notification:u})}})}),h),d!==1/0&&this.schedule((function(){return i.unsubscribe()}),d),this.flushTests.push(l);var b=this.runMode;return{toBe:function(e, r, a){l.ready=!0,l.expected=t.parseMarbles(e,r,a,!0,b)},toEqual:function(e){l.ready=!0,l.expected=[],n.schedule((function(){i=e.subscribe({next:function(e){var r=e instanceof a?n.materializeInnerObservable(e,n.frame):e;l.expected.push({frame:n.frame,notification:s(r)})},error:function(e){l.expected.push({frame:n.frame,notification:o(e)})},complete:function(){l.expected.push({frame:n.frame,notification:u})}})}),h)}}},t.prototype.expectSubscriptions=function(e){var r={actual:e,ready:!1};this.flushTests.push(r);var a=this.runMode;return{toBe:function(e){var n="string"==typeof e?[e]:e;r.ready=!0,r.expected=n.map((function(e){return t.parseMarblesAsSubscriptions(e,a)})).filter((function(e){return e.subscribedFrame!==1/0}))}}},t.prototype.flush=function(){for(var e=this,t=this.hotObservables; t.length>0;)t.shift().setup();r.prototype.flush.call(this),this.flushTests=this.flushTests.filter((function(r){return!r.ready||(e.assertDeepEqual(r.actual,r.expected),!1)}))},t.parseMarblesAsSubscriptions=function(e, r){var t=this;if(void 0===r&&(r=!1),"string"!=typeof e)return new y(1/0);for(var a,n=c([],l(e)),i=n.length,s=-1,o=1/0,u=1/0,f=0,h=function(e){var i=f,c=function(e){i+=e*t.frameTimeFactor},l=n[e];switch(l){case" ":r||c(1);break;case"-":c(1);break;case"(":s=f,c(1);break;case")":s=-1,c(1);break;case"^":if(o!==1/0)throw new Error("found a second subscription point '^' in a subscription marble diagram. There can only be one.");o=s>-1?s:f,c(1);break;case"!":if(u!==1/0)throw new Error("found a second unsubscription point '!' in a subscription marble diagram. There can only be one.");u=s>-1?s:f;break;default:if(r&&l.match(/^[0-9]$/)&&(0===e||" "===n[e-1])){var h=n.slice(e).join("").match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);if(h){e+=h[0].length-1;var b=parseFloat(h[1]),m=void 0;switch(h[2]){case"ms":m=b;break;case"s":m=1e3*b;break;case"m":m=1e3*b*60}c(m/d.frameTimeFactor);break}}throw new Error("there can only be '^' and '!' markers in a subscription marble diagram. Found instead '"+l+"'.")}f=i,a=e},d=this,b=0; b<i; b++)h(b),b=a;return u<0?new y(o):new y(o,u)},t.parseMarbles=function(e, r, t, a, n){var i=this;if(void 0===a&&(a=!1),void 0===n&&(n=!1),-1!==e.indexOf("!"))throw new Error('conventional marble diagrams cannot have the unsubscription marker "!"');for(var f,h=c([],l(e)),d=h.length,b=[],m=n?e.replace(/^[ ]+/,"").indexOf("^"):e.indexOf("^"),p=-1===m?0:m*-this.frameTimeFactor,v="object"!=typeof r?function(e){return e}:function(e){return a&&r[e]instanceof F?r[e].messages:r[e]},w=-1,g=function(e){var r=p,a=function(e){r+=e*i.frameTimeFactor},c=void 0,l=h[e];switch(l){case" ":n||a(1);break;case"-":a(1);break;case"(":w=p,a(1);break;case")":w=-1,a(1);break;case"|":c=u,a(1);break;case"^":a(1);break;case"#":c=o(t||"error"),a(1);break;default:if(n&&l.match(/^[0-9]$/)&&(0===e||" "===h[e-1])){var d=h.slice(e).join("").match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);if(d){e+=d[0].length-1;var m=parseFloat(d[1]),g=void 0;switch(d[2]){case"ms":g=m;break;case"s":g=1e3*m;break;case"m":g=1e3*m*60}a(g/y.frameTimeFactor);break}}c=s(v(l)),a(1)}c&&b.push({frame:w>-1?w:p,notification:c}),p=r,f=e},y=this,x=0; x<d; x++)g(x),x=f;return b},t.prototype.createAnimator=function(){var e=this;if(!this.runMode)throw new Error("animate() must only be used in run mode");var r,a=0;return{animate:function(a){var n,i;if(r)throw new Error("animate() must not be called more than once within run()");if(/[|#]/.test(a))throw new Error("animate() must not complete or error");r=new Map;var s=t.parseMarbles(a,void 0,void 0,void 0,!0);try{for(var o=g(s),u=o.next(); !u.done; u=o.next()){var c=u.value;e.schedule((function(){var t,a,n=e.now(),i=Array.from(r.values());r.clear();try{for(var s=(t=void 0,g(i)),o=s.next(); !o.done; o=s.next()){(0,o.value)(n)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(a=s.return)&&a.call(s)}finally{if(t)throw t.error}}}),c.frame)}}catch(e){n={error:e}}finally{try{u&&!u.done&&(i=o.return)&&i.call(o)}finally{if(n)throw n.error}}},delegate:{requestAnimationFrame:function(e){if(!r)throw new Error("animate() was not called within run()");var t=++a;return r.set(t,e),t},cancelAnimationFrame:function(e){if(!r)throw new Error("animate() was not called within run()");r.delete(e)}}}},t.prototype.createDelegates=function(){var e=this,r=0,t=new Map,a=function(){var r=e.now(),n=Array.from(t.values()).filter((function(e){return e.due<=r})),i=n.filter((function(e){return"immediate"===e.type}));if(i.length>0){var s=i[0],o=s.handle,u=s.handler;return t.delete(o),void u()}var c=n.filter((function(e){return"interval"===e.type}));if(c.length>0){var l=c[0],f=l.duration;u=l.handler;return l.due=r+f,l.subscription=e.schedule(a,f),void u()}var h=n.filter((function(e){return"timeout"===e.type}));if(h.length>0){var d=h[0];o=d.handle,u=d.handler;return t.delete(o),void u()}throw new Error("Expected a due immediate or interval")};return{immediate:{setImmediate:function(n){var i=++r;return t.set(i,{due:e.now(),duration:0,handle:i,handler:n,subscription:e.schedule(a,0),type:"immediate"}),i},clearImmediate:function(e){var r=t.get(e);r&&(r.subscription.unsubscribe(),t.delete(e))}},interval:{setInterval:function(n, i){void 0===i&&(i=0);var s=++r;return t.set(s,{due:e.now()+i,duration:i,handle:s,handler:n,subscription:e.schedule(a,i),type:"interval"}),s},clearInterval:function(e){var r=t.get(e);r&&(r.subscription.unsubscribe(),t.delete(e))}},timeout:{setTimeout:function(n, i){void 0===i&&(i=0);var s=++r;return t.set(s,{due:e.now()+i,duration:i,handle:s,handler:n,subscription:e.schedule(a,i),type:"timeout"}),s},clearTimeout:function(e){var r=t.get(e);r&&(r.subscription.unsubscribe(),t.delete(e))}}}},t.prototype.run=function(e){var r=t.frameTimeFactor,a=this.maxFrames;t.frameTimeFactor=1,this.maxFrames=1/0,this.runMode=!0;var n=this.createAnimator(),i=this.createDelegates();f.delegate=n.delegate,h.delegate=this,d.delegate=i.immediate,b.delegate=i.interval,m.delegate=i.timeout,p.delegate=this;var s={cold:this.createColdObservable.bind(this),hot:this.createHotObservable.bind(this),flush:this.flush.bind(this),time:this.createTime.bind(this),expectObservable:this.expectObservable.bind(this),expectSubscriptions:this.expectSubscriptions.bind(this),animate:n.animate};try{var o=e(s);return this.flush(),o}finally{t.frameTimeFactor=r,this.maxFrames=a,this.runMode=!1,f.delegate=void 0,h.delegate=void 0,d.delegate=void 0,b.delegate=void 0,m.delegate=void 0,p.delegate=void 0}},t.frameTimeFactor=10,t}(v);export{O as T};
