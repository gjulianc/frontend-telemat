import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  declarations: []
})
export class SharedModule { }
