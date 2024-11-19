import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PinDataModel } from '../../model/data.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../module/Material.module';

@Component({
  selector: 'app-pin-list',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss'],
})
export class PinListComponent implements OnChanges {
  @Input() pinListData: PinDataModel[] = [];
  displayedColumns = ['title', 'image', 'collaboratory', 'privacy'];
  dataSource = new MatTableDataSource<PinDataModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pinListData'] && changes['pinListData'].currentValue) {
      this.setDataSource(this.pinListData);
    }
  }
  ngAfterViewInit(): void {
    this.initializeTableFeatures();
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public getSanitizedUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // Initialize or update the data source for the table.
  private setDataSource(pinListData: PinDataModel[]): void {
    this.dataSource.data = pinListData;
    this.initializeTableFeatures();
  }

  // Initialize paginator and sort for the table.
  private initializeTableFeatures(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
