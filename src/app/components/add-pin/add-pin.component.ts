import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerModel } from '../../model/data.model';
import { FileUploader } from 'ng2-file-upload';
import { Constants } from 'src/app/app.constant';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../module/Material.module';
import { PinListComponent } from '../pin-list/pin-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'app-add-pin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgSelectModule,
    PinListComponent,
    FileUploadModule,
  ],
  templateUrl: './add-pin.component.html',
  styleUrls: ['./add-pin.component.scss'],
})
export class AddPinComponent implements OnInit {
  imageSrc: string = '';
  fileUrl: string = '';
  formGroup!: UntypedFormGroup;
  fetchedCustomerList: CustomerModel[] = [];
  uploader: FileUploader;
  imageErrorMessage = false;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddPinComponent>
  ) {
    this.uploader = new FileUploader({
      url: `${Constants.baseUrl}/pins`,
      disableMultipart: true,
    });
  }

  ngOnInit(): void {
    this.loadCustomerList();
    this.initFormGroup();
  }

  // Handle file selection and convert to base64.
  onFileSelected(event: EventEmitter<File[]> | any): void {
    const file: File = event[0];
    if (file && file.type.startsWith('image/')) {
      this.imageErrorMessage = false;
      this.fileUrl = file.name;

      this.convertToBase64(file).then((base64: string) => {
        this.imageSrc = base64;
      });
    } else {
      const fileInput: HTMLInputElement | null =
        document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
      this.imageErrorMessage = true;
    }
  }

  // Submit the form data.
  onSubmit(data: any): void {
    if (this.formGroup.valid) {
      this.closeDialogWithData();
    }
  }

  //  Close the dialog and pass back the form values along with image preview and file URL.
  private closeDialogWithData(): void {
    this.dialogRef.close({
      ...this.formGroup.value,
      imagePreviewUrl: this.imageSrc,
      fileUrl: this.fileUrl,
    });
  }

  // Load customer list from localStorage.
  private loadCustomerList(): void {
    const storedCustomers = localStorage.getItem(Constants.customerStorageKey);
    this.fetchedCustomerList = storedCustomers
      ? JSON.parse(storedCustomers)
      : [];
  }

  // Initialize the reactive form group.
  private initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      collaboratory: [null, [Validators.required]],
      privacy: [null, [Validators.required]],
    });
  }

  // Convert a file to a Base64 string.
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
