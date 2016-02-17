import {Component} from 'angular2/core';

@Component({
  selector    : 'app-footer',
  templateUrl : 'app/components/footer/templates/footer.html'
})
export class FooterCompnt{
  author:string = 'Cristian Ramirez';
}
