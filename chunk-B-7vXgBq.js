import {g as g$1,c1 as Jo,c2 as z,bm as _$1,bw as yS,c3 as gf,bV as he,bK as Dt,Q,c4 as eu,D as kt$1,i as ie,c5 as Pv,c6 as yf,y,bj as S,bl as V,c7 as Ye,c8 as We,bI as ae,R as Rt$1,c9 as Bi,v as ar,F as Ft$1,ca as Vt,O as Bv,cb as Xd,$ as $e,b as Ku,J as Jo$1,K as Ke,X as Xe,V as Ve,q as Se,cc as lb,cd as ji,ce as He,_ as _a,cf as Ve$1,a5 as rm,ak as Hs,aS as im,an as kl,bT as jl,ah as Vo,ae as Wn,cg as Ee,a6 as $s,ai as gm,ch as IC,ci as kd,av as Hc,aw as Na,at as k8,au as O8,aj as t8,al as wb,am as Ob,ab as BI,ao as Nm,aU as lm,aq as Vl,ap as Lb}from'./main-VBXQPJHG.js';var s="https://jsonplaceholder.typicode.com";var Ot=class e{http=g$1(Jo);list(n){let t=[`_limit=${n.limit}`,`_sort=${n.sort}`,`_order=${n.order}`];return n.page>0&&t.push(`_page=${n.page}`),n.query&&t.push(`title_like=${n.query}`),this.http.get(`${s}/posts?${t.join("&")}`,{observe:"response"}).pipe(z(i=>({totalCount:Number(i.headers.get("x-total-count"))||0,items:i.body||[]})))}detail(n){return this.http.get(`${s}/posts/${n}`)}delete(n){return this.http.delete(`${s}/posts/${n}`)}patch(n,t){return this.http.patch(`${s}/posts/${n}`,t)}create(n){return this.http.post(`${s}/posts`,n)}detailExpanded(n){return this.http.get(`${s}/posts/${n}?_expand=user`)}user(n){return this.http.get(`${s}/users/${n}`)}static \u0275fac=function(t){return new(t||e)};static \u0275prov=_$1({token:e,factory:e.\u0275fac,providedIn:"root"})};function Gt(e,n){}var O=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=true;backdropClass="";disableClose=false;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=false;autoFocus="first-tabbable";restoreFocus=true;delayFocusTrap=true;scrollStrategy;closeOnNavigation=true;enterAnimationDuration;exitAnimationDuration;bindings},q="mdc-dialog--open",wt="mdc-dialog--opening",Et="mdc-dialog--closing",Ut=150,Ht=75,qt=(()=>{class e extends Xd{_animationStateChanged=new $e;_animationsEnabled=!kt$1();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?kt(this._config.enterAnimationDuration)??Ut:0;_exitAnimationDuration=this._animationsEnabled?kt(this._config.exitAnimationDuration)??Ht:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation();}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(Pt,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(wt,q)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(q),Promise.resolve().then(()=>this._finishDialogOpen()));}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(q),this._animationsEnabled?(this._hostElement.style.setProperty(Pt,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Et)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose());}_updateActionSectionCount(t){this._actionSectionCount+=t,this._changeDetectorRef.markForCheck();}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration);};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration});};_clearAnimationClasses(){this._hostElement.classList.remove(wt,Et);}_waitForAnimationToComplete(t,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,t);}_requestAnimationFrame(t){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(t):t();});}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus();}_openAnimationDone(t){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:t});}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer);}attachComponentPortal(t){let i=super.attachComponentPortal(t);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}static \u0275fac=(()=>{let t;return function(a){return (t||(t=Ku(e)))(a||e)}})();static \u0275cmp=Rt$1({type:e,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(i,a){i&2&&(jl("id",a._config.id),Vo("aria-modal",a._config.ariaModal)("role",a._config.role)("aria-labelledby",a._config.ariaLabel?null:a._ariaLabelledByQueue[0])("aria-label",a._config.ariaLabel)("aria-describedby",a._config.ariaDescribedBy||null),Wn("_mat-animation-noopable",!a._animationsEnabled)("mat-mdc-dialog-container-with-actions",a._actionSectionCount>0));},features:[rm],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(i,a){i&1&&(Hs(0,"div",0)(1,"div",1),im(2,Gt,0,0,"ng-template",2),kl()());},dependencies:[Ve$1],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--mat-dialog-container-max-width, 560px);
  min-width: var(--mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--mat-dialog-container-elevation-shadow, none);
  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));
  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));
  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));
  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));
  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));
  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));
  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));
  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2,changeDetection:1})}return e})(),Pt="--mat-dialog-transition-duration";function kt(e){return e==null?null:typeof e=="number"?e:e.endsWith("ms")?Jo$1(e.substring(0,e.length-2)):e.endsWith("s")?Jo$1(e.substring(0,e.length-1))*1e3:e==="0"?0:null}var I=(function(e){return e[e.OPEN=0]="OPEN",e[e.CLOSING=1]="CLOSING",e[e.CLOSED=2]="CLOSED",e})(I||{}),g=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new ar(1);_beforeClosed=new ar(1);_result;_closeFallbackTimeout;_state=I.OPEN;_closeInteractionType;constructor(n,t,i){this._ref=n,this._config=t,this._containerInstance=i,this.disableClose=t.disableClose,this.id=n.id,n.addPanelClass("mat-mdc-dialog-panel"),i._animationStateChanged.pipe(Ft$1(a=>a.state==="opened"),Vt(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete();}),i._animationStateChanged.pipe(Ft$1(a=>a.state==="closed"),Vt(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose();}),n.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose();}),Bv(this.backdropClick(),this.keydownEvents().pipe(Ft$1(a=>a.keyCode===27&&!this.disableClose&&!Ee(a)))).subscribe(a=>{this.disableClose||(a.preventDefault(),St(this,a.type==="keydown"?"keyboard":"mouse"));});}close(n){let t=this._config.closePredicate;t&&!t(n,this._config,this.componentInstance)||(this._result=n,this._containerInstance._animationStateChanged.pipe(Ft$1(i=>i.state==="closing"),Vt(1)).subscribe(i=>{this._beforeClosed.next(n),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100);}),this._state=I.CLOSING,this._containerInstance._startExitAnimation());}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(n){let t=this._ref.config.positionStrategy;return n&&(n.left||n.right)?n.left?t.left(n.left):t.right(n.right):t.centerHorizontally(),n&&(n.top||n.bottom)?n.top?t.top(n.top):t.bottom(n.bottom):t.centerVertically(),this._ref.updatePosition(),this}updateSize(n="",t=""){return this._ref.updateSize(n,t),this}addPanelClass(n){return this._ref.addPanelClass(n),this}removePanelClass(n){return this._ref.removePanelClass(n),this}getState(){return this._state}_finishDialogClose(){this._state=I.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null;}};function St(e,n,t){return e._closeInteractionType=n,e.close(t)}var W=new y("MatMdcDialogData"),Wt=new y("mat-mdc-dialog-default-options"),Kt=new y("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let e=g$1(Q);return ()=>Bi(e)}}),_=(()=>{class e{_defaultOptions=g$1(Wt,{optional:true});_scrollStrategy=g$1(Kt);_parentDialog=g$1(e,{optional:true,skipSelf:true});_idGenerator=g$1(Dt);_injector=g$1(Q);_dialog=g$1(eu);_animationsDisabled=kt$1();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new ie;_afterOpenedAtThisLevel=new ie;dialogConfigClass=O;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=Pv(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(yf(void 0)));constructor(){this._dialogRefConstructor=g,this._dialogContainerType=qt,this._dialogDataToken=W;}open(t,i){let a;i=S(S({},this._defaultOptions||new O),i),i.id=i.id||this._idGenerator.getId("mat-mdc-dialog-"),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let P=this._dialog.open(t,V(S({},i),{positionStrategy:We(this._injector).centerHorizontally().centerVertically(),disableClose:true,closePredicate:void 0,closeOnDestroy:false,closeOnOverlayDetachments:false,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()==="0"||i.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:Ye,useValue:i}]},templateContext:()=>({dialogRef:a}),providers:(p,zt,K)=>(a=new this._dialogRefConstructor(p,i,K),a.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:K},{provide:this._dialogDataToken,useValue:zt.data},{provide:this._dialogRefConstructor,useValue:a}])}));return a.componentRef=P.componentRef,a.componentInstance=P.componentInstance,this.openDialogs.push(a),this.afterOpened.next(a),a.afterClosed().subscribe(()=>{let p=this.openDialogs.indexOf(a);p>-1&&(this.openDialogs.splice(p,1),this.openDialogs.length||this._getAfterAllClosed().next());}),a}closeAll(){this._closeDialogs(this.openDialogs);}getDialogById(t){return this.openDialogs.find(i=>i.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete();}_closeDialogs(t){let i=t.length;for(;i--;)t[i].close();}static \u0275fac=function(i){return new(i||e)};static \u0275prov=ae({token:e,factory:e.\u0275fac})}return e})(),Lt=(()=>{class e{dialogRef=g$1(g,{optional:true});_elementRef=g$1(Ke);_dialog=g$1(_);ariaLabel;type="button";dialogResult;_matDialogClose;ngOnInit(){this.dialogRef||(this.dialogRef=Bt(this._elementRef,this._dialog.openDialogs));}ngOnChanges(t){let i=t._matDialogClose;i&&(this.dialogResult=i.currentValue);}_onButtonClick(t){this._elementRef.nativeElement.getAttribute("aria-disabled")!=="true"&&St(this.dialogRef,t.screenX===0&&t.screenY===0?"keyboard":"mouse",this.dialogResult);}static \u0275fac=function(i){return new(i||e)};static \u0275dir=Xe({type:e,selectors:[["","mat-dialog-close",""],["","matDialogClose",""]],hostVars:2,hostBindings:function(i,a){i&1&&gm("click",function(p){return a._onButtonClick(p)}),i&2&&Vo("aria-label",a.ariaLabel||null)("type",a.type);},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],type:"type",dialogResult:[0,"mat-dialog-close","dialogResult"],_matDialogClose:[0,"matDialogClose","_matDialogClose"]},exportAs:["matDialogClose"],features:[$s]})}return e})(),Mt=(()=>{class e{_dialogRef=g$1(g,{optional:true});_elementRef=g$1(Ke);_dialog=g$1(_);ngOnInit(){this._dialogRef||(this._dialogRef=Bt(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd();});}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove();});}static \u0275fac=function(i){return new(i||e)};static \u0275dir=Xe({type:e})}return e})(),Rt=(()=>{class e extends Mt{id=g$1(Dt).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id);}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id);}static \u0275fac=(()=>{let t;return function(a){return (t||(t=Ku(e)))(a||e)}})();static \u0275dir=Xe({type:e,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(i,a){i&2&&jl("id",a.id);},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[rm]})}return e})(),Ft=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=Xe({type:e,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[IC([kd])]})}return e})(),Nt=(()=>{class e extends Mt{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1);}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1);}static \u0275fac=(()=>{let t;return function(a){return (t||(t=Ku(e)))(a||e)}})();static \u0275dir=Xe({type:e,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(i,a){i&2&&Wn("mat-mdc-dialog-actions-align-start",a.align==="start")("mat-mdc-dialog-actions-align-center",a.align==="center")("mat-mdc-dialog-actions-align-end",a.align==="end");},inputs:{align:"align"},features:[rm]})}return e})();function Bt(e,n){let t=e.nativeElement.parentElement;for(;t&&!t.classList.contains("mat-mdc-dialog-container");)t=t.parentElement;return t?n.find(i=>i.id===t.id):null}var jt=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=Ve({type:e});static \u0275inj=Se({providers:[_],imports:[lb,ji,He,_a]})}return e})();var w=class e{data=g$1(W);dialogRef=g$1(g);static \u0275fac=function(t){return new(t||e)};static \u0275cmp=Rt$1({type:e,selectors:[["app-confirm-dialog"]],decls:15,vars:10,consts:[["mat-dialog-title",""],["mat-dialog-content",""],["mat-dialog-actions","","align","center"],["mat-button","",3,"mat-dialog-close"],["mat-button","","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(t,i){t&1&&(Hs(0,"h1",0),wb(1),kl(),Hs(2,"div",1),wb(3),kl(),Hs(4,"div",2)(5,"button",3)(6,"mat-icon"),wb(7,"clear"),kl(),wb(8),Ob(9,"transloco"),kl(),Hs(10,"button",4)(11,"mat-icon"),wb(12,"check"),kl(),wb(13),Ob(14,"transloco"),kl()()),t&2&&(BI(),Nm(i.data.title),BI(2),Nm(i.data.content),BI(2),lm("mat-dialog-close",false),BI(3),Vl(" ",Lb(9,6,"uni.no")," "),BI(2),lm("mat-dialog-close",true),BI(3),Vl(" ",Lb(14,8,"uni.yes")," "));},dependencies:[Hc,Na,jt,Lt,Rt,Nt,Ft,k8,O8,t8],encapsulation:2})};var E=class e{dialog=g$1(_);open(n,t){return this.dialog.open(w,{width:"sm",data:{title:n,content:t}}).afterClosed()}static \u0275fac=function(t){return new(t||e)};static \u0275prov=_$1({token:e,factory:e.\u0275fac,providedIn:"root"})};var Qt={DELETE:he("custom-confirm-dialog.delete-post.title"),UNSAVED_WORK:he("custom-confirm-dialog.unsaved-work.title"),DEFAULT:he("custom-confirm-dialog.default.title")},Xt={DELETE:he("custom-confirm-dialog.delete-post.content"),UNSAVED_WORK:he("custom-confirm-dialog.unsaved-work.content"),DEFAULT:he("custom-confirm-dialog.default.content")},$t=class e{confirm=g$1(E);transloco=g$1(yS);open(n){let t=Qt[n],i=Xt[n];return this.confirm.open(this.transloco.translate(t),this.transloco.translate(i)).pipe(gf(),z(a=>!!a))}static \u0275fac=function(t){return new(t||e)};static \u0275prov=_$1({token:e,factory:e.\u0275fac,providedIn:"root"})};export{$t as $,Ot as O,s};