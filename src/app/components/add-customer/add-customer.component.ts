import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CountryRegionModel } from 'src/app/model/data.model';
import { CommonService } from 'src/app/service/common.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../module/Material.module';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgSelectModule,
    MaterialModule,
  ],
  providers: [CommonService],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  toBeDisplayedCountryList: CountryRegionModel[] = [];
  toBeDisplayedRegionList: CountryRegionModel[] = [];
  countryListArr: CountryRegionModel[] = [];
  formGroup!: UntypedFormGroup;

  constructor(
    private readonly commonService: CommonService,
    private readonly formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.loadRegions();
    this.initializeForm();
    this.subscribeToEmailChanges();
  }

  subscribeToEmailChanges(): void {
    const emailControl = this.formGroup.get('email');
    emailControl?.valueChanges.subscribe((value) => {
      if (value) {
        emailControl.setValue(value.toLowerCase(), { emitEvent: false });
      }
    });
  }

  // Fetch the country list based on the selected region.
  fetchCountryList(selectedRegion: string): void {
    this.toBeDisplayedCountryList = this.countryListArr.filter(
      (data) => data.region === selectedRegion
    );
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      console.log('Form Submitted:', formData);
    }
  }

  // Fetch the region list and process the data for display.
  private loadRegions(): void {
    this.commonService.get('/country').subscribe((response) => {
      if (response?.data) {
        const countryData = Object.values(response.data);
        this.countryListArr = countryData as CountryRegionModel[];
        this.toBeDisplayedRegionList = this.getUniqueRegions(
          this.countryListArr
        );
      }
    });
  }

  // Filters out unique regions from the country list
  private getUniqueRegions(
    countries: CountryRegionModel[]
  ): CountryRegionModel[] {
    return countries.filter(
      (value, index, self) =>
        index === self.findIndex((obj) => obj.region === value.region)
    );
  }

  // Initialize the reactive form.
  private initializeForm(): void {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      region: [null, Validators.required],
      country: [null, Validators.required],
    });
  }
}
