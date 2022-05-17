import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button' 
import { MatGridListModule } from '@angular/material/grid-list' 
import { MatToolbarModule } from '@angular/material/toolbar' 

const modules = [
  MatButtonModule,
  MatGridListModule,
  MatToolbarModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
