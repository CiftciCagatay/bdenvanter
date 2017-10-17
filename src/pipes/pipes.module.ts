import { NgModule } from '@angular/core';
import { OrderStringsPipe } from './order-strings/order-strings';
import { OrderUsersPipe } from './order-users/order-users';
import { FormatDatePipe } from './format-date/format-date';
@NgModule({
	declarations: [OrderStringsPipe,
    OrderUsersPipe,
    FormatDatePipe],
	imports: [],
	exports: [OrderStringsPipe,
    OrderUsersPipe,
    FormatDatePipe]
})
export class PipesModule {}
