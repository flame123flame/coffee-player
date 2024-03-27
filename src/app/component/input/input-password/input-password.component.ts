import { forwardRef, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPasswordComponent),
    multi: true
  }]
})
export class InputPasswordComponent implements ControlValueAccessor {

  value: string = '';
  iconde = "fa fa-eye-slash";
  // @Input() textpassword:  string = '';
  @Input() wording: string = '';
  @Input() type: string = 'text';
  @Input() readonly: boolean = false;
  @Input() varidate: boolean = false;
  @Input() iconset: string = 'fa fa-mobile ';
  @Input() disabled: boolean = false;
 
  onChange: (e) => void;
  onTouched: () => void;
  constructor(

  ) {
    //console.log("type02",this.type);
    
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
  eventClickIcon(){
   if(this.type =="text"){

    this.type = "password";   
     this.iconde = "fa fa-eye-slash";
   } else {
    this.type = "text";
    this.iconde = "fa fa-eye";
   }
    
    
  }

}
