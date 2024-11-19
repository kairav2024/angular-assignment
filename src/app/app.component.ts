import { Component } from '@angular/core';
import { CustomerModel, PinDataModel } from './model/data.model';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddPinComponent } from './components/add-pin/add-pin.component';
import { CommonService } from './service/common.service';
import { Constants } from './app.constant';
import { PinListComponent } from './components/pin-list/pin-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './components/module/Material.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PinListComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [CommonService],
})
export class AppComponent {
  title = 'techup-assessment';

  pinsLists: PinDataModel[] = [];
  customers: CustomerModel[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly commonService: CommonService
  ) {
    this.initializeData();
  }

  private initializeData(): void {
    this.pinsLists = this.getDataFromLocalStorage<PinDataModel[]>(
      Constants.pinsStorageKey,
      []
    );
    this.customers = this.getDataFromLocalStorage<CustomerModel[]>(
      Constants.customerStorageKey,
      []
    );

    if (!this.pinsLists.length) {
      this.fetchAndStoreData('/pins', Constants.pinsStorageKey, (data) => {
        this.pinsLists = data;
      });
    }

    if (!this.customers.length) {
      this.fetchAndStoreData(
        '/customer',
        Constants.customerStorageKey,
        (data) => {
          this.customers = data;
        }
      );
    }
  }

  // Open a dialog based on the value and handle the result.
  openDialog(value: 'addCustomer' | 'addPin'): void {
    const component: any =
      value === 'addCustomer' ? AddCustomerComponent : AddPinComponent;
    const dialogRef = this.dialog.open(component, { width: '750px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const storageKey =
          value === 'addCustomer'
            ? Constants.customerStorageKey
            : Constants.pinsStorageKey;

        const updatedList = this.addDataToStorage(storageKey, result);
        if (value === 'addCustomer') {
          this.customers = updatedList;
        } else {
          this.pinsLists = updatedList;
        }
      }
    });
  }

  // Retrieve data from localStorage and parse it to the given type.
  private getDataFromLocalStorage<T>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  //Fetch data from an API, store it in localStorage, and perform a callback with the data.
  private fetchAndStoreData(
    endpoint: string,
    key: string,
    callback: (data: any) => void
  ): void {
    this.commonService.get(endpoint).subscribe((data) => {
      this.storeDataToLocalStorage(key, data);
      callback(data);
    });
  }

  // Store data to localStorage.
  private storeDataToLocalStorage<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Add data to localStorage and return the updated list.
  private addDataToStorage<T>(key: string, newData: T): T[] {
    const currentData = this.getDataFromLocalStorage<T[]>(key, []);
    currentData.push(newData);
    this.storeDataToLocalStorage(key, currentData);
    return currentData;
  }
}
