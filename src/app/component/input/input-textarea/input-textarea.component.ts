import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextareaComponent),
    multi: true
  }]
})
export class InputTextareaComponent implements ControlValueAccessor {
  value: string = '';
  @Input() wording: string = '';
  @Input() readonly: boolean = false;
  @Input() varidate: boolean = false;
  @Input() iconset: string = 'edit';

  onChange: (e) => void;
  onTouched: () => void;
  disabled: boolean;
  constructor(

  ) {

  }
  writeValue(value: string): void {
    this.value = value ? value : '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }



}
