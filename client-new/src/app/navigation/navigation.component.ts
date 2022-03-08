import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { EditLabelComponent } from '../comps/edit-label/edit-label.component';
import { NavigationService } from '../services/navigation.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit , DoCheck {

  opened = true;
  navTab:any;
  constructor(public dialog: MatDialog,public navservice:NavigationService) { }

  ngOnInit(): void {
  }
  //if angular doesnt check chnages then docheck checks that chnage and re run on ebery change
  ngDoCheck(): void {
      this.navTab = this.navservice.getNavTab()
      // console.log('navigation',this.navTab);
      
  }
  openDialog(){
    this.dialog.open(EditLabelComponent);
  }
}
