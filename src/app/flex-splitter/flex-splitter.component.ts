import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-flex-splitter',
  templateUrl: './flex-splitter.component.html',
  styleUrls: ['./flex-splitter.component.less']
})
export class FlexSplitterComponent implements OnInit {

  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private dragging = false;

  @Input() vertical = false;
  @Input() storageId;

  // *****************************************************************************************************************
  // CONSTRUCTOR / INITIALIZATION
  // *****************************************************************************************************************

  constructor(public elRef: ElementRef) { }

  ngOnInit(): void {
    if (!this.storageId) { return; }

    const secondItemStoredSize = parseInt(localStorage.getItem("ratio" + this.storageId), 10);
    if (!secondItemStoredSize) { return; }

    const native = this.elRef.nativeElement;
    const parentBounds = native.parentElement.getBoundingClientRect();

    const parentSize = this.vertical ? (parentBounds.bottom - parentBounds.top) : (parentBounds.right - parentBounds.left);

    const index = [...native.parentElement.children].indexOf(native);
    native.parentElement.children[index - 1].style["flex-basis"] = parentSize - secondItemStoredSize + "px";
    native.parentElement.children[index + 1].style["flex-basis"] = secondItemStoredSize + "px";
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************


  @HostListener('document:mouseup', ['$event'])
  private onMouseup(event: MouseEvent) {
      this.dragging = false;
  }

  @HostListener('mousedown', ['$event'])
  private onMousedown(event: MouseEvent) {
      this.dragging = true;
      return false; // Call preventDefault() on the event
  }

  @HostListener('document:mousemove', ['$event'])
  private onMousemove(event: MouseEvent) {
    if (this.dragging) {
      this.onResize(event);
    }
  }

  onResize($event: any) {
    const native = this.elRef.nativeElement;
    const parentBounds = native.parentElement.getBoundingClientRect();

    const eventPosition = this.vertical ? $event.y : $event.x;
    const start = this.vertical ? parentBounds.top : parentBounds.left;
    const end = this.vertical ? parentBounds.bottom : parentBounds.right;

    const sizeBefore = eventPosition - start;
    const sizeAfter = end - eventPosition;

    if (sizeBefore < 100 || sizeAfter < 100) { return; }

    if (this.storageId) {
      localStorage.setItem("ratio" + this.storageId, sizeAfter + "");
    }

    const index = [...native.parentElement.children].indexOf(native);
    native.parentElement.children[index - 1].style["flex-basis"] = sizeBefore + "px";
    native.parentElement.children[index + 1].style["flex-basis"] = sizeAfter + "px";
  }
}
