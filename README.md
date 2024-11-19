# Assessment: Customer and Pin Management Application

This project is a demo application for managing customers and pins, developed using Angular 16 [Angular CLI](https://github.com/angular/angular-cli). The application showcases modular design, reusable components, and clean coding practices. The application is built with a focus on modern development standards, utilizing Reactive Forms with validation for user input.

## Features

# Customer Management

    Fields:
        Name*: Text field
        Email*: Text field
        Region*: Dropdown
        Country: Dropdown (populated based on region selection)
    Add a customer through an overlay by clicking the "+ Add Customer" button.

# Pin Management

    Fields:
        Title*: Text field
        Image*: Drag-and-drop file uploader (Single Select)
        Collaborators*: Multi-select dropdown
        Privacy*: Radio button (Public, Private)
    Add a pin through an overlay by clicking the "+ Add Pin" button.

## Data Display

# View customers and pins in a tabular format:

    Pins: Title, image, collaborators, and privacy.

## Third-Party Libraries

# The application uses the following third-party libraries to enhance functionality:

    1. Angular Material: UI library for Angular components.
    2. JSON Server: Used for setting up a fake backend for API simulation.
    3. ng-select: Provides a feature-rich dropdown for multi-selection.
    4. ng2-file-upload: Enables drag-and-drop functionality for file uploads.

## Key Features & Practices

    1. Standalone Components: All components are implemented as standalone components for better modularity and reusability.
    2. Reactive Forms: Used for form handling, with robust validation applied to all required fields.
    3. Validation Rules:
        - Mandatory fields are marked with an asterisk (*).
        - Validations are enforced for inputs such as text fields, dropdowns, and file uploads.

## How to Run the Project

    1. Clone the repository.
    2. Install dependencies using npm install.
    3. Run the application:
        - Start the Angular app using ng serve.
        - Start the JSON Server for the fake backend using json-server --watch db.json.
    4. Open the application in your browser at http://localhost:4200.
